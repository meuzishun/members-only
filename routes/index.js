const router = require('express').Router();
const { signUpForm, signUpUser } = require('../controllers/signUpController');
const { signInForm, signInUser } = require('../controllers/signInController');
const {
  newMessageForm,
  newMessage,
} = require('../controllers/newMessageController');

/* GET test */
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.route('/sign-up').get(signUpForm).post(signUpUser);
router.route('/sign-in').get(signInForm).post(signInUser);
router.route('/new-message').get(newMessageForm).post(newMessage);

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
