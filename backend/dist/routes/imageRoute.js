"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
router.post("/", imageController_1.uploadImage);
router.get("/:urlId", imageController_1.getImageLink);
exports.default = router;
