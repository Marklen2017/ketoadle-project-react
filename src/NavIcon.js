import React from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from '@material/react-material-icon';

export default function NavIcon({ icon, target, onClickMethod, value, styleValues, styleTextValues, isSelected }) {

    return (
        <Link style={{ textDecoration: 'none', width: 'auto', paddingLeft: 12, paddingRight: 12,color:'#fff' }} to={target}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClickMethod}>
                <MaterialIcon icon={icon} style={styleValues} />
                <div style={styleTextValues} >{value}</div>
            </div>
        </Link>
    );
}