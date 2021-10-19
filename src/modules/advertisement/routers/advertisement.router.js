const {AdvertisementController} = require('../controllers/advertisement.controller');
const {checkAuthorization} = require('../../users/user.middleware');
const fileMiddleware = require('../middleware/images.middleware');
const router = {
  advertisementsGet: {
    path: '/',
    method: 'get',
    middleware: fileMiddleware.none(),
    function: AdvertisementController.get,
  },
  advertisementsGetId: {
    path: '/:id',
    method: 'get',
    function: AdvertisementController.getId
  },
  advertisementsPost: {
    path: '/',
    method: 'post',
    middleware: [checkAuthorization, fileMiddleware.array('images')],
    function: AdvertisementController.post
  },
  advertisementsPut: {
    path: '/:id',
    method: 'put',
    middleware: [checkAuthorization, fileMiddleware.array('images')],
    function: AdvertisementController.put
  },
  advertisementsDelete: {
    path: '/:id',
    method: 'delete',
    middleware: checkAuthorization,
    function: AdvertisementController.delete
  }
};

module.exports = {router};
