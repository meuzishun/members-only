const signUpForm = (req, res) => {
  res.render('signUpForm');
};

const signUpUser = (req, res) => {
  console.log(req.body);
};

module.exports = {
  signUpForm,
  signUpUser,
};
