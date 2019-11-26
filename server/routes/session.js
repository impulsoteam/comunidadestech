import express from 'express';
import passport from 'passport';
import SessionController from '../controllers/SessionController';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
  SessionController.login,
  SessionController.createToken
);
router.get(
  '/google_oauth2/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  SessionController.login,
  SessionController.createToken
);

router.get(
  '/linkedin',
  passport.authenticate('linkedin-token', { session: false }),
  SessionController.login,
  SessionController.createToken
);

export default router;
