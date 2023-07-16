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

const contactsResponse =
    [
        {
            "user_id": 1,
            "username": "ktoo",
            "avatar": "2.jpg"
        },
        {
            "user_id": 15,
            "username": "june",
            "avatar": "4.jpg"
        }
    ]

const blockedResponse = [
    {
        "blocked_user_id": 3,
        "username": "blockMe",
        "avatar": "9.jpg"
    }
]
const mainSearchResults = [
    {
        "username": "hello2",
        "avatar": "9.jpg",
        "name": null,
        "about": null,
        "premium_acct_id": null,
        "end_date": null
    },
    {
        "username": "helloo",
        "avatar": "14.jpg",
        "name": null,
        "about": null,
        "premium_acct_id": null,
        "end_date": null
    }
]

const changePassword = "completed"

const newMessage = [
    {
        "toavatar": "9.jpg",
        "to": "hello",
        "fromavatar": "",
        "from": "hello"
    }
]

const continuingMsg = [
    {
        "toavatar": "9.jpg",
        "fromavatar": "2.jpg",
        "from": "ktoo",
        "to": "hello",
        "from_user_id": 1,
        "to_user_id": 2,
        "msg": "the most recent one reply to second one",
        "sent_at": "2023-06-09 15:30:00",
        "read": true
    },
    {
        "toavatar": "2.jpg",
        "fromavatar": "9.jpg",
        "from": "hello",
        "to": "ktoo",
        "from_user_id": 2,
        "to_user_id": 1,
        "msg": "2nd most recent one reply",
        "sent_at": "2023-06-08 15:30:00",
        "read": true
    },
    {
        "toavatar": "9.jpg",
        "fromavatar": "2.jpg",
        "from": "ktoo",
        "to": "hello",
        "from_user_id": 1,
        "to_user_id": 2,
        "msg": "first message",
        "sent_at": "2023-06-07 15:30:00",
        "read": true
    }
]

const latestMessages = [
    {
        "toavatar": "9.jpg",
        "fromavatar": "4.jpg",
        "from": "june",
        "to": "hello",
        "from_user_id": 15,
        "to_user_id": 2,
        "msg": "testing\n",
        "sent_at": "2023-07-15 20:57:44.804634",
        "read": false
    },
    {
        "toavatar": "9.jpg",
        "fromavatar": "2.jpg",
        "from": "ktoo",
        "to": "hello",
        "from_user_id": 1,
        "to_user_id": 2,
        "msg": "the most recent one reply to second one",
        "sent_at": "2023-06-09 15:30:00",
        "read": true
    }
]

const returnUser = [
    {
        "id": 2,
        "username": "hello",
        "name": null,
        "avatar": "9.jpg",
        "country_en": null,
        "country_ja": null,
        "city_en": null,
        "city_ja": null,
        "state_en": null,
        "state_ja": null,
        "gender": "female",
        "about": null,
        "free_trial_start_date": null,
        "study_buddy_bio": "just chatting",
        "study_buddy_purpose": "i don't know why",
        "native_language": "Japanese",
        "learning_language": "English",
        "language_level": "Beginner",
        "time_zone": "NewYork",
        "age_range": "26-35",
        "study_buddy_active": true,
        "study_buddy_activate_date": "2023-07-13T04:00:00.000Z"
    }
]

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


    rest.post('http://localhost:3001/auth/register', (req, res, ctx) => {
        console.log('MOCK /auth/register');

        return res(ctx.json(loginResponse));
    }),


    rest.post('http://localhost:3001/email', (req, res, ctx) => {
        console.log('MOCK /email');

        return res(ctx.json('sents'));
    }),


    rest.get('http://localhost:3001/users/contacts', (req, res, ctx) => {
        console.log('MOCK /users/contacts');

        return res(ctx.json(contactsResponse));
    }),

    rest.get('http://localhost:3001/users/blocked', (req, res, ctx) => {
        console.log('MOCK /users/blocked');

        return res(ctx.json(blockedResponse));
    }),

    rest.get('http://localhost:3001/users/search', (req, res, ctx) => {
        console.log('MOCK /users/search');

        return res(ctx.json(mainSearchResults));
    }),

    rest.post('http://localhost:3001/auth/change-password', (req, res, ctx) => {
        console.log('MOCK /auth/change-password');

        return res(ctx.json(changePassword));
    }),

    //for continuing conversation
    rest.get('http://localhost:3001/messages/:username', (req, res, ctx) => {
        console.log('MOCK /messages/:username');
        console.log(req.params)
        return res(ctx.json(continuingMsg));
    }),

    //get latest message from all users
    rest.get('http://localhost:3001/messages', (req, res, ctx) => {
        console.log('MOCK /messages');
        return res(ctx.json(latestMessages));
    }),

    //get latest message from all users
    rest.get('http://localhost:3001/users/saved-users', (req, res, ctx) => {
        console.log('MOCK /users/saved-users');
        return res(ctx.json(returnUser));
    }),
]