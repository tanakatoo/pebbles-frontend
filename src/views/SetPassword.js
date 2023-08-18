import React, { useEffect, useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch } from "react-redux";
import AuthApi from "../api/auth";
import ServerError from "../components/form/ServerError";
import { Formik, Form } from "formik"
import setPasswordSchema from "../components/form/validation/setPassword";
import Input from "../components/form/Input";
import { Button } from "../components/button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import CTA from "../components/common/CTA";
import { Link } from "react-router-dom";
import { actionLogin } from "../reducers/actionCreator";

const SetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [pageText, lang] = usePageText("password")
    const navigate = useNavigate()
    const [flash, setFlash] = useState(false)

    const INITIAL_DATA = {
        password: '',
        password_check: ''
    }

    //verify password and get user id from it
    useEffect(() => {
        window.scrollTo(0, 0);
        //verify token first

        if (searchParams.size === 0) {

            setErrors(["INVALID_LINK"])
        }
    }, [])

    return (
        <>

            <CTA msg={pageText.CTA} msgBtn={pageText.CTA_BTN} btnLink={pageText.CTA_LINK} />
            <div className="mt-8 flex flex-col justify-center items-center px-2 md:px-8">
                {flash &&
                    <div className="bg-accent-very-light mb-4 text-primary-dark text-center p-4">
                        <p data-testid='wait-for-pagetext' className="">
                            {pageText.FLASH_MSG}
                        </p>
                        <p className=""><Link className="hover:underline hover:text-primary hover:underline-offset-4" to={pageText.FLASH_MSG_LINK}>{pageText.FLASH_MSG_LINK_TEXT}</Link>
                        </p>
                    </div>}
                {errors.length > 0 && <ServerError msg={errors} title={pageText.ERROR_TITLE} />}
                <h1 className="text-center mb-4 text-mobile-header-2">{pageText.H1}</h1>
                <p className="text-center mb-[56px]">{pageText.CHANGE_PASSWORD}
                    <Link to="/change-password"
                        className="hover:text-gray-text hover:underline hover:underline-offset-4 ms-1">
                        {pageText.CHANGE_PASSWORD2}</Link>
                </p>



                <Formik
                    initialValues={INITIAL_DATA}
                    validationSchema={setPasswordSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {

                        setSubmitting(false)
                        try {
                            setErrors([])

                            const res = await AuthApi.setPassword(values.password, lang, token)
                            //call dispatch to set token in profileReducer

                            dispatch(actionLogin(res))
                            setFlash(true)
                            resetForm({
                                values: {
                                    ...INITIAL_DATA
                                }
                            })

                            // navigate('/system-message', { state: { type: "CHANGED_PASSWORD" } })
                        } catch (e) {

                            if (e[0] === ("jwt expired")) {

                                setErrors(["JWT_EXPIRED"])
                            } else {
                                setErrors(["UNKNOWN"])
                            }


                        }
                    }}
                >{formik => {
                    return (
                        <Form className="flex flex-col w-full max-w-[500px] mb-12">

                            <Input
                                label={pageText.PASSWORD}
                                name="password"
                                type="password"
                                placeholder=""
                            />
                            <Input
                                label={pageText.PASSWORD_CHECK}
                                name="password_check"
                                type="password"
                                placeholder=""
                            />

                            <Button btnText={pageText.SUBMIT}
                                type="submit"
                                extraClasses="mt-12 mb-4"
                                lang={lang}
                                disabled={flash ? true : false}
                                isSubmitting={formik.isSubmitting}
                                testid='resetPassword'
                            />
                        </Form>
                    )
                }}

                </Formik>
            </div>
        </>
    );
};

export default SetPassword;
