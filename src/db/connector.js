const mongoose = require("mongoose");

const User = process.env.MONGO_CONNECT_USERNAME || 'root';
const Password = process.env.MONGO_CONNECT_PASSWORD || 'qwerty12345';
const DbName = process.env.MONGO_CONNECT_DB || 'todos'
const Host = process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/'

async function dbConnect() {
  try {
    await mongoose.connect(Host, {
      user: User,
      pass: Password,
      dbName: DbName,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongo connected');
    return mongoose
  } catch (e) {
    console.error(e);
    return false;
  }

}

module.exports = {dbConnect}

