import React, { useState, useContext, useEffect } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../components/form/ServerError";
import loginSchema from "../components/form/validation/loginSchema";
import { actionLogin } from "../reducers/actionCreator";
// import { TextInput } from "../components/form/Fields";
import Input from "../components/form/Input";
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import AuthApi from "../api/auth";
import { useNavigate } from "react-router-dom";
import PebblesApi from "../api/base";
import { actionSetMsg } from "../reducers/actionCreator";
// import FlashMessageContext from "../contexts/FlashMessageContext";
import CTA from "../components/common/CTA";
import { Link } from "react-router-dom";

const Login = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [pageText, lang] = usePageText("login")
    // const setFlashMessage = useContext(FlashMessageContext)
    const token = useSelector(state => state.profile.token)

    const INITIAL_DATA = {
        username: '',
        password: ''
    }

    useEffect(() => {
        if (token) {
            //should go to their dashboard
            navigate('/users/dashboard')
        }
    }, [token])

    return (
        <>
            <CTA msg={pageText.CTA} msgBtn={pageText.CTA_BTN} btnLink={pageText.CTA_LINK} />
            <div className="mt-8 flex flex-col justify-center items-center mx-8">
                {Object.keys(errors).length > 0 && <ServerError msg={errors} title={pageText.ERROR_TITLE} />}
                {errors.length === 0 && <h1 className="text-center mb-[56px] text-mobile-header-2">{pageText.H1}</h1>}
                <Formik
                    initialValues={INITIAL_DATA}
                    validationSchema={loginSchema}
                    onSubmit={async (values, { setSubmitting }) => {

                        setErrors([])
                        try {
                            const res = await AuthApi.login(values.username, values.password)
                            //call dispatch to set token in profileReducer
                            dispatch(actionLogin(res)) //save token and then profile
                            // setFlashMessage('LOGIN')

                            // navigate('/users/dashboard')
                        } catch (e) {
                            if (e instanceof TypeError) {
                                //means server is down
                                console.error('TypeError at login', e)
                                setErrors(["UNKNOWN"])
                            } else {
                                console.error('Error at login', e)
                                setErrors(e)
                            }
                        } finally {
                            setSubmitting(false)
                        }
                    }}

                >{formik => {
                    return (
                        <Form className="flex flex-col w-full max-w-[500px]">
                            <Input
                                label={pageText.USERNAME}
                                name="username"
                                type="text"
                            />
                            <Input
                                label={pageText.PASSWORD}
                                name="password"
                                type="password"
                                placeholder=""
                            />
                            <Button btnText={pageText.SUBMIT}
                                type="submit"
                                testid='loginFormLogin'
                                extraClasses="mt-12"
                                lang={lang}
                                isSubmitting={formik.isSubmitting} />
                            <p className="mt-2 text-center text-gray-text">
                                {pageText.FORGOT_PASSWORD}
                                <span className="text-link hover:text-primary">
                                    <Link to="/change-password"> {pageText.CLICK_HERE}
                                    </Link>
                                </span>
                            </p>
                            <Button bkColor="bg-white"
                                textColor="text-primary"
                                btnText={pageText.CREATE_ACCT}
                                type="button"
                                lang={lang}
                                extraClasses="mt-8 border mb-[76px]"
                                isSubmitting={formik.isSubmitting}
                                link="/register" />
                        </Form>
                    )
                }}
                </Formik>

            </div>
        </>
    );

};

export default Login;
