import express from "express";
import {
  getUser,
  register,
  signin,
  topSeller,
  Profile,
  adminUser,
  deleteUser,
} from "../controller/user.js";
import { addProduct } from "../controller/product.js";
import addToCart from "../controller/order.js";
import { auth, isAdmin } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/product", addProduct);
userRouter.post("/cart", addToCart);
userRouter.get("/login", signin);
userRouter.get("/topseller", topSeller);
userRouter.get("/user/:id", getUser);
userRouter.put("/profile", auth, Profile);
userRouter.get("/admin", auth, isAdmin, adminUser);
userRouter.delete("/delete/:id", auth, isAdmin, deleteUser);
export default userRouter;
