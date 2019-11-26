import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// import GoogleToken from 'passport-google-token';
import LinkedIn from 'passport-linkedin-oauth2';
import UserController from '../../controllers/UserController';

class PassportConfig {
  google() {
    const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
    passport.use(
      new GoogleStrategy(
        {
          clientID: '1024966559021.apps.googleusercontent.com',
          clientSecret: 'wtkkmgsVbPPGFGek1QrN3FBR',
          // clientID: GOOGLE_CLIENT_ID,
          // clientSecret: GOOGLE_SECRET,
          callbackURL:
            'https://staging-comunidadestech.herokuapp.com/auth/google_oauth2/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          console.log({ accessToken, refreshToken, profile, done });
          return;
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
