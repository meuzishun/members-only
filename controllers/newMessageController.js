const newMessageForm = (req, res) => {
  res.render('newMessageForm');
};

const newMessage = (req, res) => {
  console.log(req.body);
};

module.exports = {
  newMessageForm,
  newMessage,
};
