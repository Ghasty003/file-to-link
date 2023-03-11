"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageLink = exports.uploadImage = void 0;
const server_1 = require("../server");
function uploadImage(req, res) {
    const { image, urlId } = req.body;
    const q = "INSERT INTO imageDb (`image`, `url`) VALUES (?)";
    const values = [image, urlId];
    server_1.db.query(q, [values], (err, data) => {
        if (err)
            res.status(400).json({ error: err.message });
        res.status(200).json({ id: data.insertId });
    });
}
exports.uploadImage = uploadImage;
function getImageLink(req, res) {
    const { urlId } = req.params;
    const q = "SELECT * FROM imageDb WHERE url = ?";
    server_1.db.query(q, [urlId], (err, data) => {
        if (err)
            res.status(400).json({ error: err.message });
        if (!data.length) {
            return res.status(404).json({ error: "data doesn't exist" });
        }
        res.status(200).json(data);
    });
}
exports.getImageLink = getImageLink;
