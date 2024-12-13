import { handleAsync } from "./../../utilities/handleAync.js";
import userModel from "./../../db/models/userModel.js";
import productModel from "./../../db/models/productModel.js";
import AppError from "../../utilities/handleError.js";
import mongoose from "mongoose";

export const addToCart = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const amount = req.body.amount || 1;
  const {size} = req.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("id is not Valid ", 400));
  }
  const productExsit = await productModel.findOne({ _id: id });

  if (!productExsit) return next(new AppError("Product not found", 404));

  const productIsExist = await userModel.findOne({
    _id: req?.user._id,
    "cart.product": id,
  });

  const user = await userModel.findOne({ _id: req?.user._id });

  if (productIsExist) {
    user.cart.forEach((ele) => {
      if (ele.product == id) {
        ele.amount = amount;
      }
    });
  } else {
    user.cart.push({ product: id, amount,size });
  }

  await user.save();

  res.status(200).json({ message: "success", user });
});

export const deleteFromCart = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("id is not Valid ", 400));
  }
  const productExsit = await productModel.findOne({ _id: id });

  if (!productExsit) return next(new AppError("Product not found", 404));

  const userCart = await userModel.findOne({ _id: req?.user._id });

  const data = userCart.cart.filter((ele) => ele.product != id);

  await userModel.findOneAndUpdate(
    { _id: req?.user._id },
    { cart: data },
    { new: true }
  );

  res.status(200).json({ message: "success", data: userCart.cart });
});

export const clearCart = handleAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    { _id: req?.user._id },
    { cart: [] },
    { new: true }
  );

  res.json({ message: "success" });
});

export const getCart = handleAsync(async (req, res, next) => {

        const cart = await userModel.findOne({_id:req.user._id}).select("cart").populate("cart.product")

        res.json({message: "success", data:cart})

});
