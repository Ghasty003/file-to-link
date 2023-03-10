import { Router } from "express";
import { getImageLink, uploadImage } from "../controllers/imageController";

const router = Router();

router.post("/", uploadImage);

router.get("/:urlId", getImageLink);

export default router;