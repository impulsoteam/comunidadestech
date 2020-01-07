import express from 'express';
// import nextRoutes from 'next-routes';
import userRoutes from './user';
import communityRoutes from './community';

const router = express.Router();
// const routes = (module.exports = nextRoutes());

// routes.add('blog', '/blog/:slug');

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

router.use('/user', userRoutes);
router.use('/community', communityRoutes);

export default router;
