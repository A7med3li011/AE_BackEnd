import express from "express";
import { multer4server } from "./../../service/multer/multerServer.js";
import {
  createProduct,
  deletePRoduct,
  updateProduct,
  getProducts,
  getProduct,
  
} from "../controllers/product.controller.js";
import {
  validateCreateProduct,
  validateMultipleImages,
  validateUpdateProduct,
} from "../../middleWare/validation/validationExcute.js";
import { auth } from "../../middleWare/auth.js";
const productRoutes = express.Router();

productRoutes.post(
  "/",
  multer4server().array("images"),
  auth(["admin"]),
  validateCreateProduct,
  validateMultipleImages,
  createProduct
);
productRoutes.put(
  "/:id",
  auth(["admin"]),
  validateUpdateProduct,

  updateProduct
);
productRoutes.delete("/:id", auth(["admin"]), deletePRoduct);
productRoutes.get("/:id", auth(["admin", "user"]), getProduct);
productRoutes.get("/", auth(["admin", "user"]), getProducts);


export default productRoutes;
