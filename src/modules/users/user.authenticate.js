const passport = require('passport');

function Authenticate(res,req,next) {
  return passport.authenticate(
    'local',
    {
      failureFlash: true,
      failureRedirect: false,
    },
    function (err, user, info) {
      console.log(err,user,info);
      res.json()
    }
  )(res,req,next);
}

module.exports = {Authenticate};
