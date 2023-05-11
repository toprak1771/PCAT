const Photo = require('../models/Photo');
const Category = require('../models/Category');
const fs = require('fs');

const getAllPhotos = async (req, res) => {
  try {
    let category_slug = req.query.categories;
    const page = req.query.page || 1;
    const photosPerPage = 4;

    const category = await Category.findOne({ slug: category_slug });
    let filter = {};
    if (category_slug) {
      filter = { category: category._id };
    }

    const totalPhotos = await Photo.find().countDocuments();
    const photos = await Photo.find(filter)
      .sort('-dateCreated')
      .skip((page - 1) * photosPerPage)
      .limit(photosPerPage);
    const categories = await Category.find();
    res.render('index', {
      photos: photos,
      categories: categories,
      category:category_slug,
      current: page,
      totalPages: Math.ceil(totalPhotos / photosPerPage),
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getPhoto = async (req, res) => {
  const id = req.query.id;
  const photo = await Photo.findById(id);
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
  res.redirect('/index');
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
    res.redirect('/index');
  });
};

module.exports = { getAllPhotos, getPhoto, editPhoto, deletePhoto, addPhoto };
