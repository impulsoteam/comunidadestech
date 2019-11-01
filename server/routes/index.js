import express from 'express';
import communityRoutes from './community';
import sessionRoutes from './session';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/community', communityRoutes);
router.use('/session', sessionRoutes);
export default router;
