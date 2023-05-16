const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

MessageSchema.virtual('url').get(function () {
  return `messages/${this._id}`;
});

module.exports = mongoose.model('Message', MessageSchema);
