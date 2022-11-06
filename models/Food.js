const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide id of category'],
  },
  slug: { type: String },
  name: {
    type: String,
    minlength: [3, 'Name cannot be less than 3 characters'],
    maxlength: [40, 'Name cannot be more than 40 characters'],
    unique: true,
    required: [true, 'Please provide name of the food item'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price of the food item'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide the description of the food item'],
  },
  image: {
    type: String,
    default: '/uploads/food/default.jpg',
  },
});

FoodSchema.pre('save', function () {
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

module.exports = mongoose.model('Food', FoodSchema);
