import React, { useEffect, useState } from 'react';
import { Grid } from 'tabler-react';
import LoginForm from "./LoginForm";
import { Alert } from 'tabler-react';
import SignupForm from "./SignupForm";

export default function NewLogin({ styles, seletedUser, isSignup }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const screenWidth = window.screen.width;
    const onTabChange = (value) => {
        setSelectedTab(value);
    }
    return (
        <div style={styles}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>{seletedUser ? 'Job Seeker/Professional' : 'Recruiter'}</div>
                <div style={{ textAlign: 'center', marginBottom: 10, marginTop: 5, width: '100%', display: 'flex' }}>
                    <div onClick={() => onTabChange(0)} style={selectedTab === 0 ? { width: '50%', cursor: 'pointer', padding: 5, fontSize: 18, borderTop: '1px solid', borderRight: '1px solid', color: 'black' } : { width: '50%', cursor: 'pointer', padding: 5, fontSize: 18, borderBottom: '1px solid', color: 'black' }}>New Account</div>
                    <div onClick={() => onTabChange(1)} style={selectedTab === 1 ? { width: '50%', cursor: 'pointer', padding: 5, fontSize: 18, borderTop: '1px solid', borderLeft: '1px solid', color: 'black' } : { width: '50%', cursor: 'pointer', padding: 5, fontSize: 18, borderBottom: '1px solid', color: 'black' }}>Existing User?</div>
                </div>
                <div style={{ width: '100%' }}>
                    {selectedTab ? < LoginForm selectedTab={seletedUser} /> : <SignupForm selectedTab={seletedUser} />}
                </div>
            </div>
            {!selectedTab && <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#4267b2', padding: '5px 20px 5px 20px', cursor: 'pointer' }} onClick={() => setSelectedTab(1)}>Already have an account? Sign In</div>}
        </div>
    );
}