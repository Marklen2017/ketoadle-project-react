
import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { Button } from "tabler-react";
import {
    Comment
} from "tabler-react";
import { authCheckToaster } from '../redux/AuthCheckToaster';
import { BASE_URL } from '../redux/Constants';
import { getAccessToken, getUserType } from '../common-methods';
import axios from 'axios';
import Toaster from '../redux/Toaster';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: 300,
        maxHeight: '100vh',
        padding:0
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));


export default function UserInfoPopup({ info, isRequestScreen, isOwner, status, userInfo }) {
    const [open, setOpen] = React.useState(false);
    const [isRequest, setIsRequest] = React.useState(status === 'Pending' ? true : false);
    const isShowRequest = info && info.userType ? getUserType() === info.userType : false;
    const classes = useStyles();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const trueHover = () => {
        !isOwner && setOpen(true);
    }

    const falseHover = () => {
        setOpen(false);
    }

    const onSendRequest = async (id) => {
        if (authCheckToaster()) {
            const request = { requestTo: id };
            axios
                .post(`${BASE_URL}api/friend/sendRequest`, request, {
                    headers: {
                        token: getAccessToken()
                    }
                })
                .then((res) => {
                    if (res.error)
                        Toaster(res.error.message, 'error');
                    else {
                        Toaster(`Friend Request Sent Successfully`, 'success');
                        setIsRequest(true);
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    const onRemoveConnection = async () => {
        if (authCheckToaster()) {
            axios
                .delete(`${BASE_URL}api/friend/removeFriend/${userInfo._id}`, {
                    headers: {
                        token: getAccessToken()
                    }
                })
                .then((res) => {
                    if (res.error)
                        Toaster(res.error.message, 'error');
                    else {
                        Toaster(`Connection removed Successfully`, 'success');
                        setIsRequest('unfriend');
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    return (
        <div>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div onMouseEnter={trueHover} onMouseLeave={falseHover}>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        TransitionComponent={Zoom}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        classes={{ tooltip: classes.customWidth }}
                        placement="bottom-start"
                        interactive
                        title={
                            <div style={{ border: '1px solid #f1f1f1', display: 'flex', flexDirection: 'column', boxShadow: '0 0 10px #404040' }}>
                                <Comment
                                    avatarURL={info && info.image ? info.image : "demo/faces/female/user.png"}
                                    date={info && info.userType ? info.userType : ''}
                                    name={info && info.name ? info.name : 'User'}
                                    text={info && info.email ? info.email : ''}
                                // replies={discussion.image ? this.feedImages(discussion) : ""}
                                />
                                {!isRequestScreen && isShowRequest && (status === 'Accepted' && isRequest !== 'unfriend' ? <div>
                                    <Button theme="accent" className="mt-3 ml-10" color="secondary">Connected</Button>
                                    <Button theme="accent" className="mt-3 ml-10" color="danger" onClick={onRemoveConnection}>Remove Connection</Button>
                                </div> : (
                                        (isRequest === 'unfriend' || !isRequest) ? <Button theme="accent" className="mt-3 ml-10" color="primary" onClick={() => onSendRequest(info._id)}>Contact Request</Button> :
                                            <Button theme="accent" className="mt-3 ml-10" color="warning" disabled={true}>Pending</Button>))}
                            </div>}
                    >
                        {isRequestScreen ? <div style={{ cursor: 'pointer' }}> <img
                            className="rounded-circle"
                            src={info && info.image ? info.image : "demo/faces/female/user.png"}
                            alt={''}
                            width="40"
                            height="40" />
                            {info && info.name ? info.name : 'User'}</div> : <div style={{ cursor: 'pointer' }}>{info && info.name ? info.name : 'User'}</div>}
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
}

