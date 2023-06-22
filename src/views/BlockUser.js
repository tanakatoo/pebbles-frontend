import React, { useEffect, useState } from 'react'
import UserApi from '../api/user'
import ServerError from '../components/form/ServerError'
import Spinner from '../components/common/Spinner'
import { v4 as uuid } from "uuid"
import useSetToken from '../hooks/useSetToken'
import SearchBar from '../components/common/SearchBar'
import usePageText from "../hooks/usePageText"
import Protected from '../components/common/Protected'
import { useSelector } from 'react-redux'
import AvatarWithName from '../components/common/AvatarWithName'
import StickyBar from '../components/common/StickyBar'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import NoData from '../components/common/NoData'
import TextError from '../components/form/errorComponents/TextError'
import blockUnblockSchema from '../components/form/validation/blockUnblock'
import { Exclamation } from '../styles/Icons'

function BlockUser() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [doneGettingData, setDoneGettingData] = useState(false)
    const pageText = usePageText("messages")


    const getData = async () => {
        try {
            setDoneGettingData(false)
            const res = await UserApi.getContacts()
            console.log('list of contacts', res)
            setData(res)
            setDoneGettingData(true)
        } catch (e) {
            if (e instanceof TypeError) {

                //means server is down
                setErrors(["UNKNOWN"])
            } else {

                setErrors(e)
            }
        }
    }

    useEffect(() => {

        getData()
    }, [])

    const handleSearch = () => {
        //to be implemented later
        console.log('call to search for contact')
    }

    const handleCancel = () => {
        navigate('/messages')
    }

    const INITIAL_DATA = { username: '' }
    let options = []
    if (data.length > 0) {
        data.map(d => options.push({ key: d.username, value: d.username }))
    }


    return (
        <Protected>
            <div className='mb-12 flex justify-center'>

                {errors.length > 0 && <ServerError msg={errors} />}
                {data.length === 0 && errors.length === 0 && doneGettingData === false ?
                    <Spinner />
                    : doneGettingData === true && data.length === 0 ?
                        <NoData msg='No contacts available to block' link='/messages' linkText='Back to contact list' />
                        :
                        errors.length === 0 ?
                            <div className='w-full grid grid-cols-4 gap-x-4 pb-6 md:grid-cols-8 lg:grid-cols-12  
                        lg:max-w-[900px] content-center shadow-md '>
                                {/* <div className='col-span-full mb-4 mt-2'><SearchBar handleSearch={handleSearch} /></div> */}
                                <Formik
                                    initialValues={INITIAL_DATA}
                                    validationSchema={blockUnblockSchema}
                                    onSubmit={async (values, onSubmitProps) => {
                                        setErrors([])
                                        try {

                                            const res = await UserApi.blockUser(values.username)
                                            getData()
                                        } catch (e) {
                                            if (e instanceof TypeError) {
                                                //means server is down
                                                setErrors(["UNKNOWN"])
                                            } else {
                                                setErrors(e)
                                            }
                                        } finally {
                                            onSubmitProps.setSubmitting(false)
                                            onSubmitProps.resetForm()
                                        }
                                    }}
                                >{formik => {
                                    return (
                                        <>
                                            <div className='col-span-full w-full m-4 flex gap-4'>
                                                <ErrorMessage name='username' component={TextError} exclamation={true} />
                                            </div>
                                            <div className='col-span-full sticky top-0 mb-4'>
                                                <StickyBar action="Block" onClickX={handleCancel} onClick={formik.submitForm} />
                                            </div>

                                            <div className='col-span-full '>
                                                <Form className='w-full justify-end'>
                                                    {data.map(d => {
                                                        return (
                                                            <React.Fragment key={uuid()} >
                                                                <div className='mx-4 py-3 flex items-center'>
                                                                    <div className='grow'>
                                                                        <AvatarWithName src={`../avatars/${d.avatar}`} username={d.username} />
                                                                    </div>

                                                                    <Field name='username' type="radio" value={d.username}>{
                                                                        ({ field }) => < input type="radio" {...field} />
                                                                    }
                                                                    </Field>

                                                                </div >
                                                            </React.Fragment>
                                                        )
                                                    })}

                                                </Form>
                                            </div >


                                        </>
                                    )
                                }
                                    }
                                </Formik >
                            </div >
                            : ''
                }

            </div >
        </Protected >
    )
}

export default BlockUser