import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faToggleOff, faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import exclamation from "../images/icons/exclamation.svg"
import hamburger from "../images/icons/hamburger.svg"
import mail from "../images/icons/mail.svg"
import x from "../images/icons/x.png"
import support from "../images/icons/support.png"
import connect from "../images/icons/connect.svg"
import english from "../images/icons/english.png"
import travel from "../images/icons/travel.svg"
import language from "../images/icons/language.png"
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'



// export const AwesomeBars = () => { return (<FontAwesomeIcon icon={faBars} />) }
export const AwesomeToggleLeft = ({ onClick }) => { return (<FontAwesomeIcon icon={faToggleOff} onClick={onClick} size="2xl" />) }
export const AwesomeToggleRight = ({ onClick }) => { return (<FontAwesomeIcon icon={faToggleOff} rotation={180} onClick={onClick} size="2xl" />) }
export const AwesomeChevronDown = ({ onClick }) => { return (<FontAwesomeIcon icon={faChevronDown} onClick={onClick} />) }
export const AwesomeChevronLeft = ({ onClick }) => { return (<FontAwesomeIcon icon={faChevronLeft} onClick={onClick} />) }
export const AwesomeSend = ({ onClick, size }) => { return (<FontAwesomeIcon icon={faPaperPlane} onClick={onClick} size={size} />) }
export const Hamburger = () => { return (<img src={hamburger}></img>) }
export const Exclamation = () => { return (<img src={exclamation}></img>) }
export const Mail = () => { return (<img src={mail}></img>) }
export const X = ({ onClick }) => { return (<img src={x} onClick={onClick}></img>) }
export const Connect = () => { return (<img src={connect}></img>) }
export const Support = () => { return (<img src={support}></img>) }
export const English = () => { return (<img src={english}></img>) }
export const Travel = () => { return (<img src={travel}></img>) }
export const Language = () => { return (<img className='w-[60px] h-[60px]' src={language}></img>) }
