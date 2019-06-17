const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  desc: String
});

module.exports = mongoose.model('Item', itemSchema);