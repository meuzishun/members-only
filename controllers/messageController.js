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
    await message.save();
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndRemove(req.body['message-id']);
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newMessageForm,
  newMessage,
  deleteMessage,
};
