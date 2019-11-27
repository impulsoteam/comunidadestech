import express from 'express';
import passport from 'passport';
import SessionController from '../controllers/SessionController';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);
router.get(
  '/google_oauth2/callback',
  passport.authenticate('google', { session: false }),
  SessionController.login
);

router.get(
  '/linkedin',
  passport.authenticate('linkedin-token', { session: false }),
  SessionController.login
);

export default router;
