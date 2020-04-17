const User = require('../models/user');

// внесение нового пользователя в БД
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при попытке записи нового пользователя' }));
};

// получение всех пользователей из БД
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при попытке получить список всех пользователей' }));
};

// получение данных пользователя по запрошенному id
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Запрошенный пользователь не найден' }));
};

// смена автатарки пользователя
module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при попытке обновлении фотографии пользователя' }));
};

// обновление иформации о пользователе
module.exports.patchMe = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при попытке обновить информацию пользователя' }));
};
