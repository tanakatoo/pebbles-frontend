import React from 'react'
import dbText from "../../text/db.json"
import { JapanFlag, AmericanFlag } from '../../styles/Icons'



function StudyBuddyCardUnderUsername({ data, lang, pageText }) {

  return (
    <div className='flex flex-col gap-1 mt-1'>
      <p className={`text-mobile-label-1 mt-1`}>
        {data.study_buddy_types.map((s, idx) =>
          idx === data.study_buddy_types.length - 1 ?
            dbText.study_buddy_types[s][lang]
            : dbText.study_buddy_types[s][lang] + ', '
        )}
      </p>
      <div className='text-mobile-label-1 flex items-center gap-0 mt-1'>
        <div className='flex items-center me-4'>
          <span className='me-1'>{pageText.SPEAKS}</span>
          {data.native_language === "Japanese" ? <JapanFlag /> : <AmericanFlag />}
        </div>
        <div className='flex items-center'>
          <span className='me-1'>{pageText.LEARNS} </span>
          {data.learning_language === "Japanese" ? <JapanFlag /> : <AmericanFlag />}
        </div>
      </div>

    </div>
  )
}

export default StudyBuddyCardUnderUsername