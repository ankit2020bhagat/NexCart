import jwt from "jsonwebtoken";
import User from "../model/user.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.body.token || req.headers["x-access-token"];
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      req.user = data;
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: "Invalid token", error: err });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
      next();
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};
export const isSeller = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user && user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};
export const isSellerOrAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user && (user.isSeller || user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};
