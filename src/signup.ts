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

function isValidPassword (password: string) {
    if (password.length < 8) return false;
    if (!password.match(/\d+/)) return false;
    if (!password.match(/[a-z]+/)) return false;
    if (!password.match(/[A-Z]+/)) return false;
    return true;
}

app.post('/signup', async(req: Request, res: Response) => {
    const input = req.body;

    if(!isValidName(input.name)){
        res.status(422).json({message: 'Invalid name'});
    }

    if(!isValidEmail(input.email)){
        res.status(422).json({message: 'Invalid email'});
    }

    if(!isValidPassword(input.password)){
        res.status(422).json({message: 'Invalid password'});
    }

    const accountToSave = {
        name: input.name,
        email: input.email,
        password: input.password,
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