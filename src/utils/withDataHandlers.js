import { rest } from 'msw'

let studybuddyResponse = [
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
        "study_buddy_activate_date": "2023-07-13T04:00:00.000Z",
        "study_buddy_types": [
            "StudyBuddy",
            "Volunteer"
        ]
    }
]

console.log('in data handlers', studybuddyResponse)

export const withDataHandlers = [

    //get some study buddies
    rest.get('http://localhost:3001/study-buddies/1', (req, res, ctx) => {
        console.log('MOCK with data /study-buddies/1')
        console.log(studybuddyResponse)
        return res(ctx.json(studybuddyResponse));
    }),

]