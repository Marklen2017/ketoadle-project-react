
import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { Button } from "shards-react";
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: 300,
        maxHeight: '100vh'
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));


export default function ReferencePopup(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (props.isLoading && open) {
            debugger
            handleTooltipClose();
        }
    }, [props.isLoading]);


    return (
        <div>
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
                        placement="top-end"
                        interactive
                        title={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={props.message ? { display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' } : {}}>
                                    <div>
                                        <div><span style={{ color: '#00af50' }}>Reference Name : </span> <span>{props.refName}</span></div>
                                        <div><span style={{ color: '#00af50' }}>Email : </span> <span>{props.refEmail}</span></div>
                                        <div><span style={{ color: '#00af50' }}>Contact : </span> <span>{props.refContact}</span></div>
                                    </div>
                                    <div style={{ marginLeft: 10 }}>
                                        {props.message && <Button size="sm" style={{backgroundColor:'#00af50',borderColor:'#00af50'}} title="Status">Verified</Button>}
                                    </div>
                                </div>
                                {props.message && <div style={{ fontWeight: 400, color: '#00af50' }}>Details</div>}
                                <div>{props.message}</div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {!props.message && <Button size="sm" color="warning" style={{ backgroundColor: 'yellow', color: 'red' }} title="Status" disabled>Pending</Button>}
                                    {!props.message && <Button size="sm" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} style={{ backgroundColor: '#00af50', borderColor: '#00af50', margin: 10 }} onClick={() => props.onResendEmail({ name: props.refName, email: props.refEmail }, true)}>Resend</Button>}
                                </div>
                            </div>
                        }
                    >
                        <Icon onClick={handleTooltipOpen} style={{ paddingTop: 1, fontSize: 48, color: '#00af50', cursor:'pointer' }} title="Reference Info">account_box</Icon>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
}

