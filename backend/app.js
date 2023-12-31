const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/error-handler');
const auth = require('./middleware/auth');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');

const { PORT = 8080 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', auth, cardsRouter);
app.use('/users', auth, userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .catch((err) => { throw new Error(`Erro de conexão ao MongoDB: ${err}`); });

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
