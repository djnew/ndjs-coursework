const {UserService} = require('../services/user.service');
const passport = require('passport');
const {UNAUTHORIZED} = require('../../../http_status');

class UserController {
  static async signin(req, res, next) {
    passport.authenticate('local',  {session: true},function (err, user, info) {
      if (err) {
        return res.status(UNAUTHORIZED).json(info);
      }
      if (!user) {
        return res.status(UNAUTHORIZED).json(info);
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(UNAUTHORIZED).json(info);
        }
        return res.json({status: 'ok', data: user})
      });
    })(req, res, next);
  }

  static async signup(req, res) {
    res.json(await UserService.create(req.body));
  }
}

module.exports = {UserController};
