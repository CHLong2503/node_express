import Category from "../models/Category.js";
import Product from "../models/Products.js";
import productValidator from "../validations/product.js";

// get all products
export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
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
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
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
    const { error } = productValidator.validate(req.body);
    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    const product = await Product.create(req.body);

    if (!product) {
      return res.status(404).json({ msg: "Create product failed" });
    }

    const updateCategory = await Category.findByIdAndUpdate(
      product.categoryId,
      {
        $addToSet: {
          products: product._id,
        },
      }
    );

    if (!updateCategory) {
      return res
        .status(404)
        .json({ msg: "Can't find category to add or update product!" });
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
    const { error } = productValidator.validate(req.body, {
      abortEarly: false,
    });
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

    const updateCategory = await Category.findByIdAndUpdate(
      product.categoryId,
      {
        $addToSet: {
          products: product._id,
        },
      }
    );

    if (!updateCategory) {
      return res
        .status(404)
        .json({ msg: "Can't find category to add or update product!" });
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

    const deleteCategory = await Category.findByIdAndDelete(data.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    if (!updateCategory) {
      return res
        .status(404)
        .json({ msg: "Can't find category to add or update product!" });
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
