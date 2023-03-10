"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageLink = exports.uploadImage = void 0;
const server_1 = require("../server");
function uploadImage(req, res) {
    const { image, url } = req.body;
    const q = "INSERT INTO images (`image`, `url`) VALUES (?)";
    const values = [image, url];
    server_1.db.query(q, [values], (err, data) => {
        if (err)
            res.status(400).json({ error: err.message });
        res.status(200).json(data);
    });
}
exports.uploadImage = uploadImage;
function getImageLink(req, res) {
    const { imageId } = req.params;
    const q = "SELECT * FROM images WHERE id = ?";
    server_1.db.query(q, [imageId], (err, data) => {
        if (err)
            res.status(400).json({ error: err.message });
        res.status(200).json(data);
    });
}
exports.getImageLink = getImageLink;
