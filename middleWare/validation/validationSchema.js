import Joi from "joi";
import mongoose from "mongoose";

export const userSchema = {
  signup: Joi.object({
    name: Joi.string().required().min(3).max(20),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    gender: Joi.string().required().valid("male", "female"),
    password: Joi.string().required(),
    phone: Joi.string()
      .required()
      .pattern(/^01[0-2,5]\d{8}$/),
  }),
};

export const createSubCategorySchema = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(20),
    category: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helper.message("invalid product id");
        }
      }),
    gender: Joi.string().required().valid("male", "female"),
  }),
};
export const createProductSchema = {
  body: Joi.object({
    title: Joi.string().required().min(3).max(50),
    category: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helper.message("invalid product id");
        }
      }),
    gender: Joi.string().required().valid("male", "female"),
    description: Joi.string().required(),
    colors: Joi.array().items(Joi.string().required()),

    subCategory: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helper.message("invalid subCaregory id");
        }
      }),
    rate: Joi.number().required().min(1).max(5).integer(),
    size: Joi.array().items(Joi.string().required()),
    price: Joi.number().required().positive(),
    discount: Joi.number().positive(),
    amount: Joi.number().positive().min(1).integer(),
  }),
};
export const updateProductSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(20),
    category: Joi.string().custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.message("invalid category id");
      }
    }),
    gender: Joi.string().valid("male", "female"),
    colors: Joi.array().items(Joi.string()),

    subCategory: Joi.string().custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helper.message("invalid subCaregory id");
      }
    }),
    rate: Joi.number().min(1).max(5).integer(),
    size: Joi.array().items(Joi.string()),
    price: Joi.number().positive(),
    discount: Joi.number().positive(),
  }),
};

export const singleImageSchema = Joi.array()
  .length(1)
  .items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(), // Restrict MIME types
      filename: Joi.string().required(), // Restrict MIME types
      destination: Joi.string().required(), // Restrict MIME types
      path: Joi.string().required(), // Restrict MIME types
      size: Joi.number().positive().required(), // Max size of 5MB
    })
  );
export const multipleImagesSchema = Joi.array().items(
  Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(), // Restrict MIME types
    filename: Joi.string().required(), // Restrict MIME types
    destination: Joi.string().required(), // Restrict MIME types
    path: Joi.string().required(), // Restrict MIME types
    size: Joi.number().positive().required(), // Max size of 5MB
  })
);

export const orderSceham = Joi.object({
  address:Joi.string().required(),
  phone:Joi.string()
  .required()
  .pattern(/^01[0-2,5]\d{8}$/),
  paymnetMethod:Joi.string().required().valid("cash","card"),
  couponCode:Joi.string(),
})
export const cartSchema = Joi.object({
  size: Joi.string().valid("s", "m", "l", "xl", "ml", "xxl").required(),
  amount: Joi.number(),
});

export const createCouponSChema = Joi.object({
  code: Joi.string().required().min(3).max(30),

  amount: Joi.number().required().min(1).max(100).integer().positive(),
  fromDate: Joi.date().required().greater(Date.now()),

  toDate: Joi.date().required().greater(Joi.ref("fromDate")),
});
export const checkCoupon = Joi.object({
  code: Joi.string().required().min(3).max(30),

});
