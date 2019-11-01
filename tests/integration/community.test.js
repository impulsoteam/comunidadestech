import supertest from 'supertest';

import factory from '../mocks/factories';
import { connect } from '../utils';

import app from '../mocks/app';
import mongoose from 'mongoose';
const agent = supertest.agent(app);

describe('community routes', () => {
  let connection;
  beforeAll(async () => {
    const Community = mongoose.model('Community');
    connection = await connect();
    await Community.deleteMany({});
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  const route = '/community/store';
  it(route, async () => {
    const data = await factory.create('Community');
    const { statusCode, request } = await agent.post(route).send(data);
    expect(statusCode).toBe(201);
    expect(request._data._id).toBeTruthy();
  });
});
