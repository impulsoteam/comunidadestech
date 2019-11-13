import express from 'express';
import passport from 'passport';
import SessionController from '../controllers/SessionController';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.post(
  '/google',
  passport.authenticate('google-token', { session: false }),
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
