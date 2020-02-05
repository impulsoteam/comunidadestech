import express from 'express'

import LogoController from '../controllers/LogoController'
import SessionController from '../controllers/SessionController'

const router = express.Router()

router.use(SessionController.checkToken)

router.post('/:slug', LogoController.upload)

export default router
