const Photo = require('../models/Photo');
const Category = require('../models/Category');


const getAboutPage = (req, res) => {
  res.render('about');
};

const getAddPage = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('add',{
      categories:categories
    });
  } catch (error) {
    console.log(error);
  }
  
};

const getEditPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit', { photo });
};

module.exports = {getAboutPage,getAddPage,getEditPage}