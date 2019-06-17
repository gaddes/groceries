const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: {
    desc: String
  }
});

module.exports = mongoose.model('Item', itemSchema);