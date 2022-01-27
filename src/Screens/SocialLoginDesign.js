import React from 'react';
import GoogleLoginComp from './GoogleLoginComp';
import { Button } from 'tabler-react';
import FacebookLoginComp from './FacebookLogin';

function SocialLoginDesign({userType,isCookieAccept}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <div className="orClass">OR</div> */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                <GoogleLoginComp userType={userType} isCookieAccept={isCookieAccept}/>
                <FacebookLoginComp isCookieAccept={isCookieAccept}/>
            </div>
        </div>
    );
}

export default SocialLoginDesign;