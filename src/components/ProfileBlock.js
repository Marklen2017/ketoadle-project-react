import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import { getUrlTextLink, getUserType } from "../common-methods";
import FriendRequestModal from '../components/FriendRequestModal';
import ProfilePicDropzone from '../components/ProfilePicDropzone';

const styles = {
    container: {
        marginTop: 20
    },
    infoDiv: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    profInfoDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profSpan: {
        display: 'flex',
        alignItems: 'center',
        color: '#00af50',
        width: '100%',
    },
    profIcon: {
        marginRight: 5,
        color: 'black',
        fontSize: 12
    },
    infoColor: {
        color: '#00af50',
        width: '100%',
    },
    text: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        whiteSpace: 'nowrap'
    }
}

const ProfileBlock = ({ profile, isRecruiter, isProfile, onEdit, onPicThumbnailChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const firstName = profile.name && profile.name.split(' ') ? profile.name.split(' ')[0] : '-';
    const lastName = profile.name && profile.name.split(' ') ? profile.name.split(' ')[1] : '-';
    const linkText = profile.location ? getUrlTextLink(profile.location) : '-';
    let isSeeker = getUserType() !== 'recruiter' ? true : false;
    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img
                    className="rounded-circle"
                    src={profile.image ? profile && profile.image : "demo/faces/female/user.png"}
                    width="100"
                    height="100"
                    alt="no"
                />
                {isProfile && <ProfilePicDropzone onPicThumbnailChange={onPicThumbnailChange} />}
            </div>
            <div style={{ textAlign: 'right' }}>{isOpen ? <FriendRequestModal isModalOpen={isOpen} onClose={() => setIsOpen(false)} /> : <span onClick={() => setIsOpen(true)} style={{ cursor: 'pointer', color: '#4267b2' }}><i class="fa fa-users" aria-hidden="true"></i></span>}</div>
            {!isRecruiter && <div style={styles.container}>
                <div style={styles.infoDiv}><span style={styles.infoColor}>First Name : </span><span style={styles.text} title={profile.firstName}>{firstName}</span></div>
                <div style={styles.infoDiv}><span style={styles.infoColor}>Surname : </span><span style={styles.text} title={profile.lastName}>{lastName}</span></div>
                {!isSeeker && <div style={styles.infoDiv}><span style={styles.infoColor} >Company : </span><span style={styles.text} title={profile.company ? profile.company : ''}>{profile.company ? profile.company : '-'}</span></div>}
            </div>}
            {!isRecruiter && <div style={styles.container}>
                <div style={styles.profInfoDiv}><span style={styles.profSpan}><Icon style={styles.profIcon}>home_work</Icon> Location : </span><span style={styles.text} title={profile.location ? profile.location : ''}><span dangerouslySetInnerHTML={{ __html: linkText }}></span></span></div>
                <div style={styles.profInfoDiv}><span style={styles.profSpan}><Icon style={styles.profIcon}>email</Icon> Email : </span><span style={styles.text} title={profile.email ? profile.email : ''}>{profile.email ? profile.email : '-'}</span></div>
                <div style={styles.profInfoDiv}><span style={styles.profSpan}><Icon style={styles.profIcon}>phone</Icon> Contact : </span><span style={styles.text} title={profile.contact ? profile.contact : ''}>{profile.contact ? profile.contact : '-'}</span></div>
                {isProfile && <div style={{ textAlign: 'right' }} onClick={onEdit}><Icon style={{ fontSize: 16, cursor: 'pointer', color: '#4267b2' }}>edit</Icon></div>}
            </div>}
        </div>
    )
}

export default ProfileBlock;