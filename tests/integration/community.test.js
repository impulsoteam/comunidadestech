import mongoose from 'mongoose';
import supertest from 'supertest';

import factory from '../mocks/factories';
import { connect } from '../utils';
import app from '../mocks/app';

const { TEST_TOKEN } = process.env;

let connection;
beforeAll(async () => {
  const Community = mongoose.model('Community');
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
      .set('Authorization', TEST_TOKEN);

  it('Should create community and return 201 status', async () => {
    const data = await factory.attrs('Community');
    const { statusCode, body } = await request(data);
    expect(statusCode).toBe(201);
    expect(body.name).toBe(data.name);
  });

  it('Should return message with missing parameters and 400 status code', async () => {
    const withMissingName = await factory.attrs('Community', {
      name: null,
    });
    const { statusCode, body } = await request(withMissingName);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      'Community validation failed: name: Path `name` is required.'
    );
  });
  it('Should return message with error validator and 400 status code', async () => {
    const withMissingName = await factory.attrs('Community', {
      location: {
        country: null,
      },
    });
    const { statusCode, body } = await request(withMissingName);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      'Community validation failed: name: Path `name` is required.'
    );
  });
});
