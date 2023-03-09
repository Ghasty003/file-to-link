import { Router } from "express";


const router = Router();

router.post("/", (_req, res) => {
    res.status(200).json("Image route")
})


export default router;