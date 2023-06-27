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
        })
})


export default studyBuddySchema