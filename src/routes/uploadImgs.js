import { Router } from "express";
import { removeImgs, uploadImgs } from "../controllers/images.js";
import upload from "../middleware/uploadImages.js";

const routerImgs = Router();

routerImgs.post("/upload", upload.array("images", 10), uploadImgs);
routerImgs.delete("/remove/:publicId", removeImgs);

export default routerImgs;
