import express from 'express';
import CommunityController from '../controllers/CommunityController';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});
router.post('/store', CommunityController.store);
export default router;
