import express from 'express';
import CommunityController from '../controllers/CommunityController';
import SessionController from '../controllers/SessionController';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});
router.get('/getAll', CommunityController.getAll);
router.use(SessionController.checkToken);
router.post('/store', CommunityController.store);
export default router;
