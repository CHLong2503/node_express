import { Router } from "express";
import {
  getList,
  getDetail,
  create,
  update,
  remove,
} from "../controllers/product.js";
import { checkPermission } from "../middleware/checkPermission.js";

const routerProduct = Router();

routerProduct.get("/", getList);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", checkPermission, create);
routerProduct.put("/:id", checkPermission, update);
routerProduct.delete("/:id", checkPermission, remove);

export default routerProduct;
