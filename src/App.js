import React, { useState } from "react"
import './styles/app.css';
import NavBar from "./components/common/NavBar"
import "./styles/app.css"
import { useSelector } from 'react-redux';
import MyRoutes from "./MyRoutes"
import FlashMsg from "./components/common/FlashMsg";
import FlashMessageContext from "./contexts/FlashMessageContext"
import Footer from "./components/common/Footer";

function App() {
  //get lang and set font
  const lang = useSelector(state => state.langFont.lang)
  const [message, setMessage] = useState(null)
  const [typeOfMsg, setTypeOfMsg] = useState(null)

  //we have to hardcode the string of the font because tailwind doesn't know what to use at build
  return (
    <FlashMessageContext.Provider value={[setMessage, setTypeOfMsg]}>
      <div className={`App ${lang === "EN" ? 'font-poppins' : 'font-NotoSansJPRegular'}`}>
        <FlashMsg msg={message} incomingType={typeOfMsg} />
        <NavBar />
        <MyRoutes />
        <Footer />
      </div>

    </FlashMessageContext.Provider >
  );
}

export default App;
