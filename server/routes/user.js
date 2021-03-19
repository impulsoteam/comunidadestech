import express from 'express'

import SessionController from '../controllers/SessionController'
import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/checkManager/:email', UserController.checkManager)
router.use(SessionController.checkToken)
router.get('/invitations', UserController.getInvitations)
router.delete('/:_id', UserController.destroy)
router.patch('/dataPolicyAccepted/:_id', UserController.updateDataPolicyAccepted)

export default router
