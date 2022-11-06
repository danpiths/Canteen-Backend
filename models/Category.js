const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of the category'],
    minlength: [3, 'Name cannot be less than 3 characters'],
    maxlength: [40, 'Name cannot be more than 40 characters'],
    unique: true,
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
    default: '/uploads/category/default.jpg',
  },
});

CategorySchema.pre('save', function () {
  let slugName = this.name;
  this.slug = slugName
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    //eslint-disable-next-line
    .replace(/[^\w\-]+/g, '')
    //eslint-disable-next-line
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
});

module.exports = mongoose.model('Category', CategorySchema);
