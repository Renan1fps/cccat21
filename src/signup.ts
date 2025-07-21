import { randomUUID } from "crypto";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json())

const accounts: any = [];

function isValidName (name: string) {
    return name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isValidEmail (email: string) {
    return email.match(/^(.+)\@(.+)$/);
}

app.post('/signup', async(req: Request, res: Response) => {
    const input = req.body;

    if(!isValidName(input.name)){
        res.status(422).json({message: 'Invalid name'});
    }

    if(!isValidEmail(input.email)){
        res.status(422).json({message: 'Invalid email'});
    }

    const accountToSave = {
        name: input.name,
        email: input.email,
        passowrd: input.passoword,
        document: input.document,
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