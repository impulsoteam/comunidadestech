import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

import SessionController from '../controllers/SessionController';

const router = express.Router();

import Image from '../models/image';
// router.use(SessionController.checkToken);

router.get('/', async (req, res) => {
  const images = await Image.find();
  return res.json(images);
});
router.post('/', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;
  const post = await Image.create({
    name,
    size,
    url,
    key,
  });
  return res.json({ file: req.file, post });
});

router.delete('/:id', async (req, res) => {
  const image = await Image.findById(req.params.id);

  const success = await image.remove();
  return res.json({ success });
});

export default router;
