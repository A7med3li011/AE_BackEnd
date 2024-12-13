

import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        requiree:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    image:{
        public_id:String,
         secure_url:String
    },
    gender:{
        type:String
    }
    
})

const subCategoryModel = mongoose.model('Subcategory',subCategorySchema);

export default subCategoryModel