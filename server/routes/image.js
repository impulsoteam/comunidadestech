import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

import SessionController from '../controllers/SessionController';

const router = express.Router();

router.use(SessionController.checkToken);

router.post('/', multer(multerConfig).single('file'), async (req, res) => {
  return res.json(req.file.location);
});

export default router;
