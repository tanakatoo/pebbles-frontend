import React from "react"
import usePageText from "../hooks/usePageText"
import SearchBar from "../components/common/SearchBar"
import { Connect, Language, Travel } from "../styles/Icons"
import Mission from "../components/home/Mission"
import Supports from "../components/home/Supports"

const Home = () => {
    const pageText = usePageText("home")

    return (
        <div>
            <div className="bg-primary-dark py-6 px-4">
                <SearchBar />
            </div>
            <div className='bg-primary-super-light bg-homeHero bg-cover bg-center bg-no-repeat relative min-h-screen' >
                <div className="bg-gradient-to-b absolute from-primary-super-light from-0% via-transparent via-1% to-transparent to-100% w-full h-screen"></div>
                <h1 className="text-primary-dark mx-4 text-center pt-10 text-mobile-header-1-homepage absolute">{pageText.H1}</h1>
            </div>
            <section className="pt-12 container ">
                <h2 className="text-center text-mobile-header-2-homepage text-primary-dark">{pageText.H2}</h2>
                <div className="mt-8 flex flex-col gap-8">
                    <div className="mb-5 flex flex-col">
                        <Mission icon={<Connect />} text={pageText.MISSION1} />
                    </div>
                    <div className="mb-5  flex flex-col">
                        <Mission icon={<Travel />} text={pageText.MISSION2} />
                    </div>
                    <div className="mb-5  flex flex-col">
                        <Mission icon={<Language />} text={pageText.MISSION3} />
                    </div>
                </div>
            </section >
            <section className="pt-[84px]">
                <div className=" relative bg-homeHelp h-[216px] bg-cover bg-center">
                    <div className="bg-gradient-to-b absolute w-full h-[216px] z-10 from-white from-0% via-transparent via-90% to-transparent"></div>
                    <div className="top-[180px] mx-[50px] text-center py-6 px-8 absolute bg-secondary text-white rounded-ml"><p>{pageText.HERO2}</p></div>
                </div>
            </section>
            <section className="pt-[120px] container">
                <h2 className="text-mobile-header-2-homepage text-center text-primary-dark">{pageText.HOW_TO_HELP}</h2>
                <div className="mt-8">
                    <Supports />
                </div>
            </section>




        </div >
    )

}

export default Home