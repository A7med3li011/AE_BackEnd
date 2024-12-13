import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: String,
  colors: [String],
  imageCover: {
    public_id: String,
    secure_url: String,
  },
  images: [{ public_id: String, secure_url: String }],

  category:{
    type :mongoose.Types.ObjectId,
    ref:"Category"
  },
  subCategory:{
    type:mongoose.Types.ObjectId,
    ref:"Subcategory"
  },
  rate:Number,
  size:[String],
  price:Number,
  discount:Number,
  gender:String,
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  description:String,
  inWishList:{
    type:Boolean,
    default:false
  },
  
});

const productModel = model("product", productSchema);

export default productModel;
