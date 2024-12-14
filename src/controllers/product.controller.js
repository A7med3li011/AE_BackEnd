import productModel from "../../db/models/productModel.js";
import { handleAsync } from "./../../utilities/handleAync.js";
import categoryModel from "./../../db/models/categoryModel.js";
import subCategoryModel from "./../../db/models/subCategoryModel.js";
import AppError from "../../utilities/handleError.js";
import cloudinary from "./../../service/cloudinary/cloundairy.js";

export const createProduct = handleAsync(async (req, res, next) => {
  let {
    title,
    colors,
    category,
    subCategory,
    rate,
    size,
    price,
    discount,
    gender,
    description,
  } = req.body;

  const productExist = await productModel.findOne({ title });
  if (productExist) return next(new AppError("product already exists", 409));

  const categoryExsit = await categoryModel.findOne({ _id: category });
  if (!categoryExsit) return next(new AppError("category not found", 404));

  const subCategoryExist = await subCategoryModel.findOne({ _id: subCategory });
  if (!subCategoryExist)
    return next(new AppError("subCategory not found ", 404));

  let urlS = [];
  const images = req?.files;

  for (const image of images) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      image.path,
      {
        folder: `AE/Product/${Math.random()}/${title}`,
      }
    );
    urlS.push({ public_id, secure_url });
  }

  const newProduct = await productModel.create({
    title,
    description,
    colors,
    category,
    subCategory,
    rate,
    size,
    price: discount ? price - price * (discount / 100) : price,
    discount,
    gender,
    images: urlS,
    imageCover: urlS[0],
  });

  res.json({ message: "success", newProduct });
});
export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  let { title, category, subCategory, rate, price, discount, gender } =
    req.body;

  const productExist = await productModel.findOne({ _id: id });
  if (!productExist) return next(new AppError("product not found", 404));

  if (category) {
    const categoryExsit = await categoryModel.findOne({ _id: category });
    if (!categoryExsit) return next(new AppError("category not found", 404));

    productExist.category = category;
  }
  if (subCategory) {
    const subCategoryExist = await subCategoryModel.findOne({
      _id: subCategory,
    });
    if (!subCategoryExist) {
      return next(new AppError("subCategory not found ", 404));
    }
    productExist.subCategory = subCategory;
  }
  if (title) {
    productExist.title = title;
  }
  if (price) {
    productExist.price = price;
  }
  if (discount) {
    productExist.discount = discount;
  }
  if (rate) {
    productExist.rate = rate;
  }
  if (gender) {
    productExist.gender = gender;
  }

  await productExist.save();

  res.status(200).json({ message: "success", data: productExist });
});

export const deletePRoduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findByIdAndDelete(id);

  if (!product) return next(new AppError("product not found", 404));

  res.status(200).json({ message: "success", data: product });
});

export const getProducts = handleAsync(async (req, res, next) => {
  let products
  if(req.query.title){

     products = await productModel.find({title:{  $regex: req.query.title, $options: 'i'}}).populate("");
  }else{

    products = await productModel.find(req.query).populate("");
   
  }


    // console.log(products.length)
  res.status(200).json({ message: "success"  ,data: products});
});

export const getProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findOne({ _id: id });
  if (!product) return next(new AppError("product not found", 404));
  res.status(200).json({ message: "success", data: product });
});

