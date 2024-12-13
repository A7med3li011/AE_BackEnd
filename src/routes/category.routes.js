import express from "express";
import { createCategory,getCategories } from "../controllers/category.controller.js";

import { auth } from "../../middleWare/auth.js";
const categoryRoutes = express.Router();
categoryRoutes.post("/", auth(["admin"]), createCategory);
categoryRoutes.get("/", auth(["admin","user"]), getCategories);

export default categoryRoutes;
