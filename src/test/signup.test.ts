import axios from "axios";

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
});