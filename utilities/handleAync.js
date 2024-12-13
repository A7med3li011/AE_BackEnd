import AppError from "./handleError.js";

export const handleAsync = (fn) => {
  return (req, res, next) => {
    fn(req,res,next).catch((err) => next(new AppError(err.message,400)));
  };
};
