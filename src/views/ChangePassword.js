import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../components/form/ServerError";
import { actionLogin } from "../reducers/actionCreator";
import Input from "../components/form/Input";
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import AuthApi from "../api/auth";
import passwordSchema from "../components/form/validation/changePassword"
import CTA from "../components/common/CTA";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch()
    const [pageText, lang] = usePageText("changePassword")
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [flash, setFlash] = useState(null)


    return (
        <>
            <CTA msg={pageText.CTA} msgBtn={pageText.CTA_BTN} btnLink={pageText.CTA_LINK} />
            <div className="mt-8 flex flex-col justify-center items-center px-2 md:px-8">
                <h1 className="text-center mb-[56px] text-mobile-header-2">{pageText.H1}</h1>

                {flash && <p className="bg-accent-very-light text-primary-dark text-center p-4 mb-4">{flash}</p>}
                {errors.length > 0 && <ServerError msg={errors} />}

                <Formik
                    initialValues={{ username: '' }}
                    validationSchema={passwordSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setErrors([])
                        setFlash(null)
                        try {
                            const res = await AuthApi.changePassword(values.username, lang)

                            setFlash(pageText.FLASH_MSG)
                        } catch (e) {
                            if (e instanceof TypeError) {
                                //means server is down
                                console.error("Typeerror at change password page", e)
                                setErrors(["UNKNOWN"])
                            } else {

                                setErrors(e)
                            }
                        } finally {
                            setSubmitting(false)
                        }
                    }
                    }
                >{(formik) => {
                    return (
                        <Form className="flex flex-col w-full max-w-[500px] mb-12">
                            <Input
                                label={pageText.USERNAME}
                                name="username"
                                type="text"
                                placeholder={pageText.PLACEHOLDER}
                            />

                            <Button
                                disabled={formik.isSubmitting}
                                btnText={pageText.SUBMIT}
                                type="submit"
                                lang={lang}
                                extraClasses="my-8 "

                            />
                        </Form>

                    )
                }
                    }

                </Formik>
            </div>
        </>
    )
}

export default ChangePassword