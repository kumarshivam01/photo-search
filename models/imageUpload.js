const mongoose = require('mongoose');

const ImageUploadSchema = new mongoose.Schema({
  
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keyword: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  referenceId: {
    type: String,
    required: true,
    default:Date.now()
  },
});


module.exports = mongoose.model('Gallery', ImageUploadSchema);
