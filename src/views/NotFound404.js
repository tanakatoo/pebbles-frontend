import React from 'react'
import usePageText from '../hooks/usePageText'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomLinkUnderline from '../components/button/CustomLinkUnderline'

function NotFound404() {
    const pageText = usePageText("home")
    const lang = useSelector(state => state.langFont.lang)
    return (
        <div className='flex bg-oopsMobile bg-cover bg-center bg-no-repeat relative h-[400px] mb-[300px]
        md:bg-oopsTablet md:h[500px] md:mb-0
        lg:bg-oopsDesktop lg:h-[800px] lg:mb-0' >
            <div className="text-primary-dark mx-4 text-center top-[400px] pt-4 text-mobile-header-1-homepage absolute
            md:w-[40%]  md:top-[50px] md:pt-16
            lg:top-[150px] lg:w-1/2 lg:pt-10
              ">
                <h1 className='pb-12'>{pageText.OOPS}</h1>
                <CustomLinkUnderline text={pageText.OOPS_GO_HOME} path='/' />
                {/* <Link to="/"><h2 className='underline'>{pageText.OOPS_GO_HOME}</h2></Link> */}
            </div>
        </div>
    )
}

export default NotFound404