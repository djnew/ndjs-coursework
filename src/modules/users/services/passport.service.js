const passport = require('passport');
const {UserService} = require('./user.service');
const LocalStrategy = require('passport-local').Strategy

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false,
  failWithError: true,
  failureFlash: true
}

passport.use('local', new LocalStrategy(options, UserService.verifyUser))

passport.serializeUser(function (user, cb) {
  console.log('userId', user.id)
  cb(null, user.id)
})

passport.deserializeUser(async function (id, cb) {
  const user = await UserService.findById(id);
  console.log('user:', user)
  if (!user) { return cb(new Error('User ' + id + ' does not exist')) }
  cb(null, user)
})

module.exports = {passport}
