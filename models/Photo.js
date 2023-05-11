const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;
const slugify = require('slugify');

const photoSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

photoSchema.pre('validate',function(next){
  this.slug = slugify(this.title,{
      lower:true,
      strict:true
  });
  next();
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
