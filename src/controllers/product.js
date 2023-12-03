import Product from "../models/Products.js";
import { productValid } from "../validations/product.js";

// get all products
export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    if (products.length === 0) {
      return res.status(404).json({ msg: "No product found" });
    }
    return res.status(200).json({
      msg: "Get list product success",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// get detail product
export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // console.log("Product: ", product);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json({
      message: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// create product
export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({ msg: "Create product failed" });
    }
    return res
      .status(201)
      .json({ msg: "Create product success", data: product });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// update product
export const update = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ msg: "Product update failed!" });
    }
    return res.status(200).json({
      message: "Product updated!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete product
export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        msg: "Delete product failed",
      });
    }
    return res.status(200).json({
      msg: "Delete product success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
