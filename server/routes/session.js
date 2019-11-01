import express from 'express';
import SessionController from '../controllers/SessionController';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});
router.post('/create', SessionController.create);

export default router;
