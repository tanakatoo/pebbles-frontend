import React from "react"
import usePageText from "../hooks/usePageText"
import SearchBar from "../components/common/SearchBar"
import { Connect, Language, Travel } from "../styles/Icons"
import Mission from "../components/home/Mission"
import Supports from "../components/home/Supports"
import studybuddysquare from "../images/studyBuddy-square.jpg"
import communitysquare from "../images/community-square.jpg"
import regionalsquare from "../images/regional-square.jpg"
import marketplacesquare from "../images/marketplace-square.jpg"
import studysupportsquare from "../images/studysupport-square.jpg"
import { useSelector } from "react-redux"
import { Button } from "../components/button/Button"

const Home = () => {
    const pageText = usePageText("home")
    const lang = useSelector(state => state.langFont.lang)

    return (
        <div>
            <div className="bg-primary-dark py-6 px-4">
                <SearchBar />
            </div>
            <div className='flex justify-center bg-primary-super-light bg-homeHero md:bg-homeHeroTablet lg:bg-homeHeroDesktop bg-cover bg-center bg-no-repeat relative min-h-screen' >
                <div className="bg-gradient-to-b absolute from-primary-super-light from-0% via-transparent via-1% to-transparent to-100% w-full h-screen"></div>
                <h1 className="text-primary-dark mx-4 text-center pt-10 md:pt-16 text-mobile-header-1-homepage absolute">{pageText.H1}</h1>
            </div>
            <section className="pt-12 md:pt-24  mx-auto">
                <h2 className="text-center text-mobile-header-2-homepage text-primary-dark">{pageText.H2}</h2>
                <div className="mt-8 md:mt-12 lg:ps-8 lg:pe-8 flex flex-col justify-center items-center gap-8 lg:flex-row lg:w-full lg:space-around">
                    <div className="mb-5 flex flex-col lg:w-full">
                        <Mission icon={<Connect />} text={pageText.MISSION1} />
                    </div>
                    <div className="mb-5  flex flex-col lg:w-full">
                        <Mission icon={<Travel />} text={pageText.MISSION2} />
                    </div>
                    <div className="mb-5  flex flex-col lg:w-full">
                        <Mission icon={<Language />} text={pageText.MISSION3} />
                    </div>
                </div>
            </section >
            <section className="pt-[84px]">
                <div className=" flex relative bg-homeHelp md:bg-homeHelpTablet lg:bg-homeHelpDesktop h-[216px] md:h-[300px] lg:h-[350px] bg-cover bg-center">
                    <div className="bg-gradient-to-b from-white absolute w-full h-[216px] z-10 "></div>
                    <div className="w-[80%] md:w-[60%] lg:w-[50%] top-[180px] md:top-[280px] lg:top-[330px] left-1/2  -translate-x-1/2 text-center py-6 px-8 absolute bg-secondary text-white rounded-ml"><p>{pageText.HERO2}</p></div>
                </div>
            </section>
            <section className="pt-[120px]">
                <h2 className="text-mobile-header-2-homepage text-center text-primary-dark">{pageText.HOW_TO_HELP}</h2>
                <div className="mt-16">
                    {lang === "JA" ?
                        <Supports
                            font={`NotoSansJPMedium`}
                            bgColor='bg-background'
                            img={studysupportsquare}
                            title={pageText.HELP5_TITLE}
                            desc={pageText.HELP5_DESC} />
                        : ''
                    }
                    <Supports
                        font={`${lang === "EN" ? 'font-StudyBuddyEN' : 'font-StudyBuddyJA'}`}
                        bgColor='bg-study-buddy-accent'
                        img={studybuddysquare}
                        title={pageText.HELP3_TITLE}
                        desc={pageText.HELP3_DESC} />
                    <Supports
                        font={`font-Community`}
                        img={communitysquare}
                        title={pageText.HELP1_TITLE}
                        desc={pageText.HELP1_DESC}
                        bgColor={'bg-community-accent'}
                        titleColor="text-white"
                        descColor='text-white'
                        button=
                        {<Button btnText="Tell me more" textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                    <Supports
                        font={`font-Regional`}
                        img={regionalsquare}
                        title={pageText.HELP2_TITLE}
                        desc={pageText.HELP2_DESC}
                        bgColor={'bg-regional-accent'}
                        titleColor="text-white"
                        descColor='text-white'
                        button=
                        {<Button btnText="Tell me more" textColor="text-primary-dark" py="py-2" bkColor="bg-white" type="button" />} />
                    <Supports
                        font={`${lang === "EN" ? 'font-EnglishMarketEN' : 'font-EnglishMarketJA'}`}
                        bgColor='bg-marketplace-accent'
                        img={marketplacesquare}
                        title={pageText.HELP4_TITLE}
                        desc={pageText.HELP4_DESC} />


                </div>
            </section>
            <section className="py-12">
                <p className="py-8 px-4 text-mobile-page-header text-center text-primary-dark">{pageText.HERO3_TOP}</p>
                {/* <div className="flex relative bg-homeStartMobile md:bg-homeStartTablet lg:bg-homeStartDesktop h-[216px] md:h-[300px] lg:h-[350px] bg-cover bg-center">
                    <div className="bg-gradient-to-b absolute w-full h-[216px] z-10 from-white"></div>
                </div> */}
                <p className="px-4 text-mobile-page-header text-center text-primary-dark">{pageText.HERO3_BOTTOM}</p>
                <div className="flex justify-center">
                    <Button btnText="More about us" extraClasses="mt-12 w-[200px]"></Button>
                </div>
            </section>
        </div >
    )

}

export default Home