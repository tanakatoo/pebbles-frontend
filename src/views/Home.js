import React from "react"

import usePageText from "../hooks/usePageText"

const Home = () => {
    const pageText = usePageText("home")

    return (
        <div>
            <h1 className="">{pageText.H1}</h1>
            <p >{pageText.BODY} </p>
            <p >テストどうですか？ </p>
        </div>
    )

}

export default Home