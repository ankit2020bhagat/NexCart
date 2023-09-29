import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./route/user.js";
import productRouter from "./route/product.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || PORT;
connectDB();
app.use(express.json());
app.use("/nexcart/user", userRouter);
app.use("/nexcart/product", productRouter);
app.get("/", (req, res) => {
  res.json({ message: "We are live" });
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server listening on port ", PORT);
});
