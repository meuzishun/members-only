const newMessageForm = (req, res) => {
  res.render('newMessageForm', { user: req.user });
};

const newMessage = (req, res) => {
  console.log(req.body);
};

module.exports = {
  newMessageForm,
  newMessage,
};
