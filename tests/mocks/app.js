import express from 'express'

import SessionController from '../../server/controllers/SessionController'
import routes from '../../server/routes'
import { passportWithGoogle, passportWithLinkedin } from '../utils'

const server = express()

server.use(express.json())

server.use('/', routes)
server.use('/auth/linkedin', passportWithLinkedin, SessionController.login)
server.use(
  '/auth/google_oauth2/callback',
  passportWithGoogle,
  SessionController.login
)

export default server
