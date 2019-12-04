import express from 'express';
import CommunityController from '../controllers/CommunityController';
import SessionController from '../controllers/SessionController';

const router = express.Router();

router.get('/status/:status', CommunityController.getByStatus);
router.get('/name/:name', CommunityController.getByName);

router.use(SessionController.checkToken);

router.get('/owner', CommunityController.getByOwner);
router.get('/checkName/:name', CommunityController.checkName);
router.post('/store', CommunityController.store);
router.delete('/:_id', CommunityController.delete);
router.put('/publish/:_id', CommunityController.publish);
router.put('/update/:_id', CommunityController.update);

export default router;
