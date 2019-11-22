import jwt from 'jsonwebtoken';
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

    res.cookie(
      'ctech_token',
      JSON.stringify({
        token,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    );
    res.redirect('/');
  }

  checkToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(400).json({ error: 'Token not provided' });
      }
      const [, token] = authHeader.split(' ');

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'invalid token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } catch (err) {
      return res.status(500).json({ error: 'Unable to decoded token' });
    }
  }

  handleError(res) {
    return res.status(403).json({
      error: 'User Not Authenticated.',
    });
  }
}

export default new SessionController();
