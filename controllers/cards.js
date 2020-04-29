const mongoose = require('mongoose');

const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// добавление новой крточки в БД
module.exports.createCard = (async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send({ data: card }).status(200);
  } catch (e) {
    next(e);
  }
});

// получение всех карточек из БД
module.exports.getCards = (async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards }).status(200);
  } catch (e) {
    next(e);
  }
});

// удаление карточки из БД по id
// eslint-disable-next-line consistent-return
module.exports.deleteCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) { // проверка наличия удаляемой карты
      throw new NotFoundError('404 Not Found');
    }
    if (!card.owner.equals(req.user._id)) { // проверка владельца карты для удаления
      throw new ForbiddenError('403 Forbidden');
    }
    const cardDelete = await Card.findOneAndRemove(req.params.id);
    return res.status(200).send({ message: 'card deleted:', data: cardDelete });
  } catch (err) {
    return next(err);
  }
});

// проставление лайка
module.exports.likeCard = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return next(new NotFoundError('404 Not found'));
    }
    const cardToUpdate = await Card.findByIdAndUpdate(id, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ data: cardToUpdate });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('404 Not Foundfdfdfd'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});

// удаление лайка
module.exports.dislikeCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return next(new NotFoundError('404 Not Found'));
    }
    const cardToDislike = await Card.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ message: 'like removed:', data: cardToDislike });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('404 Not Found'));
    }
    return next(err);
  }
});
