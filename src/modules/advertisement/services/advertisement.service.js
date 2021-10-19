const {AdvertisementModel} = require('../models/advertisement.model');
const {INTERNAL_SERVER_ERROR, FORBIDDEN, OK, CREATED} = require('../../../http_status');

const AdvertisementService = {
  find: async (params) => {
    const {shortText, description, userId, tags} = params;
    try {
      let filter = {}
      if(shortText){
        filter.shortText ={$regex: shortText, $options: 'gi'}
      }
      if(description){
        filter.description = {$regex: description, $options: 'gi'};
      }
      if(userId){
        filter.userId = userId;
      }
      if(tags && tags.length){
        filter.tags = tags;
      }
      console.log(filter);
      const advertisements = await AdvertisementModel
        .find({
          ...filter,
          idDeleted: false,
        })
        .populate({path: 'userId', select: 'id', model: 'User'})
        .populate({path: 'userId', select: 'name', model: 'User'})
        .select('-__v -updatedAt -isDeleted')
        .exec();
      return {
        status: 'ok',
        data: advertisements,
        httpStatus: OK
      };
    } catch (e) {
      console.error(e);
      return {
        status: 'error',
        message: e,
        httpStatus: INTERNAL_SERVER_ERROR
      };
    }
  },
  getById: async (id) => {
    try {
      const advertisement = await AdvertisementModel
        .findOne({_id: id})
        .populate({path: 'userId', select: 'id', model: 'User'})
        .populate({path: 'userId', select: 'name', model: 'User'})
        .select('-__v -updatedAt -isDeleted')
        .exec()
      return {
        status: 'ok',
        data: advertisement,
        httpStatus: OK
      };
    } catch (e) {
      console.error(e);
      return {
        status: 'error',
        message: e,
        httpStatus: INTERNAL_SERVER_ERROR
      };
    }
  },
  imageToArray: (files) => {
    const imagesArr = {};
    if (files && files.length) {
      imagesArr.images = [];
      files.forEach((file) => {
        imagesArr.images.push(file.path);
      });
    }
    return imagesArr;
  },
  create: async (req) => {
    const imagesArr = AdvertisementService.imageToArray(req.files);
    const {shortText, description, tags} = req.body;
    const advertisementProps = {
      shortText,
      description,
      tags,
      userId: req.user.id,
      ...imagesArr
    };
    const newAdvertisement = new AdvertisementModel(advertisementProps);
    try {
      await newAdvertisement.save();
      const advertisement = await AdvertisementModel.findById(newAdvertisement.id)
        .populate({path: 'userId', select: 'id', model: 'User'})
        .populate({path: 'userId', select: 'name', model: 'User'})
        .select('-__v -updatedAt -isDeleted')
        .exec()
      return {
        status: 'ok',
        data: advertisement,
        httpStatus: CREATED
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        message: e,
        httpStatus: INTERNAL_SERVER_ERROR
      };
    }
  },
  update: async (id, req) => {
    try {
      let advertisement = await AdvertisementModel.findById(id);
      if (advertisement.userId.toString() !== req.user.id) {
        return {
          status: 'error',
          message: 'Forbidden',
          httpStatus: FORBIDDEN
        };
      }

      const imagesArr = AdvertisementService.imageToArray(req.files);
      const {shortText, description, tags} = req.body;
      const advertisementProps = {
        shortText,
        description,
        tags,
        userId: req.user.id,
        updatedAt: new Date(),
        ...imagesArr
      };

      await AdvertisementModel.updateOne({_id: id}, advertisementProps);
      advertisement = await AdvertisementModel.findById(id)
        .populate({path: 'userId', select: 'id', model: 'User'})
        .populate({path: 'userId', select: 'name', model: 'User'})
        .select('-__v -updatedAt -isDeleted')
        .exec()
      return {
        status: 'ok',
        data: advertisement,
        httpStatus: CREATED
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'error',
        message: e,
        httpStatus: INTERNAL_SERVER_ERROR
      };
    }
  },
  remove: async (id, req) => {
    try {
      const advertisement = await AdvertisementModel.findById(id);
      if (advertisement.userId.toString() !== req.user.id) {
        return {
          status: 'error',
          message: 'Forbidden',
          httpStatus: FORBIDDEN
        };
      }
      await AdvertisementModel.findOneAndUpdate(id, {isDeleted: true});
    } catch (e) {
      return {
        status: 'error',
        message: e,
        httpStatus: INTERNAL_SERVER_ERROR
      };
    }
    return {
      status: 'ok',
      httpStatus: OK
    };
  }
};

module.exports = {AdvertisementService};
