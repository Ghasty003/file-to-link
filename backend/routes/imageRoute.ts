import { Router } from "express";
import { getImageLink, uploadImage } from "../controllers/imageController";

const router = Router();

router.post("/", uploadImage);

router.get("/:imageId", getImageLink);

export default router;