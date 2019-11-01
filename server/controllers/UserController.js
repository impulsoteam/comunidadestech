import User from '../models/user';
import Utils from './utils';
class UserController {
  async show(code) {
    try {
      const { name, avatar, linkedinId } = await Utils.getLinkedinData(code);
      let user;
      user = await User.findOne({ linkedinId });

      if (!user) user = await User.create({ name, avatar, linkedinId });
      return user;
    } catch (error) {
      return 'oi';
    }
  }
}

export default new UserController();
