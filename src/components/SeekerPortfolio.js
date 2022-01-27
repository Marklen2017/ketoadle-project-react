import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Microlink from '@microlink/react';

const getImages = (files) => {
    return files ? files.map((data, index) => {
        return data.image.includes('http') ? <span style={{ width: 50,height: 50, margin: 5 }}><Microlink url={data.image} style={{height:50,width:50}}/></span> :
            <span style={{ width: 50,height: 50, margin: 5 }}>
                <img src={data.image} alt='' />
            </span>
    }) : null
}


const SeekerPortfolio = ({ profile }) => {
    return (
        <div style={{ maxWidth: 200, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {profile.portfolio && profile.portfolio[0] ? <div style={{alignSelf:'flex-start', display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{getImages(profile.portfolio[0].images)}</div> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>No Images Found</div>}
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            {profile.portfolio && profile.portfolio[0] && profile.portfolio && profile.portfolio[0].videos && profile.portfolio[0].videos.length ? profile.portfolio[0].videos.map((data, index) => {
                return <div style={{alignSelf:'flex-start', width: 70,height:70, marginLeft: 5, marginRight: 5, marginBottom: 10 }} key={index} title={data.video}>
                    <ReactPlayer url={data.video} controls width={'100%'} height={'80%'} />
                    {/* <div style={{overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap'}}><a href={data.video}>{data.video}</a></div> */}
                </div>
            }) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>No Videos Found</div>}
            </div>
            <Link to="/update-profile" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: '#4267b2', marginTop: 20, marginBottom: 20 }}>Edit Portfolio</Link>
        </div >
    );
}

export default SeekerPortfolio;