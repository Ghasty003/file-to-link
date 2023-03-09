import { Router } from "express";


const router = Router();

router.post("/api/image", (_req, res) => {
    res.status(200).json("Image route")
})