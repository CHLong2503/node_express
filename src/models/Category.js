import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "Uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "Uncategorized",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = model("Category", CategorySchema);
export default Category;
