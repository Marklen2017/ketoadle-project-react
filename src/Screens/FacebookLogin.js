import React from 'react';
import { useDispatch } from 'react-redux';
import { socialLogin } from '../redux/Actions';
import { FACEBOOK_APP_ID } from '../redux/Constants';
import { Button } from 'tabler-react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function FacebookLoginComp({ userType, isCookieAccept }) {

    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        if (response && response.userID) {
            let profileObj = {
                imageUrl: response.picture && response.picture.data && response.picture.data.url,
                email: response.email,
                name: response.name
            }
            let request = {
                "userType": userType,
                "profileObj": profileObj

            }
            dispatch(socialLogin(request,true));
        }
    }
    return (<FacebookLogin
        appId={FACEBOOK_APP_ID}
        render={renderProps => (
            <Button disabled={!isCookieAccept} onClick={renderProps.onClick} type="button" color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} icon="facebook">Facebook</Button>
        )}
        fields="name,email,picture"
        isDisabled={!isCookieAccept}
        title={!isCookieAccept ? "Accept cookies to login" : ''}
        callback={responseFacebook} />
    );
}

export default FacebookLoginComp;