import express from 'express';

import imageRoutes from './image';
import userRoutes from './user';
import communityRoutes from './community';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/image', imageRoutes);
router.use('/user', userRoutes);
router.use('/community', communityRoutes);

export default router;
