import subCategoryModel from "../../db/models/subCategoryModel.js";
import { handleAsync } from "../../utilities/handleAync.js";
import AppError from "../../utilities/handleError.js";
import cloudinary from "./../../service/cloudinary/cloundairy.js";
import categoryModel from "./../../db/models/categoryModel.js";


export const createSubCategory = handleAsync(async (req, res, next) => {
  const { name, category, gender } = req.body;
  const subCategoryExist = await subCategoryModel.findOne({ name ,gender });
  if (subCategoryExist)
    return next(new AppError("subCategory already exist", 409));
  const categoryExsit = await categoryModel.findOne({ _id: category });
  if (!categoryExsit)
    return next(new AppError("subCategory is not exist", 404));

  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.files[0].path,
    {
      folder: `AE/subCategory/${name}`,
    }
  );

  const newsubCategory = await subCategoryModel.create({
    name: name.toLowerCase(),
    image: { public_id, secure_url },
    createdBy: req.user._id,
    category,
    gender,
  });

  res.status(201).json({ message: "success", data: newsubCategory });
});

export const getsubs = handleAsync (async (req,res,next) =>{

    const data = await subCategoryModel.find(req.query)

    res.status(200).json({ message: "success", data: data})

})