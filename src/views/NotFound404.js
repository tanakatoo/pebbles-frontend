import React from 'react'
import usePageText from '../hooks/usePageText'
import { Link } from 'react-router-dom'


function NotFound404() {
    window.scrollTo(0, 0);
    const [pageText, lang] = usePageText("home")
    return (
        <div className='flex bg-oopsMobile bg-cover bg-center bg-no-repeat relative h-[400px] mb-[300px]
        md:bg-oopsTablet md:h[500px] md:mb-0
        lg:bg-oopsDesktop lg:h-[800px] lg:mb-0' >
            <div className="text-primary-dark mx-4 text-center top-[400px] pt-4 text-mobile-header-1 absolute
            md:w-[40%]  md:top-[50px] md:pt-16
            lg:top-[150px] lg:w-1/2 lg:pt-10
              ">
                <h1 className='pb-12'>{pageText.OOPS}</h1>
                <Link to="/" className='hover:underline hover:underline-offset-4 hover:text-primary'>{pageText.OOPS_GO_HOME}</Link>
                {/* <Link to="/"><h2 className='underline'>{pageText.OOPS_GO_HOME}</h2></Link> */}
            </div>
        </div>
    )
}

export default NotFound404