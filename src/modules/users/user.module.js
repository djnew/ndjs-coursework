const {router: authRouter} = require('./routers/user.router');
const express = require('express');
const router = express.Router();

const PATH = '/api';


Object.keys(authRouter).forEach((route) => {
  console.log(`router path:${PATH}${authRouter[route].path} initialization`)
  if ('middleware' in authRouter[route]) {
    router[authRouter[route].method](authRouter[route].path, authRouter[route].middleware, authRouter[route].function);
  } else {
    router[authRouter[route].method](authRouter[route].path, authRouter[route].function);
  }
});

module.exports = {
  router: router,
  path: PATH,
};
