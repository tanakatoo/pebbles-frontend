import * as Yup from 'yup'

const studyBuddySchema = Yup.object().shape({
    study_buddy_active: Yup.boolean(),
    study_buddy_types: Yup
        .array()
        .when("study_buddy_active", {
            is: (val) => val === true,
            then: (schema) => schema.min(1, "STUDY_BUDDY_TYPE"),
            otherwise: (schema) => schema
        }),
    study_buddy_purpose: Yup
        .string()
        .when("study_buddy_active", {
            is: (val) => val === true,
            then: (schema) => schema.required("STUDY_BUDDY_PURPOSE"),
            otherwise: (schema) => schema
        }),
    study_buddy_bio: Yup
        .string()
        .when("study_buddy_active", {
            is: (val) => val === true,
            then: (schema) => schema.required("STUDY_BUDDY_BIO"),
            otherwise: (schema) => schema
        }),
    native_language: Yup
        .string()
        .when("study_buddy_active", {
            is: (val) => val === true,
            then: (schema) => schema.required("NATIVE_LANG"),
            otherwise: (schema) => schema
        }),
    learning_language: Yup
        .string()
        .when(["study_buddy_active", "study_buddy_types"], {
            is: (active, type) => active === true && (type.includes("LanguageExchange") || type.includes("StudyBuddy")),
            then: (schema) => schema.required("LEARNING_LANG"),
            otherwise: (schema) => schema
        }),
    time_zone: Yup
        .string()
        .when("study_buddy_active", {
            is: (val) => val === true,
            then: (schema) => schema.required("TIME_ZONE"),
            otherwise: (schema) => schema
        }),
})


export default studyBuddySchema