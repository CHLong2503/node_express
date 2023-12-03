import { Router } from "express";
import {
  getAll,
  getDetail,
  create,
  update,
  remove,
} from "../controllers/category.js";
import { checkPermission } from "../middleware/checkPermission.js";

const routerCategory = Router();

routerCategory.get("/", getAll);
routerCategory.get("/:id", getDetail);
routerCategory.post("/", checkPermission, create);
routerCategory.put("/:id", checkPermission, update);
routerCategory.delete("/:id", checkPermission, remove);

export default routerCategory;
