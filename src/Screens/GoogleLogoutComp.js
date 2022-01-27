import React from 'react';
import {GoogleLogout} from 'react-google-login';

function GoogleLogoutComp() {
    const logout = (response) => {
        console.log(response);
    }

    return (
    <GoogleLogout
        clientId="214105719776-so2nokpnkggagnour586f3u0bb91pn5u.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>
    );
}

export default GoogleLogoutComp;