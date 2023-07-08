import React, { useEffect, useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import AuthApi from "../api/auth";
import { LOGIN } from "../reducers/actionTypes";
import ServerError from "../components/form/ServerError";
import { Formik, Form, ErrorMessage } from "formik"
import registerSchema from "../components/form/validation/registerSchema";
// import { TextInput } from "../components/form/Fields";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea"
import { Button } from "../components/button/Button";
import CTA from "../components/common/CTA";
import { Link } from "react-router-dom";
import contactSchema from "../components/form/validation/contactSchema";
import EmailApi from "../api/email";

const Contact = () => {
    const [flash, setFlash] = useState(null)
    const [errors, setErrors] = useState([])
    const profile = useSelector(state => state.profile.profile)
    const [savedValues, setSavedValues] = useState({
        name: '',
        subject: '',
        email: '',
        msg: ''
    })

    const [pageText, lang] = usePageText("contact")
    const INITIAL_DATA = {
        name: '',
        subject: '',
        email: '',
        msg: ''
    }


    useEffect(() => {
        if (profile) {
            setSavedValues({
                name: profile.name ? profile.name : profile.username ? profile.username : '',
                subject: '',
                email: profile.email ? profile.email : '',
                msg: ''
            })
        }
    }, [profile])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="mb-24">
            <CTA msg={pageText.CTA} msgBtn={pageText.CTA_BTN} btnLink={pageText.CTA_LINK} />
            <div className="mt-8 flex flex-col justify-center items-center mx-8">
                {flash && <p>{flash}</p>}
                {Object.keys(errors).length > 0 && <ServerError msg={errors} title={pageText.ERROR_TITLE} />}
                {errors.length === 0 && <h1 className="mb-8 text-center text-mobile-header-2">{pageText.H1}</h1>}
                <p className="mb-[56px] max-w-prose text-center">Feel free to email us at info@pebblescommunity.com or fill out the form below. We will reply within 2-3 business days.</p>
                <Formik
                    initialValues={savedValues || INITIAL_DATA}
                    validationSchema={contactSchema}
                    enableReinitialize
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log('submitting')
                        setErrors([])
                        try {
                            console.log(values)
                            console.log('submitting')
                            const res = await EmailApi.sendToInfo({
                                name: values.name,
                                subject: values.subject,
                                msg: values.msg,
                                email: values.email
                            })

                            setFlash(pageText.FLASH_MSG)
                        } catch (e) {
                            if (e instanceof TypeError) {
                                //means server is down
                                console.error("Typeerror at contact us page", e)
                                setErrors(["UNKNOWN"])
                            } else {
                                console.error("Unknown error at contact us page", e)
                                setErrors(e)
                            }
                        } finally {
                            setSubmitting(false)
                        }


                    }}
                >
                    {formik => {
                        return (
                            <Form className="flex flex-col w-full md:max-w-[500px]">
                                <Input
                                    label={pageText.NAME}
                                    name="name"
                                    type="text"
                                    placeholder={pageText.NAME_PLACEHOLDER}
                                />
                                <Input
                                    label={pageText.SUBJECT}
                                    name="subject"
                                    type="text"
                                />
                                <Input
                                    label={pageText.EMAIL}
                                    name="email"
                                    type="email"
                                    placeholder={pageText.EMAIL_PLACEHOLDER}
                                />

                                <Textarea
                                    label={pageText.MSG}
                                    name="msg"
                                    rows="5"
                                    placeholder={pageText.MSG_PLACEHOLDER}
                                />

                                <Button lang={lang} btnText={pageText.SUBMIT} type="submit" extraClasses="mt-12" isSubmitting={formik.isSubmitting} />
                                <p className="mt-4 text-center text-gray-text">{pageText.REGISTER_TEXT} <span className="text-link hover:text-primary"><Link to="/login">{pageText.REGISTER_HERE}</Link></span></p>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Contact;
