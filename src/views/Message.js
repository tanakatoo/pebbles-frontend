import React, { useEffect, useRef, useState, forwardRef } from 'react'
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
import moment from 'moment-timezone'
import 'moment/locale/ja'
import ConversationTitle from '../components/message/ConversationTitle'
import { AwesomeSend } from '../styles/Icons'
import { useSelector } from 'react-redux'
import useFormData from '../hooks/useFormData'
import { Link } from 'react-router-dom'

function Message() {

    const INITIAL_DATA = {
        msg: ''
    }
    const [msg, setMsg, handleChange, resetMsg] = useFormData(INITIAL_DATA)
    const [doneGettingData, setDoneGettingData] = useState(false)
    const msgRef = useRef(null)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const [token = null] = useSetToken()
    const [pageText, lang] = usePageText("messages")
    const { username } = useParams()
    const user = useSelector(state => state.profile.profile.username)

    const getData = async () => {
        try {
            setErrors([])
            setDoneGettingData(false)
            //makes data all be read when getting data
            const res = await MessageApi.getConversation(username)
            console.log(res)
            setData(res)
            setDoneGettingData(true)
        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.error('Type error in getting data', e)
                setErrors(["UNKNOWN"])
            } else {
                console.log(e[0] == 'blocked')
                if (e[0] == 'blocked') {
                    console.log('in setting errors blocked')
                    setErrors(["BLOCKED"])
                } else {
                    console.error('Error getting data', e)
                    setErrors(e)
                }

            }
        }
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (msgRef.current) {
            msgRef.current.style.height = '0px';
            const scrollHeight = msgRef.current.scrollHeight;
            console.log('scrollheight is', scrollHeight)
            msgRef.current.style.height = `${scrollHeight}px`;
        }

    }, [msgRef.current, msg])

    let lastSent
    let conversationWithUsername
    let conversationWithAvatar
    if (data.length > 0) {
        conversationWithUsername = user === data[0].from ? data[0].to : data[0].from
        conversationWithAvatar = user === data[0].from ? data[0].toavatar : data[0].fromavatar
        lastSent = moment.utc(data[0].sent_at, 'YYYY-MM-DD HH:mm:ss').tz(Intl.DateTimeFormat().resolvedOptions().timeZone).locale(lang.toLowerCase()).format('LLL')

    }

    const handleSubmit = async () => {
        setErrors([])
        try {
            console.log('data to send', msg.msg)
            const res = await MessageApi.sendMsg(username, msg.msg)
            getData()

        } catch (e) {
            if (e instanceof TypeError) {
                //means server is down
                console.log('Type error in submit', e)
                setErrors(["UNKNOWN"])
            } else {
                console.log('Error in submit', e)
                setErrors(e)
            }
        } finally {
            resetMsg()

        }
    }


    return (
        // <Protected>
        <div className=' flex flex-col justify-center items-center'>
            {errors.length > 0 &&
                <div>
                    <ServerError msg={errors} />
                    {errors == "BLOCKED" ?
                        <p className='text-center mb-12'>
                            <Link className='underline' to="/users/unblock">
                                {pageText.UNBLOCK_CONTACTS}</Link></p> : ''}

                </div>}
            {data.length === 0 && errors.length === 0 && doneGettingData === false ?
                <div className='my-24'><Spinner /></div>
                : errors.length === 0 && data.length > 1 || doneGettingData === true ?
                    <>
                        <ConversationTitle link={`/users/${conversationWithUsername}`}
                            src={`../avatars/${conversationWithAvatar}`}
                            username={`${conversationWithUsername}`} />
                        <div className='w-full max-w-[500px] bg-background shadow-sm pb-12'>

                            <form className='w-full flex items-center px-2 my-2'>
                                <div className='flex flex-col w-full m'>
                                    <textarea ref={msgRef} id='msg' name='msg' value={msg.msg} onChange={handleChange} rows="1"
                                        className={`overflow-hidden mb-2 rounded-ml py-3 px-4 text-black placeholder-gray`} />
                                </div>
                                <div className='text-primary flex mx-2 cursor-pointer'><AwesomeSend size="xl" onClick={handleSubmit} /></div>

                            </form>

                            <div className='w-full grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12  
                                                lg:max-w-[900px] content-center '>
                                {/* <div className='col-span-full mb-4 mt-2'><SearchBar handleSearch={handleSearch} /></div> */}
                                <div className='col-span-full'>
                                    {data[0].fromavatar !== '' ?
                                        data.map((d, idx) => (
                                            <React.Fragment key={uuid()}>
                                                <Card data={d} latest={idx === 0 ? true : false} />
                                                {idx === 0 ? <>
                                                    <div className={`flex ${user === data[0].from ? 'justify-end' : 'justify-start'} mx-4 mb-3`}>
                                                        <p className='text-gray text-mobile-label-2'>{pageText.LAST_SENT} {lastSent}</p>
                                                    </div>
                                                </>
                                                    : ''
                                                }
                                            </React.Fragment>)


                                        )

                                        : ''}

                                </div>
                            </div>
                        </div>
                    </>
                    : ''
            }

        </div >
        // </Protected >
    )
}

export default Message