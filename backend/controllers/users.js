const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError')
const NotFoundError = require('../errors/NotFoundError')

function send404(message) {
  throw new NotFoundError(message);
}

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(err => next(err));
};

const getUser = (req, res, next) => {
  const userId = req.params.id;

  if (!isValidObjectId(userId)) {
    throw new BadRequestError('Dados passados são inválidos')
  }

  User.findById(userId)
    .orFail(() => {
      send404('Usuário com ID correspondente não encontrado');
    })
    .then((user) => {
      res.send({ data: user })
    })
    .catch(err => next(err))
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.send(user))
    .catch(err => next(err))
}

const createUser = (req, res, next) => {
  const { email, name, about, avatar } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Ocorreu um erro ao criar usuário: Dados passados são inválidos')
      }
      res.send({
        email: email,
        name: name,
        about: about,
        _id: user._id
      })
    })
    .catch(err => next(err))
};

const login = (req, res, next) => {
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
    .catch(err => next(err))
}

const updateUser = (req, res, next) => {
  const userId = req.params.id !== 'me' ? req.params.id : req.user._id;

  if (!isValidObjectId(userId)) {
    throw new BadRequestError('Dados passados são inválidos')
  }

  User.findById(userId)
    .orFail(() => {
      send404('Usuário com ID correspondente não encontrado')
    })
    .then((user) => {
      if (userId === req.user._id) {
        res.send({ data: user })
        return User.findByIdAndUpdate(
          req.user._id,
          { name: req.body.name, about: req.body.about },
          { new: true },
        )
      }
      else {
        throw new ForbiddenError('Você não tem permissão para atualizar as informações desse usuário')
      }
    })
    .catch(err => next(err))
};


const updateUserAvatar = (req, res, next) => {
  const userId = req.params.id !== 'me' ? req.params.id : req.user._id;

  if (!isValidObjectId(userId)) {
    throw new BadRequestError('Dados passados são inválidos')
  }

  User.findById(userId)
    .orFail(() => {
      send404('Usuário com ID correspondente não encontrado')
    })
    .then((user) => {
      if (userId === req.user._id) {
        res.send({ data: user })
        return User.findByIdAndUpdate(
          req.user._id,
          { avatar: req.body.avatar },
          { new: true, runValidators: true },
        )
      }
      else {
        throw new ForbiddenError('Você não tem permissão para atualizar as informações desse usuário')
      }
    })
    .catch(err => next(err))
};

module.exports = {
  getAllUsers, getUser, getUserInfo, createUser, login, updateUser, updateUserAvatar,
};

