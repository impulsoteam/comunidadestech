import express from 'express';
import CommunityController from '../controllers/CommunityController';
import SessionController from '../controllers/SessionController';

const router = express.Router();

router.get('/status/:status', CommunityController.getByStatus);
router.get('/slug/:slug', CommunityController.getBySlug);

router.use(SessionController.checkToken);

router.get('/owner', CommunityController.getByOwner);
router.put('/invitation', CommunityController.setInviteResponse);
router.get('/checkName/:name', CommunityController.checkName);
router.get('/checkSlug/:slug', CommunityController.checkSlug);
router.post('/store', CommunityController.store);
router.delete('/:_id', CommunityController.delete);
router.put('/publish/:_id', CommunityController.publish);
router.put('/update/:_id', CommunityController.update);

export default router;
