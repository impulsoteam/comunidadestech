import express from 'express';

import userRoutes from './user';
import communityRoutes from './community';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/user', userRoutes);
router.use('/community', communityRoutes);

export default router;
