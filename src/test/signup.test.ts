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
});