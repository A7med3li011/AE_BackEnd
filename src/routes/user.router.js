import express from "express";
import {
  confirmEmail,
  forgetPassword,
  signin,
  signUp,
  signout,
  userImage,
  getUser,
} from "../controllers/user.controller.js";
import {
  validateSingleImage,
  validateuserSignUp,
} from "../../middleWare/validation/validationExcute.js";
import { auth } from "../../middleWare/auth.js";
import { multer4server } from "./../../service/multer/multerServer.js";

const userRouters = express.Router();

userRouters.post("/signup", validateuserSignUp, signUp);
userRouters.post("/signin", signin);
userRouters.post("/signout", auth(["user", "admin"]), signout);
userRouters.post(
  "/userImage",
  multer4server().array("image"),
  validateSingleImage,
  auth(["user", "admin"]),
  userImage
);
userRouters.post("/confirmeEmail", confirmEmail);
userRouters.post("/forgetPassword", forgetPassword);
userRouters.get("/", auth(["user", "admin"]),getUser);

export default userRouters;
