const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const auth = require('./middleware/auth')
const cors = require('cors')
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users')

const { PORT = 5000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use((req, res, next) => {
  req.user = {
    _id: '64a47811a6370a4ccb5e494a',
  };

  next();
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cards', auth, cardsRouter);
app.use('/users', auth, userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .catch((err) => console.error(`Erro de conexão ao MongoDB: ${err}`));

app.listen(PORT);
