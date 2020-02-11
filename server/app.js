import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import next from 'next'
import passport from 'passport'
import path from 'path'

import PassportConfig from './helpers/auth/passport'
import routes from './routes'
import sessionRoutes from './routes/session'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', (connected) => console.log(connected))
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err}`)
})

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const localStorage = path.resolve(__dirname, '..', 'temp', 'uploads')

app
  .prepare()
  .then(() => {
    const server = express()
    server.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] === 'http') {
        res.redirect(301, `https://${req.hostname}${req.url}`)
        return
      }

      res.setHeader(
        'strict-transport-security',
        'max-age=31536000; includeSubDomains; preload'
      )
      next()
    })

    server.use(express.json())
    server.use(cookieParser())
    server.use(express.urlencoded({ extended: true }))
    server.use(morgan('dev'))
    server.use(passport.initialize())
    server.use(passport.session())
    server.use('/files', express.static(localStorage))

    PassportConfig.google()
    PassportConfig.linkedin()

    server.use('/auth', sessionRoutes)
    server.use('/api/v1', routes)

    server.get('/sign-in', (req, res) => {
      res.cookie('previousPage', '/cadastrar')
      return res.redirect('/login')
    })

    server.get('/c/:slug', (req, res) => {
      return app.render(req, res, '/comunidade', { slug: req.params.slug })
    })

    server.get('/editar/:slug', (req, res) => {
      return app.render(req, res, '/editar', { slug: req.params.slug })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
