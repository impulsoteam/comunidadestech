import express from 'express';

import logoRoutes from './logo';
import userRoutes from './user';
import communityRoutes from './community';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/logo', logoRoutes);
router.use('/user', userRoutes);
router.use('/community', communityRoutes);

export default router;
