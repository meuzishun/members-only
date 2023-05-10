const router = require('express').Router();

/* GET test */
router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/sign-up', (req, res) => {
  res.send('Sign up');
});

router.post('/sign-up', (req, res) => {});

router.get('/sign-in', (req, res) => {
  res.send('Sign in');
});

router.post('/sign-in', (req, res) => {});

router.get('/new-message', (req, res) => {
  res.send('New message');
});

router.post('/new-message', (req, res) => {});

module.exports = router;
