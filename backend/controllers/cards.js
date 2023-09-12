const Card = require('../models/card');

function send404() {
  const error = new Error('Nenhum cartão encontrado com esse id');
  error.statusCode = 404;
  throw error;
}

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Ocorreu um erro ao carregar todos os cartões: ${err}` }));
};

const deleteCard = (req, res) => {
  const cardId = req.params.cardId

  Card.findById(cardId)
    .orFail(() => {
      send404();
    })
    .then((card) => {
      if (card.owner.valueOf() === req.user._id) {
        res.send({ data: card })
        return Card.findByIdAndRemove(cardId)
      }
      else {
        res.status(403).send({ message: 'Você não tem autorização para deletar esse cartão' })
      }
    })
    .catch((err) => {
      console.log(err)
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id de cartão inválido' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.name === 'Forbidden') {

      } else {
        res.status(500).send({ message: `Ocorreu um erro ao deletar cartão: ${err}` });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ocorreu ao criar o cartão: Dados passados são inválidos' + err });
      }
      res.status(500).send({ message: `Não foi possível criar cartão: ${err}` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      send404();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Não foi possível curtir o cartão: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      send404();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Não foi possível descurtir o cartão: ${err}` });
      }
    });
};

module.exports = {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
};
