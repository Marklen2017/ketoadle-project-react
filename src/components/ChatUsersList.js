import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccountBox from '@material-ui/icons/AccountBox';
import { Chat } from '../Screens/ChatScreen';
import { getUserType, parseToekJwt } from '../common-methods';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0
    },
    nested: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
    },
}));

export default function ChatUsersList(props) {
    const classes = useStyles();
    const [autoOpen, setAutoOpen] = React.useState(true);
    const [isChatOn, setIsChatOn] = React.useState(false);
    const [chatId, setChatId] = React.useState(null);
    const [clientName, setClientName] = React.useState(null);
    const [chatStatus, setChatStatus] = React.useState(false);
    const [chatRecruiterImage, setRecruiterchatImage] = React.useState(null);
    const [chatSeekerImage, setSeekerchatImage] = React.useState(null);
    const [isMinimise, setIsMinimise] = React.useState(props.isMinimised);
    const [hoverIndex, setHoverIndex] = React.useState(null);
    const [hoverContent, setHoverContent] = React.useState(null);

    useEffect(() => {
        setIsMinimise(props.isMinimised);
    }, [props.isMinimised])

    const handleAutoClick = () => {
        // setAutoOpen(!autoOpen);
    };

    const onChat = (post, userData) => {
        const senderData = parseToekJwt() && post.user1 && post.user1._id && parseToekJwt()._id === post.user1._id ? post.user1 : post.user2;
        setIsChatOn(true);
        setRecruiterchatImage(senderData.image ? senderData.image : 'demo/faces/female/user.png');
        setSeekerchatImage(userData.image ? userData.image : 'demo/faces/female/user.png');
        setClientName(userData.name ? userData.name : 'User');
        setChatStatus(userData.live ? userData.live : false);
        setChatId(userData._id);
    }

    const onClose = (e) => {
        setIsChatOn(false);
    }

    const trueHover = (index, data) => {
        setHoverIndex(index);
        setHoverContent(data);
    }

    const falseHover = () => {
        setHoverIndex(null);
        setHoverContent(null);
    }

    const userTypeValue = getUserType();
    const { data } = props && props.data ? props.data : {};

    return (
        <div className="nestedChatList">
            {isChatOn && <Chat chatId={chatId} clientName={clientName} onClose={onClose} chatStatus={chatStatus} chatSeekerImage={chatSeekerImage} chatRecruiterImage={chatRecruiterImage} />}
            {isMinimise ?
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={() => setIsMinimise(false)}>
                        <ListItemIcon style={{ color: '#00af50' }}>
                            <i className="fa fa-window-maximize">Chat</i>
                        </ListItemIcon>
                    </ListItem>
                </List>
                :
                <div style={{ maxWidth: 600, display: 'flex' }}>
                    <div style={{ maxWidth: 240 }}>
                        {hoverIndex !== null &&  userTypeValue === 'recruiter' && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: 'white', zIndex: 999999999999999, boxShadow: '0 0 20px', borderRadius: 5, marginTop: 47 * (hoverIndex + 1), marginRight: 5 }}>
                            <Icon style={{ color: 'white', position: 'absolute', left: userTypeValue === 'recruiter' ? 121 : 127, fontSize: 25 }}>arrow_right</Icon>
                            <img
                                className="rounded-circle"
                                src={hoverContent && hoverContent.image ? hoverContent.image : "demo/faces/female/user.png"}
                                alt={''}
                                width="25"
                                height="25"
                            />
                            <div style={{ paddingBottom: 5, marginBottom: 5, color: '#00af50', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid grey', marginLeft: 5, marginRight: 5, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', width: 100, whiteSpace: 'nowrap' }}>{hoverContent.name ? hoverContent.name : 'User'}</div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ padding: 2 }}>
                                    <div style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        width: '100%',
                                        whiteSpace: 'nowrap',
                                        fontSize: 11,
                                        alignItems: 'center'
                                    }}><i class="fa fa-envelope" aria-hidden="true" style={{ marginRight: 3 }}></i>{hoverContent.email ? hoverContent.email : '-'}</div>
                                    <div style={{ fontSize: 11, alignItems: 'center' }}><i class="fa fa-mobile" aria-hidden="true"></i> {hoverContent.contact ? hoverContent.contact : '-'}</div>
                                    {/* <div style={{ fontSize: 11, alignItems: 'center' }}><i class="fa fa-user" aria-hidden="true"></i> {userTypeValue === 'recruiter' ? 'Job Seeker' : 'Recruiter'}</div> */}
                                </div>
                            </div>
                        </div>}
                    </div>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        //         subheader={
                        //             <ListSubheader component="div" id="nested-list-subheader" style={{ color: '#3D5170' }}>
                        //                 Available Chats
                        // </ListSubheader>
                        //         }
                        className={classes.root}
                    >
                        <ListItem button onClick={handleAutoClick}>
                            <ListItemIcon style={{ color: '#00af50' }} onClick={() => props.onChatClick ? props.onChatClick() : setIsMinimise(true)}>
                                <i className="fa fa-window-minimize"></i>
                            </ListItemIcon>
                            <ListItemText primary="Connections" style={{ color: '#00af50' }} />
                            {/* {autoOpen ? <ExpandLess style={{ color: '#3D5170' }} /> : <ExpandMore style={{ color: '#3D5170' }} />} */}
                        </ListItem>
                        <Collapse in={autoOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding style={{ overflowY: 'scroll', height: '100vh', paddingBottom: 50 }}>
                                {data && data.length ? data.map((users, index) => {
                                    const userData = parseToekJwt() && users.user1 && users.user1._id && parseToekJwt()._id === users.user1._id ? users.user2 : users.user1;

                                    return <ListItem name={index} button className={classes.nested} key={index} onMouseEnter={() => trueHover(index, userData)} onMouseLeave={falseHover}>
                                        {/* {hoverIndex === index ? setIsOpenModal(true):setIsOpenModal(false)} */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => onChat(users, userData)}>
                                                <img
                                                    className="rounded-circle"
                                                    src={userData.image ? userData.image : "demo/faces/female/user.png"}
                                                    alt={users.chatId}
                                                    width="25"
                                                    height="25"
                                                />
                                                <div style={{ marginLeft: 5, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', width: 100, whiteSpace: 'nowrap' }}>{userData && userData.name ? userData.name : 'User'}</div>
                                            </div>
                                            <Icon style={{color: '#ff0000', cursor: 'pointer',marginRight: 5}} onClick={()=>props.onRemoveConnection(userData._id)}>remove</Icon>
                                            <div style={{display:'flex'}}>{userData.live ? <i class="fa fa-circle" aria-hidden="true" style={{ color: '#00af50', fontSize: 8 }}></i> : <i class="fa fa-circle" aria-hidden="true" style={{ color: 'grey', fontSize: 8 }}></i>}</div>
                                        </div>
                                        {/* <ListItemIcon>
                                        <img
                                            className="rounded-circle"
                                            src={users.image?users.image:"demo/faces/female/user.png"}
                                            alt={users.chatId}
                                            width="30"
                                            height="30"
                                        />
                                        <div style={{ color: '#4267b2' }}>{userTypeValue === 'recruiter' ? (users.jobSeekerId && users.jobSeekerId ? users.jobSeekerId.name : 'User') : (users.recruiterId && users.recruiterId ? users.recruiterId.name : 'User')}</div>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <div>{userTypeValue === 'recruiter' ? (users.jobSeekerId && users.jobSeekerId && users.jobSeekerId.live ? <i class="fa fa-circle" aria-hidden="true" style={{color:'#00af50',fontSize:8}}></i> : <i class="fa fa-circle" aria-hidden="true" style={{color:'grey',fontSize:8}}></i>) : (users.recruiterId && users.recruiterId && users.recruiterId.live ? <i class="fa fa-circle" aria-hidden="true" style={{color:'#00af50'}}></i> : <i class="fa fa-circle" aria-hidden="true" style={{color:'grey'}}></i>)}</div>
                                    </ListItemText> */}

                                    </ListItem>
                                }) : <ListItem button className={classes.nested}>
                                        {!props.loading ? <ListItemText primary="No Connections Found" /> : <ListItemText primary="Loading..." />}
                                    </ListItem>}
                            </List>
                        </Collapse>
                    </List>
                </div>}
        </div>
    );
}