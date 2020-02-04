import faker from 'faker'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import UserController from '../server/controllers/UserController'
import factory from './mocks/factories'

export const connect = async () => {
  return mongoose.connect(process.env.MONGODB_TEST_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}

export const errorMessages = {
  withoutName: 'Community validation failed: name: Path `name` is required.',
  withoutCountry:
    'Community validation failed: location.country: Path `location.country` is required.',
  withoutCityAndState:
    'Community validation failed: location.city: Path `location.city` is required., location.state: Path `location.state` is required.'
}

export const createUser = async () => {
  const moderator = await factory.create('User', { isModerator: true })
  const user = await factory.create('User')

  const userToken = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7 days'
    }
  )
  const moderatorToken = jwt.sign(
    {
      id: moderator._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7 days'
    }
  )

  user.token = userToken
  moderator.token = moderatorToken

  return { user, moderator }
}

export const passportWithGoogle = async (req, res, next) => {
  const service = 'google'
  const accessToken = faker.internet.password()
  const profile = {
    id: faker.internet.password(),
    emails: [{ name: 'email', value: faker.internet.email() }],
    displayName: faker.name.findName(),
    _json: {
      picture: faker.image.avatar()
    }
  }
  req.user = await UserController.findOrCreate(accessToken, profile, service)
  next()
}

export const passportWithLinkedin = async (req, res, next) => {
  const service = 'linkedin'
  const accessToken = faker.internet.password()
  const profile = {
    id: faker.internet.password(),
    emails: [{ name: 'email', value: faker.internet.email() }],
    displayName: faker.name.findName(),
    photos: [{ name: 'photo', value: faker.image.avatar() }]
  }
  req.user = await UserController.findOrCreate(accessToken, profile, service)
  next()
}
