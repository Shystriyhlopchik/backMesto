const Card = require('../models/card');

// добавление новой крточки в БД
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании карточки' }));
};

// получение всех карточек из БД
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произощла ошибка при попытку получить карточки' }));
};

// удаление карточки из БД по id
module.exports.deleteCard = (req, res) => {
  Card.findOneAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Карточка с указанным id не найдена' }));
};

// проставление лайка
module.exports.likeCard = (req) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  );
};

// удаление лайка
module.exports.dislikeCard = (req) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  );
};
