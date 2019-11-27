import supertest from 'supertest';

import app from '../mocks/app';
import factory from '../mocks/factories';
import User from '../../server/models/user';
import Community from '../../server/models/community';
import { connect, createUser, errorMessages } from '../utils';

let connection, user, moderator;

beforeAll(async () => {
  connection = await connect();
  await Community.deleteMany({});
  await User.deleteMany({});
  const mockUsers = await createUser();
  user = mockUsers.user;
  moderator = mockUsers.moderator;
});

afterAll(async () => {
  await connection.disconnect();
});

describe('CommunityController.store', () => {
  const request = (data, token) =>
    supertest(app)
      .post('/community/store')
      .send(data)
      .set('Authorization', `Bearer ${token}`);

  it('Should create community and return 201 status', async () => {
    const data = await factory.attrs('Community', {
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    const { statusCode, body } = await request(data, user.token);
    expect(statusCode).toBe(201);
    expect(body.status).toBe('awaitingPublication');
    expect(body.name).toBe(data.name);
  });

  it('Should return `user not found` message', async () => {
    const data = await factory.attrs('Community', {
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    const mock = await createUser();
    const invalidToken = mock.user.token;
    await User.deleteOne({ _id: mock.user._id });

    const { statusCode, body } = await request(data, invalidToken);
    expect(statusCode).toBe(400);
    expect(body.message).toBe('User not found');
  });

  it('Should return `withoutName` message and 400 status code', async () => {
    const withoutName = await factory.attrs('Community', {
      name: null,
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    const { statusCode, body } = await request(withoutName, user.token);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutName);
  });
  it('Should return `withoutCountry` message and 400 status code', async () => {
    const withoutCountry = await factory.attrs('Community', {
      model: 'presential',
      location: {
        country: undefined,
      },
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    const { statusCode, body } = await request(withoutCountry, user.token);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutCountry);
  });

  it('Should return `withoutCityAndState` message and 400 status code', async () => {
    const withoutCityAndState = await factory.attrs('Community', {
      model: 'presential',
      location: {
        country: 'Brasil',
      },
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    const { statusCode, body } = await request(withoutCityAndState, user.token);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutCityAndState);
  });
});

describe('CommunityController.delete', () => {
  const createCommunity = async (user) => {
    const data = await factory.attrs('Community', {
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    const { body } = await supertest(app)
      .post('/community/store')
      .send(data)
      .set('Authorization', `Bearer ${user.token}`);
    return body;
  };

  const request = (_id, token) => {
    return supertest(app)
      .delete(`/community/${_id}`)
      .set('Authorization', `Bearer ${token}`);
  };

  it('Owner should be able to delete his own community', async () => {
    const { _id } = await createCommunity(user);
    const { statusCode, body } = await request(_id, user.token);
    expect(statusCode).toBe(200);
    expect(body.status.ok && body.status.n).toBe(1);
    expect(body.message).toBe('Community removed by owner');
  });

  it('Moderator should be able to delete any community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, moderator.token);
    expect(statusCode).toBe(200);
    expect(body.status.ok && body.status.n).toBe(1);
    expect(body.message).toBe('Community removed by moderator');
  });

  it('Common user cannot be able to delete others communities', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, user.token);
    expect(statusCode).toBe(403);
    expect(body.message).toBe('User cannot delete this community');
  });
});

describe('CommunityController.update', () => {
  const request = (_id, token, data) => {
    return supertest(app)
      .put(`/community/${_id}`)
      .send(data)
      .set('Authorization', `Bearer ${token}`);
  };

  it('Moderator should be able to publish community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, moderator.token, {
      status: 'published',
    });
    expect(statusCode).toBe(200);
    expect(JSON.stringify(body._id)).toBe(JSON.stringify(_id));
    expect(body.status).toBe('published');
  });

  it('Common user should not be able to publish community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, user.token, {
      status: 'published',
    });
    expect(statusCode).toBe(403);
    expect(body.message).toBe(
      'User does not have credentials to published this community'
    );
  });
});

