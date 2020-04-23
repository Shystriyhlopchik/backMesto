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
module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove(req.params.id)
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        const err = new Error('не найдено');
        err.statusCode = 404;
        next(err);
      }
      return Card.findByIdAndDelete(req.params.id)
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(() => {
      const err = new Error('не найдено');// если карта не найдена
      err.statusCode = 404;
      next(err);
    });
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
