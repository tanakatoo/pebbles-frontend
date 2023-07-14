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



export const handlers = [

    //login
    rest.post('http://localhost:3001/auth/login', (req, res, ctx) => {

        console.log(res(ctx.json(loginResponse)))
        return res(ctx.json(loginResponse));
    }),

    rest.post('http://localhost:3001/auth/logout', (req, res, ctx) => {

        console.log('MOCK /logout')
        window.localStorage.setItem('token', null)
        return res(ctx.json());
    }),


    // Called via <ExploreCommunity type="studyBuddy" />
    rest.get('http://localhost:3001/study-buddies/1', (req, res, ctx) => {
        console.log('MOCK /study-buddies/1');

        return res(ctx.json([]));
    }),

    // Called via <ExploreCommunity type="studyBuddy" />
    rest.post('http://localhost:3001/auth/register', (req, res, ctx) => {
        console.log('MOCK /auth/register');

        return res(ctx.json(loginResponse));
    }),

]