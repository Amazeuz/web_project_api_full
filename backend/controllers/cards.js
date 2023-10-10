const { isValidObjectId } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError')
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(err => next(err))
};

const deleteCard = (req, res, next) => {
  const cardId = req.params.cardId

  if (!isValidObjectId(cardId)) {
    throw new BadRequestError('ID passado é inválido')
  }

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Cartão com ID correspondete não encontrado');
    })
    .then((card) => {
      if (card.owner.valueOf() === req.user._id) {
        res.send({ card })
        return Card.findByIdAndRemove(cardId)
      }
      else {
        throw new ForbiddenError('Você não tem permissão para deletar esse cartão')
      }
    })
    .catch(err => next(err))
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(name, link)
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => next(err))
};

const likeCard = (req, res, next) => {
  const cardId = req.params.cardId;

  if (!isValidObjectId(cardId)) {
    throw new BadRequestError('ID passado é inválido')
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Cartão com ID correspondente não encontrado');
    })
    .then((card) => res.send(card))
    .catch(err => next(err))
};

const dislikeCard = (req, res, next) => {
  const cardId = req.params.cardId;

  if (!isValidObjectId(cardId)) {
    throw new BadRequestError('ID passado é inválido')
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Cartão com ID correspondente não encontrado');
    })
    .then((card) => res.send(card))
    .catch(err => next(err))
};

module.exports = {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
};
