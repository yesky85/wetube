import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from './models/User';
import { githubLoginCallback } from './controllers/userController';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRT,
    callbackURL: 'http://localhost:4000/auth/github/callback',
  }),
  githubLoginCallback,
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
