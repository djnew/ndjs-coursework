const {router: advertisementRouter} = require('./routers/advertisement.router');
const express = require('express');
const router = express.Router();

const PATH = '/api/advertisement';


Object.keys(advertisementRouter).forEach((route) => {
  console.log(`router path:${PATH}${advertisementRouter[route].path} initialization`)
  if ('middleware' in advertisementRouter[route]) {
    router[advertisementRouter[route].method](advertisementRouter[route].path, advertisementRouter[route].middleware, advertisementRouter[route].function);
  } else {
    router[advertisementRouter[route].method](advertisementRouter[route].path, advertisementRouter[route].function);
  }
});

module.exports = {
  router: router,
  path: PATH,
};
