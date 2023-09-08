const User = require('../models/user');

function send404() {
  const error = new Error('Nenhum usuário encontrado com esse id');
  error.statusCode = 404;
  throw error;
}

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Ocorreu um erro ao carregar todos os usuários: ${err}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      send404();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id de usuário inválido' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Ocorreu um erro ao encontrar usuário: ${err}` });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ocorreu ao criar usuário: Dados passados são inválidos' });
      }

      res.status(500).send({ message: `Não foi possível criar usuário: ${err}` });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true },
  )
    .orFail(() => {
      send404();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ocorreu ao atualizar dados do usuário: Dados passados são inválidos' });
      } if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Erro ao atualizar informações do usuário: ${err}` });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      send404();
    })
    .then((user) => res.send({ data: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ocorreu ao atualizar avatar de usuário: Dados passados são inválidos' });
      } if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Erro ao atualizar avatar do usuário: ${err}` });
      }
    });
};

module.exports = {
  getAllUsers, getUser, createUser, updateUser, updateUserAvatar,
};
