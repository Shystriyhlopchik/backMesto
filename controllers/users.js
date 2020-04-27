const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const UnathtorizedError = require('../errors/unauthorized-err');
const { JWT_SECRET } = require('../appconfig');

// внесение нового пользователя в БД
// eslint-disable-next-line consistent-return
module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    });
  } catch (e) {
    return next(new ConflictError('409 Conflict'));
  }
};

// получение всех пользователей из БД
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ data: users });
  } catch (e) {
    next(e);
  }
};

// получение данных пользователя по запрошенному id
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('404 Not found');
    }
    res.send({ data: user }).status(200);
  } catch (e) {
    next(e);
  }
};

// смена автатарки пользователя
module.exports.patchAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, { avatar }, { new: true, runValidators: true },
    );
    res.send({ data: user }).status(200);
  } catch (e) {
    next(e);
  }
};

// обновление иформации о пользователе
module.exports.patchMe = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, { name, about }, { new: true, runValidators: true },
    );
    res.send({ data: user }).status(200);
  } catch (e) {
    next(e);
  }
};

// Логировние
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, JWT_SECRET, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(200).send({ data: token });
  } catch (err) {
    next(new UnathtorizedError(err.message));
  }
};
