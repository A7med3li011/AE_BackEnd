import { handleAsync } from "./../../utilities/handleAync.js";
import userModel from "./../../db/models/userModel.js";
import AppError from "../../utilities/handleError.js";
import orderModel from "../../db/models/orderModel.js";
import couponModel from "./../../db/models/couponModel.js";

export const createOrder = handleAsync(async (req, res, next) => {
  const { address, phone, paymnetMethod, couponCode } = req.body;

  let coupon = 0;
  if (couponCode) {
    coupon = await couponModel.findOne({
      code: couponCode,
      toDate: { $gte: Date.now() },
      useBy: { $nin: req.user._id },
    });
    if (!coupon)
      return next(new AppError("coupon is not found or expired", 404));
    coupon.useBy.push(req.user._id);
    await coupon.save();
  }

  const user = await userModel
    .findOne({ _id: req.user._id })
    .populate("cart.product");

  if (!user.cart.length) {
    return next(new AppError("cart is empty", 400));
  } else {
    const totalPrice = user.cart.reduce(
      (acc, curr) => acc + (curr["product"].price * curr.amount),
      0
    );
    console.log(user.cart)

    console.log(totalPrice)

    const order = await orderModel.create({
      user: req?.user._id,
      date: Date.now(),
      products: [...user.cart],
      address,
      phone: phone * 1,
      paymnetMethod,
      totalPrice,
      date: Date.now(),
      finalPrice: coupon
        ? totalPrice - totalPrice * (coupon?.amount / 100)
        : totalPrice,
    });

    await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { cart: [], $push: { orders: { order } } }
    );
    res.json({ message: "success" ,order});
  }
});
export const getOrders = handleAsync(async (req, res, next) => {

  const order = await orderModel
    .find({ user: req.user._id })
    .populate("products.product");

  res.json({ message: "success", data: order });
});
