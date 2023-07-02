import { useSelector } from "react-redux"
import dbText from "../text/db.json"
import pageText from "../text/profile.json"


export const useStudybuddyActive = () => {
    return ([
        { key: pageText.STUDY_BUDDY_ACTIVE, value: true }
    ])
}

export const useEnglishLevelOptions = (withEmpty = false) => {
    const lang = useSelector(state => state.langFont.lang)
    let returnArr = []
    if (withEmpty) {
        returnArr = [{ key: pageText.SELECT_LANG_LEVEL, value: '' }]
    }
    return ([...returnArr,
    { key: dbText.language_levels.Beginner[lang], value: 'Beginner' },
    { key: dbText.language_levels.Intermediate[lang], value: 'Intermediate' },
    { key: dbText.language_levels.Advanced[lang], value: 'Advanced' }
    ])
}

export const useTimezoneOptions = (withEmpty = false) => {
    const lang = useSelector(state => state.langFont.lang)
    let returnArr = []
    if (withEmpty) {
        returnArr = [{ key: pageText.SELECT_TIME_ZONE, value: '' }]
    }
    return ([...returnArr,
    { key: dbText.timezones.LosAngeles[lang], value: 'LosAngeles' },
    { key: dbText.timezones.Chicago[lang], value: 'Chicago' },
    { key: dbText.timezones.NewYork[lang], value: 'NewYork' },
    { key: dbText.timezones.Toronto[lang], value: 'Toronto' },
    { key: dbText.timezones.SaoPaulo[lang], value: 'SaoPaulo' },
    { key: dbText.timezones.London[lang], value: 'London' },
    { key: dbText.timezones.Paris[lang], value: 'Paris' },
    { key: dbText.timezones.Zurich[lang], value: 'Zurich' },
    { key: dbText.timezones.Cairo[lang], value: 'Cairo' },
    { key: dbText.timezones.Moscow[lang], value: 'Moscow' },
    { key: dbText.timezones.Dubai[lang], value: 'Dubai' },
    { key: dbText.timezones.HongKong[lang], value: 'HongKong' },
    { key: dbText.timezones.Shanghai[lang], value: 'Shanghai' },
    { key: dbText.timezones.Singapore[lang], value: 'Singapore' },
    { key: dbText.timezones.Tokyo[lang], value: 'Tokyo' },
    { key: dbText.timezones.Sydney[lang], value: 'Sydney' }
    ])
}

export const useStudyBuddyTypeOptions = () => {
    const lang = useSelector(state => state.langFont.lang)
    return (
        [
            { key: dbText.study_buddy_types.StudyBuddy[lang], value: 'StudyBuddy' },
            { key: dbText.study_buddy_types.LanguageExchange[lang], value: 'LanguageExchange' },
            { key: dbText.study_buddy_types.Volunteer[lang], value: 'Volunteer' }
        ]
    )
}

export const useLanguageOptions = (withEmpty = false) => {
    const lang = useSelector(state => state.langFont.lang)
    let returnArr = []
    if (withEmpty) {
        returnArr = [{ key: pageText.SELECT_LANG, value: '' }]
    }
    return (
        [...returnArr,
        { key: dbText.languages.English[lang], value: 'English' },
        { key: dbText.languages.Japanese[lang], value: 'Japanese' }
        ])
}

export const useGenderOptions = (withEmpty = false) => {
    const lang = useSelector(state => state.langFont.lang)
    let returnArr = []
    if (withEmpty) {
        returnArr = [{ key: pageText.SELECT_GENDER, value: '' }]
    }
    return ([...returnArr,
    { key: dbText.genders.male[lang], value: 'male' },
    { key: dbText.genders.female[lang], value: 'female' },
    { key: dbText.genders.other[lang], value: 'other' }
    ])
}

export const useAgeRangeOptions = (withEmpty = false) => {
    const lang = useSelector(state => state.langFont.lang)
    let returnArr = []
    if (withEmpty) {
        returnArr = [{ key: pageText.SELECT_AGE_RANGE, value: '' }]
    }
    return ([...returnArr,
    { key: dbText.age_ranges['18-25'][lang], value: '18-25' },
    { key: dbText.age_ranges['26-35'][lang], value: '26-35' },
    { key: dbText.age_ranges['36-45'][lang], value: '36-45' },
    { key: dbText.age_ranges['46-59'][lang], value: '46-59' },
    { key: dbText.age_ranges['60+'][lang], value: '60+' }
    ])
}