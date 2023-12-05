import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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

productSchema.plugin(mongoosePaginate);

const Product = model("Product", productSchema);

export default Product;
