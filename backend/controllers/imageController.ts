import { Request, Response } from "express";
import { db } from "../server";


export function uploadImage(req: Request, res: Response) {
    const { image, urlId } = req.body;
    const q = "INSERT INTO imageDb (`image`, `url`) VALUES (?)";
    const values = [image, urlId]
   
    db.query(q, [values], (err: Error, data: any) => {
        if (err) res.status(400).json({error: err.message});

        res.status(200).json({id: data.insertId});
    })
}

export function getImageLink(req: Request, res: Response) {
    const { urlId } = req.params;

    const q = "SELECT * FROM imageDb WHERE url = ?";

    db.query(q, [urlId], (err: Error, data: any) => {
        if (err) res.status(400).json({error: err.message});

        if (!data.length) {
            return res.status(404).json({error: "data doesn't exist"});
        }

        res.status(200).json(data);
    })
}