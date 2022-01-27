import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import React from 'react';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import DrawerMethod from './DrawerMethod';
import TopDrawerMethod from './TopDrawerMethod';
// import { loginMethod, clearDataMethod, logOutMethod } from '../redux/Actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import NavIcon from './NavIcon';
import ProfileNav from './ProfileNav';
import { isShowChat } from './redux/Actions';
import { getUserType } from "./common-methods";

export default function SiteHeaderFooter(props) {

  const iconStyle = { fontSize: 20 };
  const textStyle = { display: 'flex', flexDirection: 'row', fontSize: 11 };
  const selectedTextStyle = { display: 'flex', flexDirection: 'row', fontSize: 11, borderBottom: '1px solid #00af50 ' };
  const selectedIconStyle = { fontSize: 20, color: '#00af50 ' };
  const dispatch = useDispatch();
  const { isChatShow } = useSelector(state => state.reducerMethod);
  const userType = getUserType() === 'recruiter' ? 'recruiter' : 'seeker';

  return (
    <div className="navContainer">
      <TopAppBar className="top-bar-class" style={{ backgroundColor: "#404040" }} fixed>
        {props.screenSize > 500 ? <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarTitle style={{ paddingLeft: 0 }}>
              <Link to="/home"><img
                src={require("./assets/images/white_logo.png")}
                alt="Logo"
                height='30px'
                width='40px'
              /></Link>
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='center' role='toolbar'>
            <TopAppBarIcon actionItem tabIndex={0}>
              <ProfileNav
                userImage={props.userImage}
                userName={props.userName}
                isSelected={props.locationName === '/profile'}
                styleTextValues={props.locationName === '/profile' ? selectedTextStyle : textStyle} />
            </TopAppBarIcon>
            {props.navProps.map((items, index) => {
              return <TopAppBarIcon actionItem tabIndex={index + 1}>
                {items.icon !== 'notifications' ?
                  <NavIcon
                    target={items.to}
                    icon={items.icon}
                    locationName={props.locationName}
                    onClickMethod={items.onClick}
                    value={items.value}
                    isSelected={props.locationName === items.to}
                    styleValues={props.locationName === items.to ? selectedIconStyle : iconStyle}
                    styleTextValues={props.locationName === items.to ? selectedTextStyle : textStyle} /> :
                  <TopDrawerMethod
                    data={props.notifications}
                    value={items.value}
                    styleValues={props.locationName === items.to ? selectedIconStyle : iconStyle}
                    styleTextValues={props.locationName === items.to ? selectedTextStyle : textStyle}
                    onNotificationClick={props.onNotificationClick} />
                }
              </TopAppBarIcon>
            })}
          </TopAppBarSection>
          <TopAppBarSection align='end' role='toolbar'>
            <TopAppBarIcon actionItem tabIndex={0}>
              <DrawerMethod isName={true} userType={userType} isMobile={props.screenSize > 500 ? false : true} />
            </TopAppBarIcon>
          </TopAppBarSection>
        </TopAppBarRow>
          : <div><TopAppBarRow dense>
            <TopAppBarSection align='start'>
              {/* <TopAppBarIcon navIcon tabIndex={0}>
                <img
                  src={require("./assets/images/logo.png")}
                  alt="Logo"
                />
              </TopAppBarIcon> */}
              <TopAppBarTitle style={{ paddingLeft: 0 }}>
                <Link to="/home"><img
                  src={require("./assets/images/Ketoadle_logo_white.png")}
                  alt="Logo"
                  height='30px'
                  width='80px'
                  style={{ marginLeft: 10 }}
                /></Link>
              </TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              {/* <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon icon='public' onClick={() => console.log('click')} />
              </TopAppBarIcon> */}
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon icon='forum' onClick={() => props.onChatClick()} />
              </TopAppBarIcon>
              {/* <TopAppBarIcon actionItem tabIndex={1}>
                <MaterialIcon icon='search' onClick={() => console.log('click')} />
              </TopAppBarIcon> */}
              <TopAppBarIcon actionItem tabIndex={2}>
                <DrawerMethod userType={userType} />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
            <TopAppBarRow>
              <TopAppBarSection align='center' role='toolbar' style={{ alignItems: 'baseline' }}>
                <TopAppBarIcon actionItem tabIndex={0}>
                  <Link style={{ textDecoration: 'none', width: 'auto', textAlign: 'center' }} to='/profile'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img
                        className="rounded-circle"
                        src={props.userImage}
                        width="20"
                        height="20"
                        style={props.locationName === '/profile' ? { border: '1px solid #00af50 ' } : {}}
                      />
                      <div style={props.locationName === '/profile' ? selectedTextStyle : textStyle} to='/profile'>{props.userName}</div>
                    </div>
                  </Link>
                </TopAppBarIcon>
                {props.navProps.map((items, index) => {
                  // if (items.value === 'Live Feed') return null;
                  return <TopAppBarIcon actionItem tabIndex={index + 1}>
                    {items.icon !== 'notifications' ? <Link style={{ textDecoration: 'none', width: 'auto', textAlign: 'center', paddingLeft: 5, paddingRight: 5, width: '20%' }} to={items.to}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcon icon={items.icon} style={props.locationName === items.to ? selectedIconStyle : iconStyle} />
                        <div style={props.locationName === items.to ? selectedTextStyle : textStyle} >{items.value}</div>
                      </div>
                    </Link> : <TopDrawerMethod onNotificationClick={props.onNotificationClick} data={props.notifications} value={items.value} styleValues={props.locationName === items.to ? selectedIconStyle : iconStyle} styleTextValues={props.locationName === items.to ? selectedTextStyle : textStyle} />}
                  </TopAppBarIcon>
                })}
              </TopAppBarSection>
            </TopAppBarRow>
          </div>}
      </TopAppBar>
      <TopAppBarFixedAdjust>
        {props.children}
        {/* <Footer isMobile={props.screenSize > 500 ? false : true} /> */}
      </TopAppBarFixedAdjust>
    </div>
  );
}