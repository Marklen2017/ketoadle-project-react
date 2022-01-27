import React from 'react';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '100%',
        color: '#00af50'
    },
}

const AboutBlock = ({ profile, isRecruiter, onApiClick }) => {
    return (
        <div style={{ padding: 20 }}>
            <div style={styles.container}><span style={{ width: '40%' }}>Profession : </span><span className="profInfo" title={profile.about ? profile.about : isRecruiter ? 'Recruiter' : ''}>{profile.professon ? profile.professon : isRecruiter ? 'Recruiter' : ''}</span>  </div>
            {!isRecruiter && <div style={styles.container}> <span style={{ width: '40%' }}>About : </span><span className="aboutInfo" title={profile.about ? profile.about : ''}>{profile.about}</span>  </div>}
            {/* {!isRecruiter && <div style={styles.container}> <span style={{ width: '40%' }}>Portfolio API : </span><span className="aboutInfo" title={profile.about ? profile.about : ''} onClick={onApiClick} style={{color:"#4267b2",cursor:'pointer'}}><i className={'fa fa-address-book'}></i></span>  </div>} */}
        </div>
    )
}

export default AboutBlock;