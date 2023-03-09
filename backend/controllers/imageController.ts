import { Request, Response } from "express";
import { db } from "../server";

export function uploadImage(req: Request, res: Response) {
    const { image } = req.body;
    const q = "INSERT INTO images (`image`) VALUES (?)";

    db.query(q, [image], (err: Error, data: unknown) => {
        if (err) res.status(400).json({error: err.message});

        res.status(200).json(data);
    })
}

export function getImageLink(req: Request, res: Response) {
    const { imageId } = req.params;

    const q = "SELECT * FROM images WHERE id = ?";

    db.query(q, [imageId], (err: Error, data: unknown) => {
        if (err) res.status(400).json({error: err.message});

        res.status(200).json(data);
    })
}