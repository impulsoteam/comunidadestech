import express from 'express';

import SessionController from '../controllers/SessionController';
import LogoController from '../controllers/LogoController';

const router = express.Router();

router.use(SessionController.checkToken);

router.post('/', LogoController.upload);

export default router;
