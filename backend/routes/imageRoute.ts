import { Router } from "express";
import { uploadImage } from "../controllers/imageController";

const router = Router();

router.post("/", uploadImage);


export default router;