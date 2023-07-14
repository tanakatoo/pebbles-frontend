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

        console.log(res(ctx.json(['NOT_FOUND'])))
        return res(ctx.json(['NOT_FOUND']));
    }),

]