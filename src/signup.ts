import { randomUUID } from "crypto";
import express, { Request, Response } from "express";

const app = express();

app.post('/signup', async(req: Request, res: Response) => {
    res.json({ accountId: randomUUID() })
});

app.listen(3025);