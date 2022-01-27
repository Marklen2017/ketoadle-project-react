import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { socialLogin } from '../redux/Actions';
import {GOOGLE_KEY} from '../redux/Constants';

function GoogleLoginComp({ userType,isCookieAccept }) {


    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        if (response && response.profileObj) {
            let request = {
                "userType": userType,
                "profileObj": response.profileObj

            }
            dispatch(socialLogin(request));
        }
    }
    return (<GoogleLogin
        clientId={GOOGLE_KEY}
        buttonText="Google"
        onSuccess={responseGoogle}
        className="googleButton"
        onFailure={responseGoogle}
        disabled={!isCookieAccept}
        cookiePolicy={'single_host_origin'}
        title={!isCookieAccept ? "Accept cookies to login" : ''}
    />
    );
}

export default GoogleLoginComp;