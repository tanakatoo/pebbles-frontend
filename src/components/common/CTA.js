import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button/Button'
import { useSelector } from 'react-redux'


function CTA({ msg, msgBtn, btnLink }) {
    const lang = useSelector(state => state.langFont.lang)

    return (
        <div className='flex w-full bg-primary text-white px-4 py-3 mb-8 justify-center items-center'>
            <p className='mr-8'>{msg}</p>
            <Link to={btnLink}>
                <Button btnText={msgBtn}
                    type="button"
                    bkColor="bg-white"
                    textColor='text-primary-dark'
                    py={'py-2'}
                    extraClasses={`text-mobile-card-header ${lang === "EN" ? 'font-PoppinsMedium' : 'NotoSansJPMedium'}`} />
            </Link>
        </div>
    )
}

export default CTA