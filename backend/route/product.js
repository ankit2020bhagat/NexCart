import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductbyCategory,
  getProductwithSeller,
  reviews,
  updateProduct,
} from "../controller/product.js";
import {
  auth,
  isAdmin,
  isSeller,
  isSellerOrAdmin,
} from "../middleware/auth.js";
const productRouter = express.Router();

productRouter.post("/addproduct", auth, isSeller, addProduct);
productRouter.get("/category", getProductbyCategory);
productRouter.get("/seller/:id", getProductwithSeller);
productRouter.put("/update/:id", auth, isSellerOrAdmin, updateProduct);
productRouter.delete("/delete/:id", auth, deleteProduct);
productRouter.put("/review/:id", auth, reviews);
export default productRouter;
