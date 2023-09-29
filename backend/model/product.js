import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
