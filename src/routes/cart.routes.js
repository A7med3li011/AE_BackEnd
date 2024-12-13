import express from "express";
import {
  addToCart,
  clearCart,
  deleteFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import { validatecart } from "../../middleWare/validation/validationExcute.js";
import { auth } from "../../middleWare/auth.js";

const cartRoutes = express.Router();

cartRoutes.post("/:id",auth(["user","admin"]), validatecart,addToCart);
cartRoutes.delete("/:id", auth(["user","admin"]),deleteFromCart);
cartRoutes.delete("/", auth(["user","admin"]),clearCart);
cartRoutes.get("/", auth(["user","admin"]),getCart);

export default cartRoutes;
