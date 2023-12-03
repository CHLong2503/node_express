import express from "express";
const router = express.Router();
import routerProduct from "./product.js";
import routerAuth from "./auth.js";

router.use("/product", routerProduct);
router.use("/auth", routerAuth);

export default router;
