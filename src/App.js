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
  //get the font from the store
  const font = useSelector(state => state.langFont.font)
  const [message, setMessage] = useState(null)

  //we have to hardcode the string of the font because tailwind doesn't know what to use at build
  return (
    <FlashMessageContext.Provider value={setMessage}>
      <div className={`App ${font == 'font-poppins' ? 'font-poppins' : 'font-NotoSansJPRegular'}`}>
        {console.log('rendering app, message is', message)}
        <FlashMsg msg={message} />
        <NavBar />
        <MyRoutes />
        <Footer />
      </div >
    </FlashMessageContext.Provider>
  );
}

export default App;
