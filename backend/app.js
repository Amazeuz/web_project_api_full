const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const auth = require('./middleware/auth')
const cors = require('cors')
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger')
const errorHandler = require('./middleware/error-handler')
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users')

const { PORT = 8080 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST']
}))

app.use(requestLogger)

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
  })
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
}), login);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', auth, cardsRouter);
app.use('/users', auth, userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .catch((err) => console.error(`Erro de conexão ao MongoDB: ${err}`));

app.use(errorLogger)
app.use(errors())
app.use(errorHandler);

app.listen(PORT);