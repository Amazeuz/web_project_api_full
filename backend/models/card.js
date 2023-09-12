const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(https?){1,}:\/\/[-a-zA-Z0-9.+_~:/?%#@!$&'()*+,;=]{1,}\.com((\/[-a-zA-Z0-9.+_~:/?%#@!$&'()*+,;=]{1,})?){1,}\/?/.test(value),
      message: (props) => `${props.value} Link de cartão inválido.`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
