import { handleAsync } from "../../utilities/handleAync.js";
import userModel from "../../db/models/userModel.js";
import productModel from "../../db/models/productModel.js";
import AppError from "../../utilities/handleError.js";
import mongoose from "mongoose";

export const addTowishList = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const amount = req.body.amount || 1;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("id is not Valid ", 400));
  }
  const productExsit = await productModel.findOne({ _id: id });

  if (!productExsit) return next(new AppError("Product not found", 404));

  const productIsExist = await userModel.findOne({
    _id: req?.user._id,
    "wishList.product": id,
  });

  const user = await userModel.findOne({ _id: req?.user._id });

  if (productIsExist) {
    return next(new AppError("Product already exists in wishList", 409));
  } else {
    user.wishList.push({ product: id, amount });
    productExsit.inWishList = true;
  }
  await productExsit.save();
  await user.save();

  res.status(200).json({ message: "success", user });
});

export const deleteFromwishList = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("id is not Valid ", 400));
  }
  const productExsit = await productModel.findOne({ _id: id });

  if (!productExsit) return next(new AppError("Product not found", 404));

  const userWishList = await userModel.findOne({ _id: req?.user._id });

  const data = userWishList.wishList.filter((ele) => ele.product != id);

  await userModel.findOneAndUpdate(
    { _id: req?.user._id },
    { wishList: data },
    { new: true }
  );
  productExsit.inWishList = false;
  await productExsit.save();
  res.status(200).json({ message: "success", data: userWishList.wishList });
});

export const clearWishList = handleAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    { _id: req?.user._id },
    { wishList: [] },
    { new: true }
  );

  res.json({ message: "success" });
});

export const getwhishList = handleAsync(async (req, res, next) => {
  const wishList = await userModel
    .findOne({ _id: req.user._id })
    .select("wishList")
    .populate("wishList.product");

  res.json({ message: "success", data: wishList });
});
