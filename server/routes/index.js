import express from 'express'

import { sanitizeQuery } from '../middlewares'
import communityRoutes from './community'
import logoRoutes from './logo'
import userRoutes from './user'

const router = express.Router()

router.use(sanitizeQuery)

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

router.use('/logo', logoRoutes)
router.use('/user', userRoutes)
router.use('/community', communityRoutes)

export default router
