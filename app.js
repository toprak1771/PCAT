const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const app = express();
const Photo = require('./models/Photo');

//connect
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Template engine
app.set('view engine', 'ejs');

//mmiddlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', async (req, res) => {
  const photos= await Photo.find({});
  //console.log(photos);
  res.render('index',{
    photos
  });
});

app.get('/about', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('about');
});

app.get('/add', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
