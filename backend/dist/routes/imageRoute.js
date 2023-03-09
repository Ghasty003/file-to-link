"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (_req, res) => {
    res.status(200).json("Image route");
});
exports.default = router;
