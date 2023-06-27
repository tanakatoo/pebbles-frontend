import React, { useEffect, useRef, useState } from 'react'
import UserApi from '../api/user'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveProfile } from '../reducers/actionCreator'
import { Link } from 'react-router-dom'
import useSetToken from '../hooks/useSetToken'
import dbText from "../text/db.json"
import usePageText from "../hooks/usePageText";
import { actionLogin } from "../reducers/actionCreator";
import { TextInput } from "../components/form/Fields";
import { useFormik, Field, orm, Formik, ErrorMessage, FieldArray } from "formik"
import { Button } from "../components/button/Button";
import { RadioButtons } from '../components/form/Fields'
import profileSchema from "../components/form/validation/profileSchema"
import AuthApi from '../api/auth'
import Autocomplete from '../components/form/Autocomplete'
import * as Yup from "yup"
import FormError from '../components/form/FormError'

const ProfileOwnEdit = () => {
    const [pageText] = usePageText("profile")
    const lang = useSelector(state => state.langFont.lang)
    const [errors, setErrors] = useState([])
    const profile = useSelector(state => state.profile.profile)

    const handleSelect = (selected) => {
        console.log('back in edit handling the selection', selected)
        //object with description (name) and place Id 
        //when user submits, we use this to save to DB
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            location: '',
            comments: "",
            social: {
                facebook: '',
                twitter: ''
            },
            phoneNumbers: ['', ''],
            pHNumbers: ['']
        },
        validationSchema,
        onSubmit: values => {
            console.log(formik.values)
        }
    })
    //formik also provides us with an error object, with keys like the "name"
    console.log(formik.errors)
    //formik keeps track of the handleBlur in formik.touched and keys are ike "name"
    console.log(formik.touched)
    //to check if field has been visited, use the onBlur

    //getFieldProps give us onBlur, onChange, values
    //use react context to help us
    //Formik, Form, Field, ErrorMessage
    //Form already has the onsubmit prop
    //<Formik><Form>
    //<Field> we have o specify the getFieldProps, so we can get rid of it
    //Field renders input component automatically, hook up inputs to formik, use name input to hook up into initial values
    //<ErrorMessage> we use formik.touched.name && formik.errors.name so it removes this
    //error message component is just text when it is rendered. we want more control over the styling, so we can put it in component
    //we can even make a react component like this
    //<ErrorMessage name='username' component={FormError} />
    //OR we can render children of ErrorMessage, look at the code below

    //pass in name prop that is the same as the initial values
    //takes care of eror message behind the scenes

    //Field component - by default it renders an html element, it hook up handlechange, handleblue and value of form
    //pass through any additioanl props that we specify
    //to render as another type of input, we just put <Field as="textarea" ...>
    //renderProps gives us field, form (all about forms), meta (error) this is so we can hook up more complex custom fields

    //nested objects - make an object in initial values
    //dynamic form contorl - if they want to add more fields

    //fastfield -if it has more than 30 fields or fields with compicated validate
    //a change in our input, the whole form changes and rerenders
    //instead of Field, use FastField
    //blocks all other rerenders unless it is changed itself
    //use it with caution - be careful if using this

    //when does validation run?
    //1. when change event occurred, so it runs after every change event in the form
    //2. after any blur event from the form
    //3. when submit button is clicked

    //sometimes don't wnat to run validation
    //in Formik, use validateOnChange = {false}
    //validateOnBlue={false}, click outside, will not validate

    //we can do validation on the field level is like custom validatino
    //we make a validation function, put the validaton inside return errors object

    //const validationComments = value=>{
    // let error
    // if (!value) {
    //     error = "Required"
    //     return error
    // })
    //in the <Field ... validate={validationComments} />

    //trigger validation manually
    //need to use render prop on the entire form
    //function as children on the Formik component
    //<Formik...>
    //{formik=>{
    // return(<Form></Form>)
    // }}

    //this formik has a lot of functions, same as "form" from render props
    //use top level form when you want form wide functions
    //formik.validateField('comments')
    //formik.validateForm()
    // formik.setTouched({email:true,username:true})
    //     formik.setFieldTouched()

    //how to disable submit button
    //1. form is not correct so valid
    //in the Formik props, there is an isValid property
    //so on the submit button, put disabled={!formik.isValid} means error object is not empty but in the beginning, no errors
    //on the formik component, <Formik validateOnMount> then it will validate and error object will have errors (but touched is false so errors won't display)
    //but this is good for small forms, otherwise lots of errors so add this
    //another property dirty:false means at least 1 value has changed since initialized
    //so on the button component, disabled={!formik.dirty&&!formik.isValid}
    //BUT if form is already correct it won't let you submit
    //this is good option anyway

    //2.disable when it is submitting
    //Formik props, isSubmitting:false, if isSubmitting is true on the button onclick then disable
    //onSubmit has 2 parameters, onSubmitProps - onSubmitProps.setSubmitting(false)
    //we have to do this manually because formik doesn't know when api will respond

    //load saved data


    return (
        <div>
            <h1>{pageText.H1}</h1>
            {Object.keys(errors).length > 0 && <ServerError msg={errors} />}
            <form onSubmit={formik.handleSubmit}>

                <input type="text" name="username" {...formik.getFieldProps('username')}></input>
                {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
                <ErrorMessage name='username'>
                    {
                        (msg) => <div className='error'>{msg}</div>
                    }
                </ErrorMessage>
                {/* <Autocomplete name="location" onSelect={handleSelect} /> */}
                {/* this is used for custom compoents and you want to hook it up to the form */}
                <Field id="address" name="address" >
                    {
                        (props) => {
                            const { field, form, meta } = props
                            return (<div>
                                {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                <input id='address' {...field} />
                            </div>)
                        }
                    }
                </Field>
                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook profile</label>
                    <Field name='social.facebook' type="text" id="facebook" />
                </div>
                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter profile</label>
                    <Field name='social.twitter' type="text" id="twitter" />
                </div>
                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary Phone number</label>
                    <Field name='phoneNumbers[0]' type="text" id="primaryph" />
                </div>
                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary Phone number</label>
                    <Field name='phoneNumbers[1]' type="text" id="secondaryPh" />
                </div>
                <div className='form-control'>
                    <label>Listo f phones</label>
                    <FieldArray name='pHNumbers'>
                        {/* need to use the render props,  it just means it's a function that gets the props and it returns jsx*/}
                        {
                            // this props gives us push, pop, remove, swap, form (form.values.pHNumbers ),- we usually use push, remove 
                            (fieldArrayProps) => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { pHNumbers } = values

                                return <>{
                                    pHNumbers.map((ph, idx) => (
                                        <div key={idx}>
                                            <Field name={`pHNumbers[${idx}]`} />
                                            {
                                                idx > 0 ? <button type="button" onClick={() => remove(idx)}> - </button> : null
                                            }

                                            <button type="button" onClick={() => push('')}> + </button>
                                        </div>
                                    ))
                                }</>
                            }
                        }

                    </FieldArray>
                </div>
                <Button btnText={pageText.SUBMIT} type="submit" />
            </form>


            <div>
                {!!profile && <div>
                    {errors.length > 0 && <ServerError msg={errors} />}
                    {profile.gender && < p > Gender is: {dbText.genders[profile.gender][lang]}</p >}

                    {profile ? Object.keys(profile).map(m => <p key={m}>{profile[m]}</p>) : ''}
                    <p>< Link to='/users/hello' > hello profile</Link ></p>
                    <Link to='/'>Get an address from api</Link>
                </div>
                }
            </div >
        </div >
    )
}

export default ProfileOwnEdit