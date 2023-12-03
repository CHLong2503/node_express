import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

export default Product;
