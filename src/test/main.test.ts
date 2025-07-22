import axios from "axios";

axios.defaults.validateStatus = () => true;

describe('Signup [integration]', () => {

    test('Must create an account correctly', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        expect(outputSignup.accountId).toBeDefined();
        const responseGetAccount = await axios.get(`http://localhost:3025/accounts/${outputSignup.accountId}`);
        const outputGetAccount = responseGetAccount.data;
        expect(outputGetAccount.name).toBe(inputSignup.name);
        expect(outputGetAccount.email).toBe(inputSignup.email);
        expect(outputGetAccount.document).toBe(inputSignup.document);
    });

    test('Should return an error if the name is invalid', async() => {
        const inputSignup = {
            name: 'Jhon',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        expect(responseSignup.status).toBe(422);
        expect(outputSignup.message).toBe('Invalid name');
    });

    test('Should return an error if the email is invalid', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        expect(responseSignup.status).toBe(422);
        expect(outputSignup.message).toBe('Invalid email');
    });

    test('Should return an error if the password is invalid', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',          
            document: '60993883893',
            password: '1111',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        expect(responseSignup.status).toBe(422);
        expect(outputSignup.message).toBe('Invalid password');
    });
});

describe('Deposit [integration]', ()=> {

    test('Must create a deposit correctly', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        const inputDeposit = {
            accountId: outputSignup.accountId,
            assetId: 'BTC',
            quantity: 10,
        };
        await axios.post('http://localhost:3025/deposit', inputDeposit);
        const responseGetAccount = await axios.get(`http://localhost:3025/accounts/${outputSignup.accountId}`);
        const outputGetAccount = responseGetAccount.data;
        expect(outputGetAccount.assets).toHaveLength(1);
        expect(outputGetAccount.assets[0].assetId).toBe(inputDeposit.assetId);
         expect(outputGetAccount.assets[0].quantity).toBe(inputDeposit.quantity);
    });
});

describe('Withdraw [integration]', ()=> {

    test('Must create a Withdraw correctly', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        const inputDeposit = {
            accountId: outputSignup.accountId,
            assetId: 'BTC',
            quantity: 10,
        };
        await axios.post('http://localhost:3025/deposit', inputDeposit);
        const inputWithdraw = {
            accountId: outputSignup.accountId,
            assetId: 'BTC',
            quantity: 5
        }
        await axios.post('http://localhost:3025/withdraw', inputWithdraw);
        const responseGetAccount = await axios.get(`http://localhost:3025/accounts/${outputSignup.accountId}`);
        const outputGetAccount = responseGetAccount.data;
        expect(outputGetAccount.assets).toHaveLength(1);
        expect(outputGetAccount.assets[0].assetId).toBe(inputDeposit.assetId);
         expect(outputGetAccount.assets[0].quantity).toBe(inputDeposit.quantity - inputWithdraw.quantity);
    });

        test('Must not make a withdraw', async() => {
        const inputSignup = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputSignup);
        const outputSignup = responseSignup.data;
        const inputDeposit = {
            accountId: outputSignup.accountId,
            assetId: 'BTC',
            quantity: 5,
        };
        await axios.post('http://localhost:3025/deposit', inputDeposit);
        const inputWithdraw = {
            accountId: outputSignup.accountId,
            assetId: 'BTC',
            quantity: 10
        }
        const responseWithdraw = await axios.post('http://localhost:3025/withdraw', inputWithdraw);
        const outputWithdraw = responseWithdraw.data;
        expect(responseWithdraw.status).toBe(400);
        expect(outputWithdraw.message).toBe('Insufficient funds');
    });
});