import { Request, Response } from "express";
import { db } from "../server";


export function uploadImage(req: Request, res: Response) {
    const { image, url } = req.body;
    const q = "INSERT INTO images (`image`, `url`) VALUES (?)";
    const values = [image, url]
   
    db.query(q, [values], (err: Error, data: any) => {
        if (err) res.status(400).json({error: err.message});

        res.status(200).json({id: data.insertId});
    })
}

export function getImageLink(req: Request, res: Response) {
    const { imageId } = req.params;

    const q = "SELECT * FROM images WHERE url = ?";

    db.query(q, [imageId], (err: Error, data: unknown) => {
        if (err) res.status(400).json({error: err.message});

        res.status(200).json(data);
    })
}