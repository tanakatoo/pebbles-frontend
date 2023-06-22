import React, { useEffect, useState } from 'react'
import Protected from '../components/common/Protected'
import Card from '../components/message/Card'
import usePageText from '../hooks/usePageText'
import useSetToken from '../hooks/useSetToken'
import { v4 as uuid } from "uuid"
import MessageApi from '../api/message'
import { useParams } from 'react-router-dom'
import ServerError from '../components/form/ServerError'
import Spinner
    from '../components/common/Spinner'
import jaLocale from "moment/locale/ja";
import moment from 'moment-timezone'
import momentM from "moment"
import ConversationTitle from '../components/message/ConversationTitle'
import Input from '../components/form/Input'
import { Formik, Form } from 'formik'
import { AwesomeSend } from '../styles/Icons'
import { useSelector } from 'react-redux'


function Message() {
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const pageText = usePageText("messages")
    const lang = useSelector(state => state.langFont.lang)
    const { username } = useParams()
    const user = useSelector(state => state.profile.profile.username)

    moment.locale(lang.toLowerCase())

    const getData = async () => {
        try {
            //makes data all be read when getting data
            const res = await MessageApi.getConversation(username)
            console.log(res)
            setData(res)
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

    let lastSent
    let conversationWithUsername
    let conversationWithAvatar
    if (data.length > 0) {
        conversationWithUsername = user === data[0].from ? data[0].to : data[0].from
        conversationWithAvatar = user === data[0].from ? data[0].toavatar : data[0].fromavatar
        lastSent = moment.utc(data[0].sent_at, 'YYYY-MM-DD HH:mm:ss').tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('LLL')

    }
    const INITIAL_DATA = {
        msg: ''
    }

    return (
        <Protected>
            <div className=' flex flex-col justify-center items-center'>

                {errors.length > 0 && <ServerError msg={errors} />}
                {data.length === 0 && errors.length === 0 ?
                    <Spinner />
                    : errors.length === 0 ?
                        <>
                            <ConversationTitle link={`/users/${conversationWithUsername}`}
                                src={`../avatars/${conversationWithAvatar}`}
                                username={`${conversationWithUsername}`} />
                            <div className='bg-background shadow-sm pb-12'>
                                <Formik
                                    initialValues={INITIAL_DATA}
                                    onSubmit={async (values, onSubmitProps) => {
                                        setErrors([])
                                        try {
                                            const res = await MessageApi.sendMsg(username, values.msg)
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
                                        <Form className='w-full'>
                                            <div className='flex items-center'>
                                                <Input label="" name="msg" type="text" placeholder="Type message here..." extraClasses="border-none mx-2" />
                                                <div className='text-primary flex me-2 cursor-pointer'><AwesomeSend size="xl" onClick={formik.submitForm} /></div>
                                            </div>
                                        </Form>
                                    )
                                }
                                    }
                                </Formik>
                                <div className='w-full grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12  
                                                lg:max-w-[900px] content-center '>
                                    {/* <div className='col-span-full mb-4 mt-2'><SearchBar handleSearch={handleSearch} /></div> */}
                                    <div className='col-span-full'>
                                        {data.map((d, idx) => (
                                            <>
                                                <Card data={d} key={uuid()} latest={idx === 0 ? true : false} />
                                                {console.log('from', data[0].from, 'username is', user)}
                                                {idx === 0 ? <>
                                                    {console.log(user === data[0].from)}
                                                    <div className={`flex ${user === data[0].from ? 'justify-end' : 'justify-start'} mx-4`}>
                                                        <p className='text-gray text-mobile-label-2'>{pageText.LAST_SENT} {lastSent}</p>
                                                    </div>
                                                </>
                                                    : ''
                                                }
                                            </>)


                                        )}

                                    </div>
                                </div>
                            </div>
                        </>
                        : ''
                }

            </div >
        </Protected >
    )
}

export default Message