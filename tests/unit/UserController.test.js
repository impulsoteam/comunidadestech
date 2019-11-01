import UserController from '../../server/controllers/UserController';
import Utils from '../../server/controllers/utils';
import User from '../../server/models/user';
import { connect } from '../utils';
import factory from '../mocks/factories';

const spyFindOne = jest.spyOn(User, 'findOne');
const spyCreate = jest.spyOn(User, 'create');

describe('UserController.show', () => {
  let connection;
  beforeAll(async () => {
    connection = await connect();
    await User.deleteMany({});
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  const code = 'LINKEDIN_CODE';

  it('should have a show method', () => {
    expect(typeof UserController.show).toBe('function');
  });
  it('should call getLinkedinData', async () => {
    const spyUtilsGetLinkedinData = jest.spyOn(Utils, 'getLinkedinData');
    const spyUtilsGetLinkedinToken = jest.spyOn(Utils, 'getLinkedinToken');
    const result = await UserController.show(code);
    expect(spyUtilsGetLinkedinData).toBeCalledWith(code);
    expect(spyUtilsGetLinkedinToken).toBeCalledWith(code);
    expect(result).toStrictEqual('oi');
  });
  it('should find and return a user', async () => {
    const { name, avatar, linkedinId } = await factory.create('User');
    Utils.getLinkedinData = jest.fn();
    await Utils.getLinkedinData.mockReturnValue({ name, avatar, linkedinId });
    const user = await UserController.show(code);
    expect(spyFindOne).toBeCalled();
    expect(spyCreate).toHaveBeenCalledTimes(0);
    expect(user.linkedinId).toStrictEqual(linkedinId);
  });
  it('should create and return a user', async () => {
    const user = await factory.attrs('User');
    Utils.getLinkedinData = jest.fn();
    await Utils.getLinkedinData.mockReturnValue(user);
    const result = await UserController.show(code);
    expect(spyFindOne).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(result.linkedinId).toStrictEqual(user.linkedinId);
  });
});
