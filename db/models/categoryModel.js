import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    requiree: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
