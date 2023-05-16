const Message = require('../models/message');

const newMessageForm = (req, res) => {
  res.render('newMessageForm', { user: req.user });
};

const newMessage = async (req, res, next) => {
  try {
    const message = new Message({
      author: req.user.id,
      text: req.body.content,
      timestamp: new Date(),
    });
    const result = await message.save();
    console.log(result);
    res.render('index', { user: req.user });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newMessageForm,
  newMessage,
};
