require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const cors = require('cors');
const { login, createUser } = require('./controllers/usersController');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/corsHandler');
const { register, signin } = require('./middlewares/validation');
const cardsRoutes = require('./routes/cardsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       'https://tma.nomoredomains.work',
//       'http://tma.nomoredomains.work',
//       'localhost:3000',
//     ],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Accept'],
//   }),
// );

app.use(requestLogger); // логгер запросов

app.use(cors);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signin, login);
app.post('/signup', register, createUser);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена =('));
});

app.use(errorLogger); // логгер ошибок

app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
