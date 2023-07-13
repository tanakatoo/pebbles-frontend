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
    rest.post('http://localhost:3001/auth/login', (req, res, ctx) => {


        console.log(res(ctx.json(loginResponse)))
        return res(
            // Respond with a 200 status code
            // ctx.status(200),
            res(ctx.json(loginResponse))
        )
    }),

    // Called via <ExploreCommunity type="studyBuddy" />
    rest.get('http://localhost:3001/study-buddies/1', (req, res, ctx) => {
        console.log('MOCK /study-buddies/1');
        console.log('  response:', {});
        return res(ctx.json({}));
    })
]