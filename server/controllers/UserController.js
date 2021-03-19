import Community from '../models/community'
import User from '../models/user'

class UserController {
  async findOrCreate (accessToken, profile, service) {
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar:
      service === 'google'
        ? profile._json.picture
        : profile.photos[0].value,
      [service === 'google' ? 'googleProvider' : 'linkedinProvider']: {
        id: profile.id,
        token: accessToken
      }
    }

    await User.updateOne(
      { email: user.email },
      user,
      { upsert: true, runValidators: true, setDefaultsOnInsert: true }
    )

    return User.findOne({ email: user.email })
  }

  async checkManager (req, res) {
    try {
      const { email } = req.params
      const subscribed = await User.findOne(
        { email },
        { name: 1, email: 1, avatar: 1 }
      )
      return res.json(subscribed)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getInvitations (req, res) {
    const { id } = req.decoded
    try {
      const invites = await Community.find(
        {
          managers: {
            $elemMatch: { _id: id, 'invitation.status': 'SENT' }
          }
        },
        { name: 1, logo: 1, location: 1 }
      )
      return res.json(invites)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async updateDataPolicyAccepted (req, res) {
    const { _id } = req.params

    await User.updateOne({ _id }, { dataPolicyAccepted: true })
    const user = await User.findOne({ _id })

    const [, token] = req.headers.authorization.split(' ')

    res.cookie(
      'ctech_credentials',
      JSON.stringify({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isModerator: user.isModerator,
        dataPolicyAccepted: user.dataPolicyAccepted
      })
    )

    return res.json(user)
  }

  async destroy (req, res) {
    const { _id } = req.params
    await User.deleteOne({ _id })
    res.json('')
  }
}

export default new UserController()
