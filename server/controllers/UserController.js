import mongoose from 'mongoose';
import User from '../models/user';

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
}

export default new UserController();
