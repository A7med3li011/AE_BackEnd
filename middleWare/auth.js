import AppError from "../utilities/handleError.js";
import jwt from "jsonwebtoken";

export const auth = (role = ["user"]) => {
  return (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      jwt.verify(token, process.env.SCERETEKEY, (err, decode) => {
        if (err) next(new AppError("token is not valid", 404));
        
        if (role.includes(decode.user.role)) {
          req.user = decode.user;
          next();
        } else {
          next(new AppError("Unauthorized", 401));
        }
      });
    } else {
      next(new AppError("token required", 400));
    }
  };
};