describe('CommunityController.getByStatus', () => {
  it('Should return array of `published` communities', async () => {
    await factory.createMany('Community', 50, {
      status: 'published',
    });
    await factory.createMany('Community', 50, {
      status: 'awaitingPublication',
    });
    const { statusCode, body } = await supertest(app).get(
      `/community/status/published`
    );

    expect(statusCode).toBe(200);
    expect(body[0].status).toBe('published');
    expect(body.length).toBeGreaterThanOrEqual(50);
  });

  it('Should return array of `awaitingPublication` communities', async () => {
    const { statusCode, body } = await supertest(app).get(
      `/community/status/awaitingPublication`
    );
    expect(statusCode).toBe(200);
    expect(body[0].status).toBe('awaitingPublication');
    expect(body.length).toBeGreaterThanOrEqual(50);
  });

  it('Should return `status not valid` message', async () => {
    const { statusCode, body } = await supertest(app).get(
      `/community/status/wrongStatus`
    );
    expect(statusCode).toBe(400);
    expect(body.message).toBe('Status provided is not valid');
  });
});

describe('CommunityController.getByName', () => {
  it('Should return community without related communities', async () => {
    const { name } = await factory.create('Community', {
      location: {
        country: 'Brasil',
        city: 'Rio de Janeiro',
        state: 'Rio de Janiro',
      },
      category: 'Testing',
    });
    const { statusCode, body } = await supertest(app).get(
      `/community/name/${name}`
    );
    expect(statusCode).toBe(200);
    expect(body.community.name).toBe(name);
    expect(body.related.length).toBe(0);
  });

  it('Should return community with related communities', async () => {
    await Community.deleteMany({});
    const { name } = await factory.create('Community', {
      status: 'published',
      location: {
        country: 'Brasil',
        city: 'São Paulo',
        state: 'São Paulo',
      },
      category: 'Test',
    });
    await factory.createMany('Community', 2, {
      status: 'published',
      location: {
        country: 'Brasil',
        city: 'São Paulo',
        state: 'São Paulo',
      },
    });
    await factory.createMany('Community', 2, {
      status: 'published',
      location: {
        country: 'Brasil',
        city: 'Campinas',
        state: 'São Paulo',
      },
    });
    await factory.createMany('Community', 2, {
      status: 'published',
      category: 'Test',
    });

    const { statusCode, body } = await supertest(app).get(
      `/community/name/${name}`
    );
    const sameCity = body.related.filter(
      (community) => community.location.city === 'São Paulo'
    );
    const sameState = body.related.filter(
      (community) => community.location.state === 'São Paulo'
    );
    const sameCategory = body.related.filter(
      (community) => community.category === 'Test'
    );

    expect(statusCode).toBe(200);
    expect(body.community.name).toBe(name);
    expect(body.related.length).toBe(6);
    expect(sameCity.length).toBe(2);
    expect(sameState.length).toBe(4);
    expect(sameCategory.length).toBe(2);
  });
  it('Should return `without name` error message', async () => {
    const { statusCode, body } = await supertest(app).get(
      `/community/name/testingJest`
    );
    expect(statusCode).toBe(400);
    expect(body.message).toBe('Community name does not exists');
  });
});

describe('CommunityController.getByOwner', () => {
  it('Should return empty array', async () => {
    const { statusCode, body } = await supertest(app)
      .get(`/community/owner`)
      .set('Authorization', `Bearer ${user.token}`);
    expect(statusCode).toBe(200);
    expect(body.length).toBe(0);
  });
  it('Should return array of communities', async () => {
    await factory.createMany('Community', 10, {
      creator: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    const { statusCode, body } = await supertest(app)
      .get(`/community/owner`)
      .set('Authorization', `Bearer ${user.token}`);
    expect(statusCode).toBe(200);
    expect(body.length).toBe(10);
  });
});
