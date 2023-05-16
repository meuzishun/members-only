require('dotenv').config();
const passport = require('passport');
require('./middleware/passport');
const express = require('express');
const mongoose = require('mongoose');
const databaseConnection = require('./middleware/database');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const indexRouter = require('./routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./middleware/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
