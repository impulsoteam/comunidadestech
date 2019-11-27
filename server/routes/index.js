import express from 'express';
import communityRoutes from './community';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/community', communityRoutes);

export default router;
