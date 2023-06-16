import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faToggleOff, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import hamburger from "../images/icons/hamburger.svg"
import mail from "../images/icons/mail.svg"

// export const AwesomeBars = () => { return (<FontAwesomeIcon icon={faBars} />) }
export const AwesomeToggleLeft = ({ onClick }) => { return (<FontAwesomeIcon icon={faToggleOff} onClick={onClick} size="2xl" />) }
export const AwesomeToggleRight = ({ onClick }) => { return (<FontAwesomeIcon icon={faToggleOff} rotation={180} onClick={onClick} size="2xl" />) }
export const AwesomeChevronDown = ({ onClick }) => { return (<FontAwesomeIcon icon={faChevronDown} onClick={onClick} />) }
export const Hamburger = () => { return (<img src={hamburger}></img>) }
export const Mail = () => { return (<img src={mail}></img>) }