import './styles/app.css';
import NavBar from "./components/common/NavBar"
import "./styles/app.css"
import { useSelector } from 'react-redux';


function App() {
  //get the font from the store and set this for the whole site
  const font = useSelector(state => state.langFont.font)

  return (

    <div className={`App ${font}`}>
      <NavBar />
      <p className="">this should change according to the font selected</p>
      <p >poppins </p>
      <p >テストどうですか？ </p>
    </div >
  );
}

export default App;
