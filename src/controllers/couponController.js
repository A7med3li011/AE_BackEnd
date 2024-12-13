import { handleAsync } from "../../utilities/handleAync.js";
import AppError from "../../utilities/handleError.js";
import couponModel from "./../../db/models/couponModel.js";

export const createCoupon = handleAsync(async (req, res, next) => {
  const { code, amount, fromDate, toDate } = req.body;

  const isExist = await couponModel.findOne({ code });
  if (isExist) return next(new AppError("coupon already exists", 409));

  const coupon = await couponModel.create({
    code,
    amount,
    fromDate,
    toDate,
    createdBy: req.user._id,
  });

  res.json({ message: "success", data: coupon });
});

export const checkCoupon = handleAsync(async (req, res, next) => {
  const { code } = req.body;

  const coupon = await couponModel.findOne({
    code: code,
    toDate: { $gte: Date.now() },
    useBy: { $nin: req.user._id },
  });

  if (!coupon) return next(new AppError("coupon notFound or expired", 409));

  res.json({ message: "success", data: coupon });
});
