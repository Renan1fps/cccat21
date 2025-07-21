import { randomUUID } from "crypto";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json())

const accounts: any = [];

app.post('/signup', async(req: Request, res: Response) => {
    const body = req.body;

    if(body.name.split(' ').length !==2){
        res.status(422).json({message: 'Invalid name'});
    }

    const accountToSave = {
        name: body.name,
        email: body.email,
        passowrd: body.passoword,
        document: body.document,
        accountId: randomUUID(),
    };
    accounts.push(accountToSave);
    res.json({ accountId: accountToSave.accountId });
});

app.get('/accounts/:accountId', async(req: Request, res: Response) => {
    const accountId = req.params.accountId
    const account = accounts.find((item: any) => item.accountId === accountId);
    res.json(account)
});

app.listen(3025);