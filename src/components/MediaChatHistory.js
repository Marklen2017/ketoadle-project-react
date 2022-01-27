import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountBox from '@material-ui/icons/AccountBox';
import { Chat } from '../Screens/ChatScreen';
import { getUserType } from '../common-methods';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'gainsboro',
        padding: 0
    },
    nested: {
        paddingLeft: theme.spacing(1),
        padding: 0,
    },
}));

export default function MediaChatHistory(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [autoOpen, setAutoOpen] = React.useState(true);
    const [isChatOn, setIsChatOn] = React.useState(false);
    const [chatId, setChatId] = React.useState(null);
    const [clientName, setClientName] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [chatStatus, setChatStatus] = React.useState(false);
    const [seekerScore, setSeekerScore] = React.useState(0);
    

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    // const handleAutoClick = () => {
    //     setAutoOpen(!autoOpen);
    // };

    const onChat = (post) => {
        setIsChatOn(true);
        setChatId(post._id);
        setClientName(post.name ? post.name : post.email);
        setAvatar(post.image ? post.image : 'demo/faces/female/user.png');
        setChatStatus(post.live);
    }

    const onClose = () => {
        setIsChatOn(false);
    }
    const isRecruiter = getUserType() === 'recruiter' ? true : false;
    const chatData = props && props.data && props.data.data ? props.data.data : [];
    return (
        <div className="nestedList" ref={props.setConsoleRef}>
            {isChatOn && <Chat isMedia={props.isMedia} postId={props.postId} chatId={chatId} clientName={clientName} chatStatus={chatStatus} chatSeekerImage={isRecruiter ? avatar : null} chatRecruiterImage={isRecruiter ? null : avatar} onClose={onClose} />}
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button style={{ backgroundColor: '#00af50' }}>
                    <ListItemIcon onClick={() => props.onCloseMatches()}>
                        <Close style={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Chat History" style={{ color: '#fff' }} />
                    {/* {autoOpen ? <ExpandLess style={{ color: '#3D5170' }} /> : <ExpandMore style={{ color: '#3D5170' }} />} */}
                </ListItem>
                <Collapse in={autoOpen} timeout="auto" unmountOnExit style={{ maxHeight: 300, overflowY: 'scroll', height: 'auto',padding:0 }}>
                    <List component="div" disablePadding style={{ overflowY: 'scroll' }}>
                        {chatData && chatData.length ? chatData.map((item, index) => {
                            const data=item.jobSeekerId;
                            return <ListItem button style={{padding:0}} className={classes.nested} key={index} onClick={() => onChat(data)}>
                                <ListItemIcon style={{ width: 150 }}>
                                    <img
                                        style={{ borderRadius: '50%', margin: 5 }}
                                        src={data.image ? data.image : 'demo/faces/female/user.png'}
                                        alt={data.name}
                                        width="30"
                                        height="30"
                                    />
                                    <div style={{ color: '#4267b2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 150 }}>
                                        <div style={{ fontSize: 12, color: '#000' }}>{data.name}</div>
                                        <FiberManualRecordIcon style={data.live ? { color: '#00af50', width: 12, height: 12 } : { color: 'grey', width: 12, height: 12 }} />
                                    </div>
                                </ListItemIcon>

                            </ListItem>
                        }) : <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="No Data Found" />
                            </ListItem>}
                    </List>
                </Collapse>
            </List>
        </div>
    );
}