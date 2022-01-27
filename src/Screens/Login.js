import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginForm from "./LoginForm";
import { connect } from 'react-redux';
import Footer from '../Footer';

import {
    Grid,
    Card,
    ListGroup,
    ListGroupItem,
    Form,
    Alert
} from "tabler-react";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabs: {
        outline: 'none',
        marginLeft: 30
    },
    tab: {
        outline: 'none'
    },
    '&:hover': {
        outline: 'none',
    },
}));

function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        localStorage.setItem('selectedTab', newValue);
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <div style={{
                backgroundImage: `url(${require("../assets/images/loginImg.png")})`,
                height: '-webkit-fill-available',
                width: '-webkit-fill-available',
                backgroundSize: '100% 100%',
                justifyContent: 'flex-end'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 50
                }}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <Tabs
                            value={value}
                            indicatorcolor="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}
                            textcolor="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}
                            onChange={handleChange}
                            style={{ outline: 'none' }}
                            className={classes.tabs}
                        // inkBarStyle={{background: 'blue'}}
                        >
                            <Tab label="Employer, Recruiter" {...a11yProps(0)} className={classes.tab} />
                            <Tab label="Job Seeker" {...a11yProps(1)} className={classes.tab} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Card small style={{ borderBottomLeftRadius: 11 }}>
                                <Card.Header className="border-bottom">
                                    <h6 className="m-0">Login</h6>
                                </Card.Header>
                                <LoginForm selectedTab={value} />    
                            </Card>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Card small style={{ borderBottomLeftRadius: 11 }}>
                                <Card.Header className="border-bottom">
                                    <h6 className="m-0">Login</h6>
                                </Card.Header>
                                <LoginForm selectedTab={value} />
                            </Card>
                        </TabPanel>
                    </div>
                </div>
            </div>
            <Footer noHeader={true}
                isMobile={window.screen.width > 500 ? false : true} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    // loading: state.createEvent.loading,
    // createEventResponse: state.createEvent.createEventResponse,
    // error: state.createEvent.error,
    // eventData: state.createEvent.eventData
});

const mapDispatchToProps = {
    // saveEventMethod: saveEvent
};

const VerticalTabsWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(VerticalTabs);

export default VerticalTabsWrapper;
