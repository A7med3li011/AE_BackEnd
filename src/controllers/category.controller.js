import categoryModel from "../../db/models/categoryModel.js";
import { handleAsync } from "../../utilities/handleAync.js";
import AppError from "../../utilities/handleError.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const { name,gender } = req.body;

  const categoryExist = await categoryModel.findOne({ name:name.toLowerCase(),gender });
  if (categoryExist)
    return next(new AppError("category is already exist", 409));

  const newCategory = await categoryModel.create({
    name: name.toLowerCase(),
    gender,
    createdBy: req.user._id,
  });
  res.status(201).json({ message: "success", data: newCategory });
});

export const getCategories = handleAsync(async (req, res, next) => {

  const categories = await categoryModel.find()
  res.status(201).json({ message: "success", data: categories });
});

