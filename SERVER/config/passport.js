const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const USERS = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const fileURLtoPath = require("url");
const dotenv = require("dotenv");

const _filename = fileURLtoPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config({ path: path.resolve(_dirname, "../.env") });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/oauth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await USERS.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await USERS.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null,
          });
        }
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);
