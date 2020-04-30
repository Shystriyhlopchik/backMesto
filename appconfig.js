const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV || 'develop';
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'devSecretKey';

// !добавить проверку подключения
const mongooseConnect = () => {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = {
  MONGODB_URL,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  mongooseConnect,
};
