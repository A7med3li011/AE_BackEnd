import express from "express";
import {
  addTowishList,
  clearWishList,
  deleteFromwishList,
  getwhishList,
} from "../controllers/wishList.controller.js";

const wishRoutes = express.Router();

wishRoutes.post("/:id", addTowishList);
wishRoutes.delete("/:id", deleteFromwishList);
wishRoutes.delete("/", clearWishList);
wishRoutes.get("/", getwhishList);

export default wishRoutes;
