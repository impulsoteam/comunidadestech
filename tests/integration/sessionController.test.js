import supertest from 'supertest';
import setCookie from 'set-cookie-parser';

import app from '../mocks/app';
import User from '../../server/models/user';
import { connect } from '../utils';

let connection;

beforeAll(async () => {
  connection = await connect();
  await User.deleteMany({});
});

afterAll(async () => {
  await connection.disconnect();
});

describe('SessionController.login', () => {
  it('Should login with google', async () => {
    const { header, statusCode } = await supertest(app).get(
      `/auth/google_oauth2/callback`
    );
    const { ctech_credentials } = setCookie.parse(header['set-cookie'], {
      map: true,
    });
    expect(ctech_credentials.name).toBe('ctech_credentials');
    expect(ctech_credentials.value).toBeTruthy();
    expect(ctech_credentials.path).toBe('/');
    expect(statusCode).toBe(302);
  });
  it('Should login with linkedin', async () => {
    const { header, statusCode } = await supertest(app).get(`/auth/linkedin`);
    const { ctech_credentials } = setCookie.parse(header['set-cookie'], {
      map: true,
    });
    expect(ctech_credentials.name).toBe('ctech_credentials');
    expect(ctech_credentials.value).toBeTruthy();
    expect(ctech_credentials.path).toBe('/');
    expect(statusCode).toBe(302);
  });
});
