import passport from 'passport';
import LinkedIn from 'passport-linkedin-oauth2';
import GoogleStrategy from 'passport-google-oauth';

import UserController from '../../controllers/UserController';

class PassportConfig {
  google() {
    const {
      GOOGLE_CLIENT_ID,
      GOOGLE_SECRET,
      GOOGLE_CALLBACK_URL,
    } = process.env;
    passport.use(
      new GoogleStrategy.OAuth2Strategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_SECRET,
          callbackURL: GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          const user = await UserController.findOrCreate(
            accessToken,
            profile,
            'google'
          );
          done(null, user);
        }
      )
    );
  }

  linkedin() {
    const {
      LINKEDIN_API_KEY,
      LINKEDIN_SECRET_KEY,
      LINKEDIN_CALLBACK_URL,
    } = process.env;
    passport.use(
      'linkedin-token',
      new LinkedIn.Strategy(
        {
          clientID: LINKEDIN_API_KEY,
          clientSecret: LINKEDIN_SECRET_KEY,
          callbackURL: LINKEDIN_CALLBACK_URL,
          scope: ['r_emailaddress', 'r_liteprofile'],
        },
        async (accessToken, refreshToken, profile, done) => {
          const user = await UserController.findOrCreate(
            accessToken,
            profile,
            'linkedin'
          );
          done(null, user);
        }
      )
    );
  }
}

export default new PassportConfig();
