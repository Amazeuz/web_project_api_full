const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      res.status(200).send({ user })
    })
    .catch(err => {
      res.status(401).send({ message: err })
    })
}

const createUser = (req, res) => {
  const { email, name, about, avatar } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => {
      res.send({
        email: email,
        name: name,
        about: about,
        _id: user._id
      })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ocorreu ao criar usuário: Dados passados são inválidos: ${err}` });
      }
      res.status(500).send({ message: `Não foi possível criar usuário: ${err}` });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id
      },
        'some-secret-key',
        { expiresIn: '7d' }
      );
      res.send({ token })
    })
    .catch(err => {
      res.status(401).send({ message: err.message })
    })
}

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
  getAllUsers, getUser, getUserInfo, createUser, login, updateUser, updateUserAvatar,
};
