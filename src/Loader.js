import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Loader extends React.Component {
    render() {
        if (!this.props.loader)
            return null
        return (
            <div style={{
                position: 'fixed',
                zIndex: 999,
                height: '2em',
                width: '2em',
                overflow: 'visible',
                margin: 'auto',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'grey',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    opacity: 0.2,
                    ...window.screen.width < 500 ? { marginTop: 112 } : { marginTop: 66 }
                }}></div>
                {/* <img src={require('../assets/loader.gif')} alt="loading..." /> */}
                <CircularProgress color='secondary' />
            </div>
        );
    }
}