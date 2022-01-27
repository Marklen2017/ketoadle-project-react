// @flow

import * as React from "react";

import {
    Site,
    Grid,
    List
} from "tabler-react";
import PropTypes from "prop-types";

class Footer extends React.Component {

    render() {
        const { menuItems, copyright, isMobile, noHeader } = this.props;
        return (
            <div style={{ zIndex: 100, position: 'fixed', height: 40, backgroundColor: "rgb(64, 64, 64)", bottom: 0, width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', color: '#fff' }}>{copyright}</div>
        );
    }
}

Footer.propTypes = {
    /**
     * Whether the content is contained, or not.
     */
    contained: PropTypes.bool,
    /**
     * The menu items array.
     */
    menuItems: PropTypes.array,
    /**
     * The copyright info.
     */
    copyright: PropTypes.string
};

Footer.defaultProps = {
    contained: false,
    copyright: "Copyright © 2020 Ketoadle",
    menuItems: [
        {
            title: "Home",
            to: ""
        },
        {
            title: "Services",
            to: ""
        },
        {
            title: "About",
            to: ""
        },
        {
            title: "Products",
            to: ""
        },
        {
            title: "Blog",
            to: ""
        }
    ]
};

export default Footer;
