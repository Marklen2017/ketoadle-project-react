import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MaterialIcon from '@material/react-material-icon';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TopDrawerMethod(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({ top: false });
    const [isChatOn, setIsChatOn] = React.useState(false);

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    let count = props.data && props.data.data && props.data.data.length ? props.data.data.length : 0;

    const fullList = side => (
        <div
            className={classes.fullList}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {props.data && props.data.data && props.data.data.length ? props.data.data.map((notificationData, index) => (
                    <ListItem button key={index} style={index + 1 === props.data.data.length ? {} : { borderBottom: '1px solid #cccccc' }} onClick={() => props.onNotificationClick(notificationData)}>
                        <ListItemIcon>
                            <img
                                src={notificationData.image ? notificationData.image : "demo/faces/female/user.png"}
                                alt="Logo"
                                height="30px"
                                width="30px"
                            />
                        </ListItemIcon>
                        <ListItemText primary={notificationData.message} />
                    </ListItem>
                )) : <ListItem button>
                        <ListItemText primary={'No notification'} />
                    </ListItem>}
            </List>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'auto',padding:12, paddingLeft:10,paddingRight:10, cursor: 'pointer' }} onClick={toggleDrawer('top', true)}>
                <Badge badgeContent={count} color="secondary" invisible={count > 0 ? false : true}>
                    <MaterialIcon   icon='notifications' style={props.styleValues} />
                </Badge>
                <div style={props.styleTextValues} >{props.value}</div>
            </div>
            <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
                {fullList('top')}
            </Drawer>
        </div>
    );
}