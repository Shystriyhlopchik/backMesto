const Card = require('../models/card');
const { NotFoundError } = require('../errors/not-found-err');

// добавление новой крточки в БД
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send({ data: card }).status(200);
  } catch (e) {
    next(e);
  }
};

// получение всех карточек из БД
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards }).status(200);
  } catch (e) {
    next(e);
  }
};

// удаление карточки из БД по id
// eslint-disable-next-line consistent-return
module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (card.owner._id.toString() !== req.user._id) {
      throw new NotFoundError('404 Not Found');
    }
    const cardDelete = await Card.findOneAndRemove(req.params.id);
    return res.status(200).send({ message: 'card deleted:', data: cardDelete });
  } catch (err) {
    return next(err);
  }
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
