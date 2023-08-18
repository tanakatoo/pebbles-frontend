import { rest } from 'msw'

let loginResponse = {
    token: 'abcdefg',
    user: {
        id: 2,
        username: 'hello',
        role: 'regular',
        premium_join_date: '',
        premium_end_date: '',
        free_trial_start_date: '',
    }
}



export const errorHandlers = [

    //login
    rest.post('http://localhost:3001/auth/login', (req, res, ctx) => {
        const failLogin = {
            "error": {
                "message": "INVALID_CREDENTIALS",
                "status": 401
            }
        }

        return res(ctx.json([failLogin]).status(500));
    }),

    rest.post('http://localhost:3001/email', (req, res, ctx) => {
        console.log('MOCK error /email');
        const noData = {
            "error": {
                "message": "no data",
                "status": 500
            }
        }
        return res(ctx.json(noData).status(500));
    }),


    rest.post('http://localhost:3001/auth/set-password', (req, res, ctx) => {
        console.log('MOCK error /auth/set-password');
        return res(ctx.json(loginResponse).status(500));
    }),

    rest.get('http://localhost:3001/users/blocked', (req, res, ctx) => {
        console.log('MOCK no data /users/blocked');

        return res(ctx.json([]));
    }),
]