import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SignupForm from "./SignupForm";
import {
    Grid,
    Card
} from "tabler-react";
import Footer from '../Footer';
import { Redirect } from 'react-router-dom';

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

export default function Signup() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        localStorage.setItem('selectedTab', newValue);
        setValue(newValue);
    }
    // let userToken = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).token;
    // if (!userToken)
    //     return <Redirect to="/401" />
    // else {
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
                        <Grid.Col lg="4" md="5" sm="6">
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
                                <Card small>
                                    <Card.Header className="border-bottom">
                                        <h6 className="m-0">Signup</h6>
                                    </Card.Header>
                                    <SignupForm selectedTab={value} />
                                </Card>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Card small>
                                    <Card.Header className="border-bottom">
                                        <h6 className="m-0">Signup</h6>
                                    </Card.Header>
                                    <SignupForm selectedTab={value} />
                                </Card>
                            </TabPanel>
                        </Grid.Col>
                    </div>
                </div>
                <Footer noHeader={true} 
 isMobile={window.screen.width> 500?false:true}/>
            </div>
        );
    }
// }
