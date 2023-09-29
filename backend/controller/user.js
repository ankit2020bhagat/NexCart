import User from "../model/user.js";
import hashPassword from "../helper/hashPassword.js";
import createtoken from "../helper/token.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin, isSeller, seller } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exisit" });
    }
    const hashedpassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      isAdmin,
      isSeller,
      seller,
    });
    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal sever error", error: err });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email" });
    }
    const status = await bcrypt.compare(password, user.password);

    if (!status) {
      return res.status(404).json({ message: "Incorrect password" });
    }
    const token = createtoken(user._id);
    if (token) {
      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};

export const topSeller = async (req, res) => {
  try {
    const topSeller = await User.find({ isSeller: true })
      .sort({
        "seller.rating": -1,
      })
      .limit(3);
    if (topSeller) {
      return res.status(200).json({ seller: topSeller });
    } else {
      return res.status(404).json({ message: "Not foun" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({ user: user });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};
export const Profile = async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.seller.name || user.seller.name;
        user.seller.logo = req.body.seller.logo || user.seller.logo;
        user.seller.description =
          req.body.seller.description || user.seller.description;
      }
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }
    }
    const updateUser = await user.save();
    if (updateUser) {
      return res.status(200).json({ message: "Updated successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};

export const adminUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      return res.status(200).json({ Admin: user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.isAdmin) {
      return res.json({ message: "Admin account can't be deleted" });
    }
    const deleteUser = await User.findByIdAndRemove(req.params.id);
    if (deleteUser) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", user: deleteUser });
    } else {
      return res.status(404).json({ message: "User nor founs" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server error", error: err });
  }
};
