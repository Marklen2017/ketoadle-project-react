import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileNav({ styleTextValues, isSelected,userImage,userName }) {

    return (
        <Link style={{ textDecoration: 'none', width: 'auto', paddingLeft: 12, paddingRight: 12, color: '#fff' }} to='/profile'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                    className="rounded-circle"
                    src={userImage}
                    alt={userName}
                    width="20"
                    height="20"
                    style={isSelected ? { border: '1px solid #00af50 ' } : {}}
                />
                <div style={styleTextValues} >{userName}</div>
            </div>
        </Link>
    );
}