const passport = require('passport');

const signInForm = (req, res) => {
  res
    .status(200)
    .render('signInForm', { user: req.user, messages: req.session.messages }); //! This is a hack... must fix with ejs layouts
};

const signInUser = [
  passport.authenticate('local', {
    failureRedirect: '/sign-in-fail',
    failureMessage: true,
    successRedirect: '/new-message',
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
