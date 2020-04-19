const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => {
      if (!validator.isEmail(email)) {
        console.log('Ошибка валлидации почты');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.static.findUserByCredentials = function ( email, password ) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = mongoose.model('user', userSchema);
