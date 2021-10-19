const {UserModel} = require('../models/user.model');
const bcrypt = require('bcrypt');
const UserService = {
  create: async ({email, password, name, contactPhone}) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({email, passwordHash, name, contactPhone});
    try {
      await newUser.save();
      return {
        status: 'ok',
        data: {
          id: newUser.id, email, name, contactPhone
        }
      };
    } catch (e) {
      if (e.code === 11000) {
        return {status: 'error', error: 'email занят'};
      }
      console.log(e);
      return {status: 'error', error: 'Что-то пошло не так'};
    }
  },
  findById: async (id) => {
    try {
      return await UserModel.findById(id);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  findByEmail: async (email) => {
    try {
      return await UserModel.findOne({email: email});
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  verifyUser: async (username, password, done) => {
    const user = await UserService.findByEmail(username);
    if (!user) {
      return done(
        null,
        false,
        {
          'error': 'Неверный логин или пароль',
          'status': 'error'
        }
      );
    }
    const checkPassword = await UserService.verifyPassword(user, password);
    if (!checkPassword) {
      return done(
        null,
        false,
        {
          'error': 'Неверный логин или пароль',
          'status': 'error'
        }
      );
    }
    // `user` будет сохранен в `req.user`
    return done(null, {id: user.id, email: user.email, name: user.name, contactPhone: user.contactPhone});
  },
  verifyPassword: async (user, password) => {
    return await bcrypt.compare(password, user.passwordHash);
  }

};

module.exports = {UserService};
