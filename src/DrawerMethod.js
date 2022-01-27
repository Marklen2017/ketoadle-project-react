import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from '@material/react-material-icon';
import { Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_KEY } from './redux/Constants';
import FeedbackModal from './components/FeedbackModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginDataMethod, deleteAccount, deactivateAccount } from './redux/Actions';
import LegalModal from './components/Legal';

const useStyles = makeStyles({
    list: {
        width: 200,
    },
    fullList: {
        width: 'auto',
    },
});

export default function DrawerMethod({ isName, userType, isMobile }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const [isLogout, setLogout] = React.useState(false);
    const [isProfile, setProfile] = React.useState(false);
    const [feedback, setFeedback] = React.useState(false);
    const [legal, setLegal] = React.useState(false);
    const [password, setPassword] = React.useState(false);
    const isSocial = localStorage.getItem('isSocial');
    const dispatch = useDispatch();


    const recruiterTypes = [{ item: 'Ketoadle' }, { subItem: 'Feedback' }, { subItem: 'Sponser Ketoadle' }, { subItem: 'Invest In Ketoadle' },{ item: 'Legal' }, { subItem: 'Cookies' }, { subItem: 'Privacy Policy' }, { subItem: 'Terms & Conditions' }, { item: 'Platform' }, { subItem: 'Change Password' },{ subItem: 'Delete Account' },{ subItem: 'Deactivate Account' },{ subItem: 'Logout' }];
    const seekerTypes = [{ item: 'Ketoadle' }, { subItem: 'Feedback' }, { item: 'Legal' }, { subItem: 'Cookies' }, { subItem: 'Privacy Policy' }, { subItem: 'Terms & Conditions' }, { item: 'Platform' },{ subItem: 'Change Password' },{ subItem: 'Delete Account' },{ subItem: 'Deactivate Account' }, { subItem: 'Logout' }];
    const landingTypes = [{ item: 'Ketoadle' }, { subItem: 'Sponser Ketoadle' }, { subItem: 'Invest In Ketoadle' }, { subItem: 'Advertise With Us' }, { item: 'Legal' }, { subItem: 'Cookies' }, { subItem: 'Privacy Policy' }, { subItem: 'Terms & Conditions' }];

    const drawerData = userType === 'recruiter' ? recruiterTypes : (userType === 'seeker' ? seekerTypes : landingTypes);
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const onClickMethod = (value) => {
        if (value === 'Logout') {
            let isCookie = localStorage.getItem('isCookieAccept');
            window.FB && window.FB.logout();
            localStorage.clear();
            localStorage.setItem('isCookieAccept', isCookie);
            global.socket && global.socket.disconnect();
            dispatch(clearLoginDataMethod());
            setLogout(true)
        }
        else if (value === 'Profile') {
            setProfile(true);
        }
        else if (value === 'Feedback') {
            setFeedback(true);
        }
        else if (value === 'Sponser Ketoadle' || value === 'Invest In Ketoadle' || value === 'Advertise With Us' || value === 'Cookies' || value === 'Privacy Policy' || value === 'Terms & Conditions') {
            setLegal(true);
        }
        else if(value === 'Change Password'){
            setPassword(true);
        }
        else if(value==='Delete Account'){
            let isCookie = localStorage.getItem('isCookieAccept');
            window.FB && window.FB.logout();
            localStorage.setItem('isCookieAccept', isCookie);
            global.socket && global.socket.disconnect();
            dispatch(deleteAccount());
            setLogout(true)
        }
        else if(value==='Deactivate Account'){
            dispatch(deactivateAccount());
        }
        setState({ ...state, 'right': false });
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={(e) => toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >

            {drawerData.map((data, index) => {
                const key = Object.keys(data);
                if (key && key[0] === 'item') {
                    return <div className="noHover">
                        <List style={{ padding: 0 }}>
                            <ListItem button key={index} onClick={() => onClickMethod(data.item)} style={{ paddingBottom: 1, paddingTop: 1 }}>
                                <ListItemText primary={data.item} style={{ fontSize: 12, color: '#4267b2' }} />
                            </ListItem>
                        </List>
                        <Divider />
                    </div>
                }
                if (isSocial && key && key[0] === 'subItem' && data.subItem === 'Logout') {
                    return <GoogleLogout
                        clientId={GOOGLE_KEY}
                        render={renderProps => (
                            <ListItem button key={index} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                {/* <ListItemIcon style={{ minWidth: 25 }}>{index % 2 === 0 ? <InboxIcon style={{ fontSize: 12 }} /> : <MailIcon style={{ fontSize: 12 }} />}</ListItemIcon> */}
                                <ListItemText primary={data.subItem} style={{ fontSize: 12 }} />
                            </ListItem>
                        )}
                        onLogoutSuccess={() => onClickMethod(data.subItem)}
                    />

                    // </GoogleLogout>
                }
                return <ListItem button key={index} onClick={() => onClickMethod(data.subItem)}>
                    <ListItemText primary={data.subItem} style={{ fontSize: 12 }} />
                </ListItem>
            })}
        </div>
    );

    const onClose = () => {
        setFeedback(false);
        setLegal(false);
    }

    if (isLogout)
        return <Redirect to="/" />
    if (isProfile)
        return <Redirect to="/profile" />
    if (legal) {
        return <LegalModal onClose={onClose} />
    }
    else if (feedback) {
        return <FeedbackModal onClose={onClose} />
    }
    else if(password){
        return <Redirect to="/forgot-password"/>
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginLeft: 10, marginRight: isMobile ? 0 : 30 }}>
                <MaterialIcon icon='menu' onClick={toggleDrawer('right', true)} />
                {isName && <div style={{ display: 'flex', flexDirection: 'row', fontSize: 11 }} >Menu</div>}
            </div>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </div>
    );
}