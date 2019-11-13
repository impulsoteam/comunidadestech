import jwt from 'jsonwebtoken';
import UserController from './UserController';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !process.env.NODE_ENV !== 'production',
  signed: true,
};
class SessionController {
  login(req, res, next) {
    if (!req.user) {
      return this.handleError(res);
    }

    req.auth = {
      id: req.user.id,
    };

    next();
  }

  createToken(req, res, next) {
    const { auth, user } = req;
    if (!auth) {
      return this.handleError(res);
    }

    const token = jwt.sign(
      {
        id: auth.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7 days',
      }
    );
    // res.setHeader('x-auth-token', token);
    res.cookie('ctech_token', token);
    res.redirect('/');
    // return res.status(200).json({
    //   user: user,
    //   token: token,
    // }).redirect('/dashboard');
  }

  checkToken(req, res, next) {
    try {
      let token = req.headers['authorization'];
      token = token.slice(7, token.length);

      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
            return this.handleError(res);
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return this.handleError(res);
      }
    } catch (err) {
      return this.handleError(res);
    }
  }

  handleError(res) {
    return res.status(403).json({
      error: 'User Not Authenticated.',
    });
  }
}

export default new SessionController();
