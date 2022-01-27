
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


export default function LikeCompPopup({ info, likeEmojis }) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const trueHover = () => {
        setOpen(true);
    }

    const falseHover = () => {
        setOpen(false);
    }

    return (
        <div onMouseEnter={trueHover} onMouseLeave={falseHover}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
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
                            <div style={{ border: '1px solid #f1f1f1', boxShadow: '0 0 10px #404040',minWidth:200 }}>
                                {info.map((data, index) => {
                                    return <Comment
                                        avatarURL={data.user && data.user.image ? data.user.image : "demo/faces/female/user.png"}
                                        date={<span style={{ color: 'red' }}>{data.emoji ? data.emoji : ''}</span>}
                                        name={data.user && data.user.name ? data.user.name : 'User'}
                                        text={data.user && data.user.email ? data.user.email : ''}
                                        key={index}
                                    />
                                })}
                            </div>
                        }
                    >
                        <div style={{ cursor: 'pointer' }}>{info.length} <span style={{ color: 'red' }}>{likeEmojis}</span></div>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
}

