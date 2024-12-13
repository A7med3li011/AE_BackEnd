import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    secure_url: String,
    public_id: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "product" },
      amount: { type: Number },
      size:String
    },
  ],

  wishList: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  login: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  forgetString: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  orders:[{order:{type:mongoose.Types.ObjectId,ref:"Order"}}]
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
