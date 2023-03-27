const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: String,
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;