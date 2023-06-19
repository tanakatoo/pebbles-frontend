import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../components/form/ServerError";
import { actionLogin } from "../reducers/actionCreator";
import { TextInput } from "../components/form/Fields not used";
import { Formik, Form } from "formik"
import { Button } from "../components/button/Button";
import AuthApi from "../api/auth";
import passwordSchema from "../components/form/validation/changePassword"

const ChangePassword = () => {
    const dispatch = useDispatch()
    const pageText = usePageText("password")
    const [errors, setErrors] = useState([])
    const lang = useSelector(state => state.langFont.lang)

    return (
        <>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <Formik
                initialValues={{ username: '' }}
                validationSchema={passwordSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false)
                    try {
                        const res = await AuthApi.changePassword(values.username, lang)
                        console.log('should be completed', res)

                    } catch (e) {
                        console.log(e)
                        setErrors(e)
                    }
                }}
            >
                <Form>
                    <TextInput
                        label={pageText.USERNAME}
                        name="username"
                        type="text"
                        placeholder={pageText.USERNAME}
                    />

                    <Button btnText={pageText.SUBMIT} type="submit" />
                </Form>

            </Formik>

        </>
    )
}

export default ChangePassword