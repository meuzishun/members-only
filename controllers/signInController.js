const signInForm = (req, res) => {
  res.render('signInForm');
};

const signInUser = (req, res) => {
  console.log(req.body);
};

module.exports = {
  signInForm,
  signInUser,
};
