const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  desc: String,
  isChecked: Boolean,
});

module.exports = mongoose.model('Item', itemSchema);
