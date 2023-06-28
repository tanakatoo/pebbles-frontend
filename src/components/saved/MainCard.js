import React from 'react'
import { Link } from 'react-router-dom'

function MainCard({ text, img, link }) {
    return (
        <Link to={link}>
            <div className={`drop-shadow-md shrink-0 relative w-[200px] h-[200px] rounded-ml ${img} bg-cover flex flex-col items-center justify-center`}>
                <div className="bg-white/50 absolute rounded-ml w-full h-full"></div>
                <span className={`drop-shadow-xl text-center z-10 text-primary-dark text-mobile-header-2-homepage font-bold bg-white/75 px-2 rounded-sm w-full py-2`} >{text}</span>

            </div >
        </Link>
    )
}

export default MainCard