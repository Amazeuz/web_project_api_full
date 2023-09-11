const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const auth = require('./middleware/auth')
const cors = require('cors')
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users')

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET'
}))

app.post('/signup', createUser);
app.post('/signin', login);

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