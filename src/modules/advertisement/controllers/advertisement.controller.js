const {AdvertisementService} = require('../services/advertisement.service');
const AdvertisementController = {
  get: async (req, res) => {
    const {httpStatus, ...advertisement} = await AdvertisementService.find(req.body);
    res.status(httpStatus).json(advertisement);
  },
  getId: async (req, res) => {
    const {httpStatus, ...advertisement} = await AdvertisementService.getById(req.params.id);
    res.status(httpStatus).json(advertisement);
  },
  post: async (req, res) => {
    const {httpStatus, ...advertisement} = await AdvertisementService.create(req);
    res.status(httpStatus).json(advertisement);
  },
  put: async (req, res) => {
    const {httpStatus, ...advertisement} = await AdvertisementService.update(req.params.id, req);
    res.status(httpStatus).json(advertisement);
  },
  delete: async (req, res) => {
    const {httpStatus, ...advertisement} = await AdvertisementService.remove(req.params.id);
    res.status(httpStatus).json(advertisement);
  }
};
module.exports = {AdvertisementController};
