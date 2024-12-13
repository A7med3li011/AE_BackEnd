import mongoose from "mongoose";
//mongodb://127.0.0.1:27017/AE
export const connection = () => {
  mongoose
    .connect(`${process.env.DATABASEONLINE}`)
    .then((res) => console.log("connection establish"))
    .catch((err) => console.log("connection error"));
};
