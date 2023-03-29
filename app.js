const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const app = express();
const Photo = require('./models/Photo');
const { join } = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');
//connect
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Template engine
app.set('view engine', 'ejs');

//mmiddlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.get('/', photoController.getAllPhotos);
app.get('/photo/:id', photoController.getPhoto);
app.put('/photo/:id', photoController.editPhoto);
app.delete('/photos/delete/:id', photoController.deletePhoto);
app.post('/photos', photoController.addPhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
