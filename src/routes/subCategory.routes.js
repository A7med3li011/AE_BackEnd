import express from "express";
import {
  validateCreateSubCategory,
  validateSingleImage,
} from "../../middleWare/validation/validationExcute.js";
import { multer4server } from "./../../service/multer/multerServer.js";
import { createSubCategory,getsubs } from "../controllers/subCategory.controller.js";
import { auth } from "../../middleWare/auth.js";
const subCategoryRoutes = express.Router();
subCategoryRoutes.post(
  "/",
  multer4server().array("image"),
  auth(["admin"]),
  validateSingleImage,
  validateCreateSubCategory,

  createSubCategory
);
subCategoryRoutes.get("/",getsubs)
export default subCategoryRoutes;
