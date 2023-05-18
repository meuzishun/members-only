require('dotenv').config();
const path = require('path');
const passport = require('passport');
require('./middleware/passport');
require('./middleware/database');
const MongoStore = require('connect-mongo');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
});

app.use(limiter);
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(expressLayouts);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.user });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
