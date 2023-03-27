const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

const photoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', photoSchema);

// Photo.create({
//   title: 'Photo 2',
//   description: 'Photo 2 description',
// });

// Photo.find({}).then((data) => console.log(data));

// const id = '64215ce15d3882cc5f35e56c';

// Photo.findByIdAndUpdate(id,{ title: 'Photo 17 updated' },{new:true}).then(
//   (err, data) => {
//     console.log(data);
//   }
// );

const id = '642160a2e4aad314b85d2006';

Photo.findByIdAndDelete(id).then((err, data) => {
  console.log('Silme işlemi başarılı');
});
