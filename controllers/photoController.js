const Photo = require('../models/Photo');
const fs = require('fs');

const getAllPhotos = async (req, res) => {
  const page= req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({}).sort('-dateCreated').skip((page-1)*photosPerPage).limit(photosPerPage);
  res.render('index', {
    photos : photos,
    current:page,
    totalPages : Math.ceil(totalPhotos/photosPerPage)
  });
};

const getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

const editPhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photo/${req.params.id}`);
};

const deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  deletePath = __dirname + '/../public' + photo.image;
  if (fs.existsSync(deletePath)) {
    fs.unlinkSync(deletePath);
  }
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

const addPhoto = async (req, res) => {
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  uploadImage.mv(uploadPath, async (err) => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

module.exports = { getAllPhotos, getPhoto, editPhoto, deletePhoto, addPhoto };
