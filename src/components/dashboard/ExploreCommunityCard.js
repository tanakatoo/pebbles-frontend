import React from 'react'
import Avatar from '../common/Avatar'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../button/CustomLink'
import dbText from '../../text/db.json'
import studyBuddyText from '../../text/studyBuddy.json'
import { JapanFlag, AmericanFlag } from '../../styles/Icons'

function ExploreCommunityCard({ data, lang }) {
    return (


        <div className='p-2 w-[268px] h-[109px] grid grid-cols-3 gap-2  bg-white text-mobile-label-2 rounded-ml'>
            <div className='inline-flex items-center'>

                <Avatar link={true}
                    username={data.username}
                    size='user'
                    src={`../avatars/${data.avatar}`}
                />
            </div>
            <div className='col-span-2 flex flex-col gap-1'>
                <span className='font-medium mb-1'><CustomLink text={data.username} path={`/users/${data.username}`} /></span>
                <span className='truncate '>{data.study_buddy_types.map((s, idx) =>
                    idx === data.study_buddy_types.length - 1 ?
                        dbText.study_buddy_types[s][lang]
                        : dbText.study_buddy_types[s][lang] + ', '
                )}</span>
                <div className='flex items-center '> <span className='me-1'>{studyBuddyText[lang].SPEAKS}</span>
                    {data.native_language === "Japanese" ? <JapanFlag /> : <AmericanFlag />}
                    <span className='mx-1'>{studyBuddyText[lang].LEARNS} </span>
                    {data.learning_language === "Japanese" ? <JapanFlag /> : <AmericanFlag />}
                </div>
                <p className='truncate '>{dbText.timezones[data.time_zone][lang]}</p>
            </div>
        </div>

    )
}

export default ExploreCommunityCard