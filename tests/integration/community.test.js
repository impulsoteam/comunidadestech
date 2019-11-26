import supertest from 'supertest';

import Community from '../../server/models/community';
import factory from '../mocks/factories';
import { connect, errorMessages } from '../utils';
import app from '../mocks/app';

const { MODERATOR_CREDENTIALS, USER_CREDENTIALS } = process.env;

let connection;
beforeAll(async () => {
  connection = await connect();
  await Community.deleteMany({});
});

afterAll(async () => {
  await connection.disconnect();
});

describe('CommunityController.store', () => {
  const request = (body) =>
    supertest(app)
      .post('/community/store')
      .send(body)
      .set('Authorization', USER_CREDENTIALS);

  it('Should create community and return 201 status', async () => {
    const data = await factory.attrs('Community');
    const { statusCode, body } = await request(data);
    expect(statusCode).toBe(201);
    expect(body.status).toBe('awaitingPublication');
    expect(body.name).toBe(data.name);
  });

  it('Should return `withoutName` message and 400 status code', async () => {
    const withoutName = await factory.attrs('Community', {
      name: null,
    });
    const { statusCode, body } = await request(withoutName);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutName);
  });
  it('Should return `withoutCountry` message and 400 status code', async () => {
    const withoutCountry = await factory.attrs('Community', {
      model: 'presential',
      location: {
        country: undefined,
      },
    });
    const { statusCode, body } = await request(withoutCountry);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutCountry);
  });

  it('Should return `withoutCityAndState` message and 400 status code', async () => {
    const withoutCityAndState = await factory.attrs('Community', {
      model: 'presential',
      location: {
        country: 'Brasil',
      },
    });
    const { statusCode, body } = await request(withoutCityAndState);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(errorMessages.withoutCityAndState);
  });
});

describe('CommunityController.delete', () => {
  const createCommunity = async () => {
    const data = await factory.attrs('Community');
    const { body } = await supertest(app)
      .post('/community/store')
      .send(data)
      .set('Authorization', USER_CREDENTIALS);
    return body;
  };

  const request = (_id, type) => {
    const userType =
      type === 'moderator' ? MODERATOR_CREDENTIALS : USER_CREDENTIALS;
    return supertest(app)
      .delete(`/community/${_id}`)
      .set('Authorization', userType);
  };

  it('Owner should be able to delete his own community', async () => {
    const { _id } = await createCommunity();
    const { statusCode, body } = await request(_id);
    expect(statusCode).toBe(200);
    expect(body.status.ok && body.status.n).toBe(1);
    expect(body.message).toBe('Community removed by owner');
  });

  it('Moderator should be able to delete any community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, 'moderator');
    expect(statusCode).toBe(200);
    expect(body.status.ok && body.status.n).toBe(1);
    expect(body.message).toBe('Community removed by moderator');
  });

  it('Common user cannot be able to delete others communities', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id);
    expect(statusCode).toBe(403);
    expect(body.message).toBe('User cannot delete this community');
  });
});

describe('CommunityController.update', () => {
  const request = (_id, type, data) => {
    const userType =
      type === 'moderator' ? MODERATOR_CREDENTIALS : USER_CREDENTIALS;
    return supertest(app)
      .put(`/community/${_id}`)
      .send(data)
      .set('Authorization', userType);
  };

  it('Moderator should be able to publish community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, 'moderator', {
      status: 'published',
    });
    expect(statusCode).toBe(200);
    expect(JSON.stringify(body._id)).toBe(JSON.stringify(_id));
    expect(body.status).toBe('published');
  });

  it('Common user should not be able to publish community', async () => {
    const { _id } = await factory.create('Community');
    const { statusCode, body } = await request(_id, 'commonUser', {
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
      location: {
        country: 'Brasil',
        city: 'São Paulo',
        state: 'São Paulo',
      },
      category: 'Test',
    });
    await factory.createMany('Community', 2, {
      location: {
        country: 'Brasil',
        city: 'São Paulo',
        state: 'São Paulo',
      },
    });
    await factory.createMany('Community', 2, {
      location: {
        country: 'Brasil',
        city: 'Campinas',
        state: 'São Paulo',
      },
    });
    await factory.createMany('Community', 2, {
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
      .set('Authorization', USER_CREDENTIALS);
    expect(statusCode).toBe(200);
    expect(body.length).toBe(0);
  });
  it('Should return array of communities', async () => {
    await factory.createMany('Community', 10, {
      creator: {
        _id: '5dd971e924307d5be18dc205',
        name: 'User Test',
        email: 'user@email.com ',
      },
    });
    const { statusCode, body } = await supertest(app)
      .get(`/community/owner`)
      .set('Authorization', USER_CREDENTIALS);
    expect(statusCode).toBe(200);
    expect(body.length).toBe(10);
  });
});
