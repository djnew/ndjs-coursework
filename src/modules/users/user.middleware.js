const {UNAUTHORIZED} = require('../../http_status');

function checkAuthorization(req, res, next) {
  if (!req.user) {
    return res.status(UNAUTHORIZED).json({
      message: 'Unauthorized'
    });
  }
  next();
}

module.exports = {checkAuthorization};
