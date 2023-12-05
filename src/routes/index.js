import express from "express";
const router = express.Router();
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerImgs from "./uploadImgs.js";

router.use("/product", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategory);
router.use("/imgs", routerImgs);

export default router;
