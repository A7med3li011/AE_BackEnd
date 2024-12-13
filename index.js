import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connection } from "./db/connection.js";
import userRouters from "./src/routes/user.router.js";
import AppError from "./utilities/handleError.js";
import cors from "cors";
import { auth } from "./middleWare/auth.js";
import categoryRoutes from "./src/routes/category.routes.js";
import subCategoryRoutes from "./src/routes/subCategory.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import wishRoutes from "./src/routes/wishList.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import couponRoutes from "./src/routes/coupon.routes.js";

const app = express();

connection();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
  res.status(200).json({mes:"hello in my project"})
})
app.use("/api/v1/AE/user", userRouters);
app.use("/api/v1/AE/category", categoryRoutes);
app.use("/api/v1/AE/subCategory", subCategoryRoutes);
app.use("/api/v1/AE/product", productRoutes);
app.use("/api/v1/AE/cart", cartRoutes);
app.use("/api/v1/AE/wishList", auth(["admin", "user"]), wishRoutes);
app.use("/api/v1/AE/order", auth(["admin", "user"]), orderRouter);
app.use("/api/v1/AE/coupon", auth(["admin", "user"]), couponRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl}`, 404));
});
app.use((err, req, res, next) => {
  if (err) return res.status(err.statusCode).json({ message: err.message });
});

const Port = process.env.Port || 3002;
app.listen(Port, () => {
  console.log("server on");
});
