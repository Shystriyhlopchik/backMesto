const NODE_ENV = process.env.NODE_ENV || 'develop';
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb';
const PORT = process.env.PORT || 3000;
const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-Secret-Key';

module.exports = {
  MONGODB_URL,
  JWT_SECRET,
  PORT,
  NODE_ENV,
};
