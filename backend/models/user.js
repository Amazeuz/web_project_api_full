const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
      message: (props) => `${props.value} Email inválido.`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: true
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador'
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => /^(https?){1,}:\/\/[-a-zA-Z0-9.+_~:/?%#@!$&'()*+,;=]{1,}\.com((\/[-a-zA-Z0-9.+_~:/?%#@!$&'()*+,;=]{1,})?){1,}\/?/.test(value),
      message: (props) => `${props.value} Link de avatar inválido.`,
    },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg'
  },
});

module.exports = mongoose.model('user', userSchema);
