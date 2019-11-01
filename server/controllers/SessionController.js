import UserController from './UserController';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !process.env.NODE_ENV !== 'production',
  signed: true,
};
class SessionController {
  async create(req, res) {
    const data = await UserController.show(req.body.code);
    res.cookie('token', data, COOKIE_OPTIONS);
    res.status(201).json(data);
  }
}

export default new SessionController();
