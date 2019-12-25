import User from '../models/user';
import Community from '../models/community';

class UserController {
  async findOrCreate(accessToken, profile, service) {
    let response;
    await User.findOne(
      {
        email: profile.emails[0].value,
      },
      (err, user) => {
        if (!user) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar:
              service === 'google'
                ? profile._json.picture
                : profile.photos[0].value,
            [service === 'google' ? 'googleProvider' : 'linkedinProvider']: {
              id: profile.id,
              token: accessToken,
            },
          });
          newUser.save();
          response = newUser;
        } else {
          user[service === 'google' ? 'googleProvider' : 'linkedinProvider'] = {
            id: profile.id,
            token: accessToken,
          };
          user.avatar =
            service === 'google'
              ? profile._json.picture
              : profile.photos[0].value;
          user.save();
          response = user;
        }
      }
    );
    return response;
  }

  async checkManager(req, res) {
    try {
      const { email } = req.params;
      const subscribed = await User.findOne(
        { email },
        { name: 1, email: 1, avatar: 1 }
      );
      return res.json(subscribed);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getInvitations(req, res) {
    const { id } = req.decoded;
    try {
      const invites = await Community.find(
        {
          managers: {
            $elemMatch: { _id: id, status: 'AWAITING' },
          },
        },
        { name: 1, logo: 1 }
      );
      return res.json(invites);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
