import Product from "../model/product.js";

export const addProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    if (data) {
      return res.status(201).json({ message: "Product added successfully" });
    } else {
      return res.json({ message: "Failed to create Product" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal serer error", error: err });
  }
};
export const getProductbyCategory = async (req, res) => {
  try {
    const product = await Product.find({
      category: req.body.category,
    });
    if (product) {
      return res.status(200).json({ Product: product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal serer error", error: err });
  }
};
export const getProductwithSeller = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "seller",
    "seller.name seller.logo seller.rating seller.numReviews"
  );
  if (product) {
    return res.status(200).json({ product: product });
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.image = req.body.image || product.image;
      product.description = req.body.description || product.description;
      product.countInStock = req.body.countInStock || product.countInStock;
      const updateProduct = await product.save();
      return res
        .status(200)
        .json({ message: "Product updated", product: updateProduct });
    } else {
      return res.status(404).json({ message: "Pruduct not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal serer error", error: err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.deleteOne();
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal serer error", error: err });
  }
};
export const reviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.reviews.find((x) => x.name === req.body.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.body.name,
        comment: req.body.comment,
        rating: req.body.rating,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updateReviews = await product.save();
      return res.status(201).json({
        message: "Review Created",
        review: updateReviews.reviews[updateReviews.reviews.length - 1],
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal serer error", error: err });
  }
};
