const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    //? Do we need this if we're using bcrypt?
    type: String,
    required: true,
  },
  isMember: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

UserSchema.virtual('url').get(function () {
  return `users/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);
