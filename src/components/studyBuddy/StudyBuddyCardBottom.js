import React, { useState } from 'react'
import dbText from "../../text/db.json"
import { JapanFlag, AmericanFlag } from '../../styles/Icons'
import truncateText from '../../helpers/truncateText'
import {
  Learn, Speak
} from '../../styles/Icons'

function StudyBuddyCardBottom({ data, lang }) {
  const bio = truncateText(data.study_buddy_bio, 100)
  const purpose = truncateText(data.study_buddy_purpose, 100)
  return (
    <div>
      <p className='mt-2 text-mobile-card-body'>{purpose}</p>
      <p className='text-mobile-card-body'>{bio}</p>
    </div >
  )
}

export default StudyBuddyCardBottom