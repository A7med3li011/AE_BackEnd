import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  code: {
    type: String,
    require: [true, "code is required"],
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  useBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  fromDate: {
    type: Date,
    required: true,
  },

  toDate: {
    type: Date,
    required: true,
  },
});

const  couponModel = mongoose.model("Coupon", couponSchema);
export default couponModel