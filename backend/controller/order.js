import Order from "../model/Order.js";

const addToCart = async (req, res) => {
  try {
    const data = await Order.create(req.body);
    if (data) {
      return res.status(201).json({ message: "Added to cart" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
export default addToCart;
