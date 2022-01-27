import React from 'react';
import { Link } from 'react-router-dom';


const SeekerProfileSection = ({ profile }) => {
    return (
        <div style={{ maxWidth: 200, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="row" style={{ backgroundColor: '#4267b2', backgroundSize: 'cover', color: '#fff', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundRepeat: 'no-repeat', paddingBottom: 30, width: 'fit-content', padding: 10, margin: '0 auto', marginTop: 20 }}>
                <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Your Skills Score</div>
                <div style={{ fontWeight: 'bold', fontSize: 24 }}>{profile.totalScore}</div>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{profile.name}</div>
                <hr width='40%' color="#fff" style={{ marginTop: 2, marginBottom: 2, color: '#fff' }} />
                <div>Interactive CV/Portfolio</div>
            </div>
            {/* <Link to="/update-profile" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: '#4267b2', marginTop: 20 }}>Edit CV</Link> */}

            <div className="row" style={{ backgroundSize: 'cover', color: '#fff', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundRepeat: 'no-repeat', paddingBottom: 30, width: 'fit-content', padding: 10, margin: '0 auto', marginTop: 20 }}>
                <img height={40} width={40} src={profile.image ? profile.image : "demo/faces/female/user.png"} style={{ borderRadius: '50%', border: '1px solid #E5E2CF' }} alt="" />
                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#00af50' }}>Profile</div>
                <div style={{ display: 'flex', flexDirection: 'column', color: '#4267b2' }}>
                    <p className="jobParagraph card-text mb-0" style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: 150,
                        whiteSpace: 'nowrap',
                        color: 'black',
                        textAlign:'center'
                    }} title={profile.about ? profile.about : `I'm a Job Seeker`}>{profile.about ? profile.about : `I'm a Job Seeker`}</p>
                </div>
            </div>
            <Link to="/update-profile" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: '#4267b2', marginTop: 20 }}>Edit Detail</Link>
        </div >
    );
}

export default SeekerProfileSection;