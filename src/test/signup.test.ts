import axios from "axios";

describe('Signup [integration]', () => {

    test('Must create an account correctly', async() => {
        const inputCreateAccount = {
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            document: '60993883893',
            password: 'Test.1234',
        }
        const responseSignup = await axios.post('http://localhost:3025/signup', inputCreateAccount);
        const outputSignup = responseSignup.data;

        expect(outputSignup.accountId).toBeDefined();
    });
});