import express from 'express';
import SessionController from '../controllers/SessionController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/checkManager/:email', UserController.checkManager);
router.use(SessionController.checkToken);
router.get('/invitations', UserController.getInvitations);

export default router;
