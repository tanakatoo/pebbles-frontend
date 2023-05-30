import { useLocation } from 'react-router-dom';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';

const LoginPage = () => {
    return (
        <div><a href="/login/google">Login to google</a></div>

    );
};

export default LoginPage;
