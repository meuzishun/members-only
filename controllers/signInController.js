const passport = require('passport');

const signInForm = (req, res) => {
  res.render('signInForm', { user: req.user }); //! This is a hack... must fix with ejs layouts
};

const signInUser = [
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/new-message',
  }),
  (err, req, res, next) => {
    if (err) next(err);
  },
];

module.exports = {
  signInForm,
  signInUser,
};
