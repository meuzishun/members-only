const router = require('express').Router();
const Message = require('../models/message');
const { signUpForm, signUpUser } = require('../controllers/signUpController');
const { signInForm, signInUser } = require('../controllers/signInController');
const {
  newMessageForm,
  newMessage,
  deleteMessage,
} = require('../controllers/messageController');

/* GET test */
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find({}).populate('author');
    res.render('index', { user: req.user, messages });
  } catch (err) {
    return next(err);
  }
});

router.route('/sign-up').get(signUpForm).post(signUpUser);
router.route('/sign-in').get(signInForm).post(signInUser);
router.route('/new-message').get(newMessageForm).post(newMessage);
router.post('/delete-message', deleteMessage);

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
