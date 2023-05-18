require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const signUpForm = (req, res) => {
  res
    .status(200)
    .render('signUpForm', { user: req.user, messages: req.session.messages });
};

const signUpUser = [
  body('first-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please include a first name.'),
  body('last-name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please include a last name.'),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isEmail()
    .withMessage('Please include a valid email.'),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(200)
        .render('error', { message: errors, errors: errors.errors });
      return;
    }
    const isSpecial =
      req.body['secret-passcode'] === process.env.SECRETPASSCODE;
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        const user = new User({
          firstName: req.body['first-name'],
          lastName: req.body['last-name'],
          email: req.body.email,
          password: hashedPassword,
          isMember: isSpecial,
          isAdmin: false,
        });
        await user.save();
        res.redirect('/sign-in');
      } catch (err) {
        return next(err);
      }
    });
  },
];

module.exports = {
  signUpForm,
  signUpUser,
};
