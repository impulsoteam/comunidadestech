import httpMocks from 'node-mocks-http';

import UserController from '../../server/controllers/UserController';
import SessionController from '../../server/controllers/SessionController';

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
UserController.show = jest.fn();
describe('session routes', () => {
  beforeEach(() => {
    req.body = { code: 'ljg5awrjgdojg5dpjgdigd8gdi' };
  });
  const route = '/session/create';
  it(route, async () => {
    UserController.show.mockReturnValue({
      user: 'João da Silva',
      avatar: 'https://avatar.com/451615619',
      email: 'joaosilva@test.com',
      linkedinId: '45fdge8f',
    });
    await SessionController.create(req, res);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(data.token).toBeTruthy();
  });
});
