const {UserController} = require('../controllers/user.controller');
const {path} = require('../user.module');
const passport = require('passport');


const AUTH_ROUTE = `${path}/signin`;

const router = {
  signup: {
    path: '/signup',
    method: 'post',
    function: UserController.signup,
  },
  signin: {
    path: '/signin',
    method: 'post',
    
    function: UserController.signin,
  },
}

module.exports = {AUTH_ROUTE, router};
