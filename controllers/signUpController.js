require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const signUpForm = (req, res) => {
  console.log(req.session.messages);
  res.render('signUpForm', { user: req.user, messages: req.session.messages });
};

const signUpUser = async (req, res, next) => {
  const isSpecial = req.body['secret-passcode'] === process.env.SECRETPASSCODE;
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
      const result = await user.save();
      console.log(result);
      res.redirect('/sign-in');
      // res.render('index', { user });
    } catch (err) {
      return next(err);
    }
  });
};

module.exports = {
  signUpForm,
  signUpUser,
};
