import userModel from "../../db/models/userModel.js";
import cloudinary from "../../service/cloudinary/cloundairy.js";
import AppError from "../../utilities/handleError.js";
import { handleAsync } from "./../../utilities/handleAync.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = handleAsync(async (req, res, next) => {
  const { email, password, name, phone, gender, address } = req.body;

  const emailExist = await userModel.findOne({ email });
  if (emailExist) return next(new AppError("email already exists", 409));

  const hashedPassword = await bcrypt.hash(password, +process.env.ROUND);

   await userModel.create({
    email,
    password: hashedPassword,
    name,
    phone,
    gender,
    address,
  });

  res.status(201).json({ messgae: "success" });
});
export const signin = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user1 = await userModel.findOne({ email });
  if (!user1) return next(new AppError("register First", 403));

  const match = await bcrypt.compare(password, user1.password);
  if (match) {
    if (user1.login) return next(new AppError("you are already loggedIN", 409));
    const user = {
      _id: user1._id,
      cart: user1.cart,
      wishList: user1.wishList,
      name: user1.name,
      address: user1.address,
      phone: user1.phone,
      gender: user1.gender,
      role: user1.role,
      email: user1.email,
      login: user1.login,
      image: user1.image,

      confirmed: user1.confirmed,
    };

    const token = jwt.sign({ user }, process.env.SCERETEKEY);
    user1.login = true;
    await user1.save();
    res.status(200).json({ message: "success", token });
  } else {
    next(new AppError("Password is incorrect", 400));
  }
});
export const signout = handleAsync(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { email: req?.user?.email, login: true },
    { login: false },
    { new: true }
  );
  if (user) {
    res.json({ message: "success" });
  } else {
    next(new AppError("user not found or already logout", 400));
  }
});
export const confirmEmail = handleAsync((req, res, next) => {});
export const forgetPassword = handleAsync((req, res, next) => {});

export const userImage = handleAsync(async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user._id });

  if (!user) return next(new AppError("user not found ", 404));

  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.files[0].path,
    {
      folder: `AE/userImage}`,
    }
  );

  await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    {
      image: {
        secure_url,
        public_id,
      },
    },
    {
      new: true,
    }
  );

  res.json({ message: "success" });
});

export const getUser = handleAsync(async(req, res, next) => {

    const user = await userModel.findOne({ _id: req.user._id }).select("image");

          if (!user) return next(new AppError("user not found ", 404));

          res.json({message:"success",data:user})

});
