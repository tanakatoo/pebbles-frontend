import './styles/app.css';
import NavBar from "./components/common/NavBar"
import "./styles/app.css"
import { useSelector } from 'react-redux';
import MyRoutes from "./MyRoutes"

function App() {
  //get the font from the store
  const font = useSelector(state => state.langFont.font)

  //we have to hardcode the string of the font because tailwind doesn't know what to use at build
  return (
    <div className={`App ${font == 'font-poppins' ? 'font-poppins' : 'font-notoJP'}`}>
      <NavBar />
      <MyRoutes />
    </div >
  );
}

export default App;
