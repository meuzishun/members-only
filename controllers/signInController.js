const passport = require('passport');
const { body, validationResult } = require('express-validator');

const signInForm = (req, res) => {
  res
    .status(200)
    .render('signInForm', { user: req.user, messages: req.session.messages }); //! This is a hack... must fix with ejs layouts
};

const signInUser = [
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isEmail()
    .withMessage('Please include a valid email.'),
  passport.authenticate('local', {
    failureRedirect: '/sign-in-fail',
    failureMessage: true,
    successRedirect: '/',
  }),
  (err, req, res, next) => {
    if (err) next(err);
  },
];

const signInFail = (req, res) => {
  res
    .status(200)
    .render('signInFail', { user: req.user, messages: req.session.messages });
};

module.exports = {
  signInForm,
  signInUser,
  signInFail,
};
