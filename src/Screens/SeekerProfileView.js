import React from 'react';
import {
    Container,
    Grid,
    Card,
    Form
} from "tabler-react";
import ReactPlayer from 'react-player';
import ReferencePopup from './ReferencePopup';
import Icon from '@material-ui/core/Icon';
import Portfolio_bg from '../assets/Portfolio_bg.png';
import { sendRecommendEmail, saveSeekerProfileSuccess } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import SiteWrapper from "../SiteWrapper.react";
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import Microlink from '@microlink/react';
import PrintComponents from "react-print-components";
import Lightbox from 'react-image-lightbox';
import { Button } from "shards-react";
import { Chat } from '../Screens/ChatScreen';

class SeekerProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = { all: true, selectedItem: 'profile', photoIndex: 0, isOpen: false, imagesSet: [], };
        this.props.saveSeekerProfileSuccess(null);
    }

    onPortfolioCat = (key) => {
        if (key === 'all')
            this.setState({ all: true, images: false, videos: false });
        else if (key === 'images')
            this.setState({ all: false, images: true, videos: false });
        else if (key === 'videos')
            this.setState({ all: false, images: false, videos: true });
    }

    onResendEmail = (data, flag) => {
        this.props.sendRecommendEmail(data, flag);
    }

    getFormattedDate = (date) => {
        const localDateString = date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        return localDateString;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = (el) => {
        let offset = 0;
        let isVisible = false;
        const profile = document.getElementById('profile').getBoundingClientRect().top;
        isVisible = (profile + offset) >= 0 && (profile - offset) <= window.innerHeight;
        if (isVisible) {
            this.setState({ selectedItem: 'profile' });
            return true;
        }
        const skill = document.getElementById('skill').getBoundingClientRect().top;
        isVisible = (skill + offset) >= 0 && (skill - offset) <= window.innerHeight;
        if (isVisible) {
            this.setState({ selectedItem: 'skill' });
            return true;
        }
        const carrier = document.getElementById('carrier').getBoundingClientRect().top;
        isVisible = (carrier + offset) >= 0 && (carrier - offset) <= window.innerHeight;
        if (isVisible) {
            this.setState({ selectedItem: 'carrier' });
            return true;
        }
        const contact = document.getElementById('contact').getBoundingClientRect().top;
        isVisible = (contact + offset) >= 0 && (contact - offset) <= window.innerHeight;
        if (isVisible) {
            this.setState({ selectedItem: 'contact' });
            return true;
        }
        const work = document.getElementById('work').getBoundingClientRect().top;
        isVisible = (work + offset) >= 0 && (work - offset) <= window.innerHeight;
        if (isVisible) {
            this.setState({ selectedItem: 'work' });
            return true;
        }
        return;
    }

    onMenuChange = (value) => {
        this.setState({ selectedItem: value });
    }

    getImages = (files) => {
        const screenWidth = window.screen.width;
        return files ? files.map((data, index) => {
            return data.image.includes('http') ? <span style={{ height: screenWidth < 500 ? 95 : 150, width: screenWidth < 500 ? '58%' : '30%', margin: 10 }}>
                <div style={{ height: screenWidth < 500 ? (data.description ? 95 : 102) : (data.description ? 127 : 150) }}><Microlink url={data.image} /></div>
                {data.description && <div style={{
                    height: data.description ? 23 : 0, backgroundColor: 'black', color: 'white', width: '100%',
                    overflow: 'hidden',
                    display: 'inline-block',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: 3
                }}>{data.description}</div>}
            </span> :
                <span style={{ height: 150, width: screenWidth < 500 ? '30%' : '15%', margin: 10, cursor: 'pointer' }} onClick={() => this.onImageClick(files, index)}>
                    <div style={{ height: screenWidth < 500 ? (data.description ? 95 : 102) : (data.description ? 127 : 150) }}>
                        <img src={data.image} alt='' style={{ height: screenWidth < 500 ? (data.description ? 95 : 102) : (data.description ? 127 : 150), width: '100%' }} /></div>
                    {data.description && <div style={{
                        height: data.description ? 23 : 0, backgroundColor: 'black', color: 'white', width: '100%',
                        overflow: 'hidden',
                        display: 'inline-block',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        padding: 3
                    }}>{data.description}</div>}
                </span>
        }) : null
    }


    getData = (isPrint) => {
        const { data, videosData, introVideo, isEdit } = this.props;
        const isToken = !(!this.props.isToken || this.props.isToken === 'undefined');
        const { selectedItem } = this.state;
        const seekerData = data ? data : {};
        let image = localStorage.getItem('userImage') && localStorage.getItem('userImage') !== 'undefined' ? localStorage.getItem('userImage') : "demo/faces/female/user.png";
        return <Container fluid className="main-content-container px-4">
            {!isPrint && window.screen.width > 500 && <div style={{
                backgroundColor: '#414141',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                width: 'min-content',
                position: 'fixed',
                zIndex: 1000,
                top: 180,
                right: window.screen.width > 1500 ? 200 : window.screen.width > 1000 ? 50 : 20,
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}><KeyboardArrowDown color="#fff" fontSize="large" /></div>
                <div style={selectedItem === 'profile' ? { textAlign: 'center', padding: 5, backgroundColor: '#00af50' } : { textAlign: 'center', padding: 5 }} onClick={() => this.onMenuChange('profile')}><a style={{ textDecoration: 'none', color: 'white' }} href="#profile">Profile</a></div>
                <div style={selectedItem === 'carrier' ? { textAlign: 'center', padding: 5, backgroundColor: '#00af50' } : { textAlign: 'center', padding: 5 }} onClick={() => this.onMenuChange('carrier')}><a style={{ textDecoration: 'none', color: 'white' }} href="#carrier">Carrier History</a></div>
                <div style={selectedItem === 'skill' ? { textAlign: 'center', padding: 5, backgroundColor: '#00af50' } : { textAlign: 'center', padding: 5 }} onClick={() => this.onMenuChange('skill')}><a style={{ textDecoration: 'none', color: 'white' }} href="#skill">Skillset Abilities</a></div>
                <div style={selectedItem === 'work' ? { textAlign: 'center', padding: 5, backgroundColor: '#00af50' } : { textAlign: 'center', padding: 5 }} onClick={() => this.onMenuChange('work')}><a style={{ textDecoration: 'none', color: 'white' }} href="#work">Work Projects</a></div>
                {!isToken && <div style={selectedItem === 'contact' ? { textAlign: 'center', padding: 5, backgroundColor: '#00af50' } : { textAlign: 'center', padding: 5 }} onClick={() => this.onMenuChange('contact')}><a style={{ textDecoration: 'none', color: 'white' }} href="#contact">Contact Messages</a></div>}
                {!isToken && <PrintComponents
                    trigger={
                        <div style={{ textAlign: 'center', padding: 5, backgroundColor: '#4267b2', cursor: 'pointer' }}>
                            Print
</div>
                    }
                >
                    {this.getSeekerData(isToken, true, seekerData, image, data, videosData, introVideo, isEdit)}
                </PrintComponents>}
            </div>}
            {this.getSeekerData(isToken, isPrint, seekerData, image, data, videosData, introVideo, isEdit)}
        </Container>
    }

    getSeekerData = (isToken, isPrint, seekerData, image, data, videosData, introVideo, isEdit) => {
        return <div style={{ marginBottom: 60 }}>
            <div>
                <Grid.Col lg="12" sm="12" className="mb-4">
                    <Card className="card-post card-post--aside card-post--1">
                        {/* backgroundImage: `url(${Portfolio_bg})` */}
                        {!isPrint && <div id="profile" className="row" style={{ backgroundColor: '#4267b2', backgroundSize: 'cover', color: '#fff', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 10, margin: 0, backgroundRepeat: 'no-repeat' }}>
                            {!isEdit && !isPrint && <div><Link to="/update-profile"><Icon style={{ paddingTop: 1, fontSize: 22, position: 'absolute', right: 15, top: 30, cursor: 'pointer', color: 'white' }}>edit</Icon></Link></div>}
                            {!isToken && <div style={introVideo ? { fontWeight: 'bold', fontSize: 24 } : { fontWeight: 'bold', fontSize: 32, textAlign: 'center' }}>Score match to your job</div>}
                            {!isToken && <div style={introVideo ? { fontWeight: 'bold', fontSize: 28 } : { fontWeight: 'bold', fontSize: 36 }}>{seekerData.totalScore}</div>}
                            {introVideo && <div style={{ width: '80%', display: 'flex', justifyContent: 'center' }}><ReactPlayer url={introVideo} controls height={(window.screen.width / 4) > 250 ? (window.screen.width / 6) : 200} width={window.screen.width > 500 ? '60%' : '100%'} /></div>}
                            {/* <div style={{ fontWeight: 'bold', fontSize: 16 }}>{seekerData.name}</div> */}
                            <hr width='30%' color="#fff" />
                            <div>Interactive CV/Portfolio</div>
                        </div>}
                        <Card.Body>
                            <div className="row" style={{ marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div><img height={70} width={70} src={image} style={{ borderRadius: '50%', border: '1px solid #E5E2CF' }} /></div>
                                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#00af50' }}>Profile</div>
                                <div>I'm a {seekerData.profession ? seekerData.profession : 'Job Seeker'}</div>
                                <hr width='60%' />
                                <div id="#profile" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: window.screen.width > 500 ? '60%' : '100%' }}>
                                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontWeight: 'bold', color: '#00af50' }}>About me</div>
                                        <div>{seekerData.about}</div>
                                    </div>
                                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontWeight: 'bold', color: '#00af50' }}>Details</div>
                                        <div><span style={{ color: '#4267b2' }}>Name : </span> <span>{seekerData.name}</span></div>
                                        <div><span style={{ color: '#4267b2' }}>Age : </span> <span>{seekerData.age}</span></div>
                                        <div id="carrier" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}><span style={{ color: '#4267b2', marginRight: 5 }}>Location: </span> {!isPrint ? (seekerData.location &&
                                            <a href={seekerData.location} style={{ textDecoration: 'none' }} target="_blank"><img height={50} width={100} src={"demo/map.jpg"} /></a>) : <span>{seekerData.location}</span>}
                                        </div>
                                        <div disabled={true}><Form.Switch checked={this.props.completeData && this.props.completeData.data && this.props.completeData.data.army ? this.props.completeData.data.army : false} name="toggle" value="isMilitary" label="Security Cleared" disabled={true} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E2CF', marginRight: '-24px', marginLeft: '-24px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: 22, color: '#00af50' }}>Career History</div>
                                <hr width='60%' />
                                <div style={{ width: window.screen.width > 500 ? '60%' : '100%', color: '#00af50', textAlign: 'center' }}>Employment</div>
                                {seekerData.carrierData && seekerData.carrierData.map((data, index) => {
                                    return <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: window.screen.width > 500 ? '60%' : '80%', marginBottom: 20 }}>
                                        <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                                            <div>{data.companyName}</div>
                                            <div>{data.startDate ? this.getFormattedDate(data.startDate) : ''} - {data.endDate ? this.getFormattedDate(data.endDate) : ''}</div>
                                        </div>
                                        <div style={{ width: '5%' }}></div>
                                        <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                                            {data.description}
                                        </div>
                                        {!isPrint && <div style={{ width: '5%', display: 'flex', flexDirection: 'column' }}>
                                            <ReferencePopup refName={data.refName} refEmail={data.refEmail} refContact={data.refContact} message={data.message} onResendEmail={this.onResendEmail} isLoading={this.props.loading} />
                                        </div>}
                                    </div>
                                })}
                                <hr width='60%' />
                                <div id="skill" style={{ width: window.screen.width > 500 ? '60%' : '100%', color: '#00af50', marginBottom: 20, textAlign: 'center' }}>Education, Courses</div>
                                {seekerData.educationData && seekerData.educationData.map((data, index) => {
                                    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: window.screen.width > 500 ? '60%' : '100%', marginBottom: 20 }}>
                                        <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                                            <div>{data.instituteName}</div>
                                            <div>{data.startDate ? this.getFormattedDate(data.startDate) : ''} - {data.endDate ? this.getFormattedDate(data.endDate) : ''}</div>
                                        </div>
                                        <div style={{ width: '5%' }}></div>
                                        <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
                                            {data.description}
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className="row" style={{ flexDirection: 'column', marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: 22, color: '#00af50' }}>Skillset, Abilities</div>
                                <hr width='60%' />
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: window.screen.width > 500 ? '80%' : '100%' }}>
                                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ color: '#00af50', fontWeight: 'bold' }}>Hard Skills</div>

                                        {seekerData.skillsData && seekerData.skillsData['HardSkills'] && Object.keys(seekerData.skillsData['HardSkills']).map((skill, index) => {
                                            return (
                                                <div key={index} className="skillChips">
                                                    {skill.charAt(0).toUpperCase() + skill.slice(1) + ' : ' + seekerData.skillsData['HardSkills'][skill].reduce((a, b) => a + b)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ color: '#00af50', fontWeight: 'bold' }}>Soft Skills</div>
                                        {seekerData.skillsData && seekerData.skillsData['SoftSkills'] && Object.keys(seekerData.skillsData['SoftSkills']).map((skill, index) => {
                                            return (
                                                <div key={index} className="skillChips">
                                                    {skill.charAt(0).toUpperCase() + skill.slice(1) + ' : ' + seekerData.skillsData['SoftSkills'][skill].reduce((a, b) => a + b)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr width='60%' />
                                <div id="work" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: window.screen.width > 500 ? '60%' : '100%' }}>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ color: '#00af50', fontWeight: 'bold' }}>Languages</div>
                                        {seekerData.languageData && seekerData.languageData.map((data, index) => {
                                            return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><div key={index}>{data.language}</div><div className="skillChips">{data.selectedLangLevel && data.selectedLangLevel.label}</div></div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            {!isPrint && seekerData.files && (videosData || videosData.length) && <div className="row" style={{ paddingTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E2CF', marginRight: '-24px', marginLeft: '-24px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: 22, color: '#00af50' }}>Portfolio, Works, Projects</div>
                                <hr width='60%' />
                                <div style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'center' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: 14, color: '#00af50', margin: 15, cursor: 'pointer' }} onClick={() => this.onPortfolioCat('all')}><span style={this.state.all ? { borderBottom: '3px solid #00af50' } : {}}>All</span></div>
                                    <div style={{ fontWeight: 'bold', fontSize: 14, color: '#00af50', margin: 15, cursor: 'pointer' }} onClick={() => this.onPortfolioCat('images')}><span style={this.state.images ? { borderBottom: '3px solid #00af50' } : {}}>Images</span></div>
                                    <div style={{ fontWeight: 'bold', fontSize: 14, color: '#00af50', margin: 15, cursor: 'pointer' }} onClick={() => this.onPortfolioCat('videos')}><span style={this.state.videos ? { borderBottom: '3px solid #00af50' } : {}}>Videos</span></div>
                                </div>
                                {this.state.all ? ((!seekerData.files && (!videosData || !videosData.length)) ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 170, width: '100%' }}>No Data Found</div> : <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                                    {this.getImages(seekerData.files)}
                                    {videosData ? videosData.map((data, index) => {
                                        return <div style={{ width: '27%', marginLeft: 10, marginRight: 10, marginBottom: 10 }} key={index}><ReactPlayer url={data.video} controls width={'100%'} height={'80%'} /><div>
                                            <a href={data.video} target="_blank"><p className="seekerPortfolio card-text mb-0" style={{
                                                display: '-webkit-box',
                                                webkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100%',
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                padding: 5
                                            }} title={data.description ? data.description : data.video}>{data.description ? data.description : data.video}</p></a></div></div>
                                    }) : null}
                                </div>) : (<div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                                    {this.state.images && (seekerData.files ? this.getImages(seekerData.files) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 170, width: '100%' }}>No Images Found</div>)}
                                    {this.state.videos && (videosData && videosData.length ? videosData.map((data, index) => {
                                        return <div style={{ width: '27%', marginLeft: 10, marginRight: 10, marginBottom: 10 }} key={index}><ReactPlayer url={data.video} controls width={'100%'} height={'80%'} /><div>
                                            <a href={data.video} target="_blank"><p className="seekerPortfolio card-text mb-0" style={{
                                                display: '-webkit-box',
                                                webkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100%',
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                padding: 5
                                            }} title={data.description ? data.description : data.video}>{data.description ? data.description : data.video}</p></a></div></div>
                                    }) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 170, width: '100%' }}>No Videos Found</div>)}
                                </div>)}
                            </div>}
                            {!isPrint && !isToken && <div id="contact" className="row" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <div style={{ fontWeight: 'bold', fontSize: 22, color: '#00af50' }}>Contact Me</div>
                                <hr width='60%' />
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                    {/* <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> <Icon style={{ paddingTop: 1, fontSize: 22, color: '#4267b2' }}>mobile_screen_share</Icon><div>{seekerData.contact}</div></div> */}
                                    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Icon style={{ paddingTop: 1, fontSize: 22, color: '#4267b2' }}>perm_phone_msg</Icon><div>{seekerData.contact}</div></div>
                                    {this.props.seekerId && <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => this.onChatClick(this.props.completeData)}> <Icon style={{ paddingTop: 1, fontSize: 22, color: '#4267b2' }}>sms</Icon><div>Chat</div></div>}
                                    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Icon style={{ paddingTop: 1, fontSize: 22, color: '#4267b2' }}>email</Icon><div>{seekerData.email}</div></div>
                                </div>
                            </div>}
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </div>
            <Loader loader={this.props.loading} />
        </div >
    }

    onChatClick = (seekerDetail) => {
        const { data } = seekerDetail;

        let image = localStorage.getItem('userImage') && localStorage.getItem('userImage') !== 'undefined' ? localStorage.getItem('userImage') : "demo/faces/female/user.png"
        this.setState({ chatRecruiterImage: image, isChatOn: true, chatId: data._id, chatSeekerImage: data.image, clientName: data.name, chatStatus: data.status });
    }

    onClose = () => {
        this.setState({ chatRecruiterImage: null, isChatOn: false, chatId: null, chatSeekerImage: null, clientName: null, chatStatus: null });
    }

    onImageClick = (imagesSet, photoIndex) => {
        this.setState({ isOpen: true, photoIndex, imagesSet })
    }

    render() {
        const { isToken } = this.props;
        const { isChatOn, chatRecruiterImage, chatId, clientName, chatStatus, chatSeekerImage, isOpen, photoIndex, imagesSet } = this.state;
        if (!isToken || isToken === 'undefined') {
            return <SiteWrapper>
                {isOpen && (
                    <Lightbox
                        mainSrc={imagesSet[photoIndex].image}
                        nextSrc={imagesSet[(photoIndex + 1) % imagesSet.length].image}
                        prevSrc={imagesSet[(photoIndex + imagesSet.length - 1) % imagesSet.length].image}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + imagesSet.length - 1) % imagesSet.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % imagesSet.length,
                            })
                        }
                    />
                )}
                {isChatOn && <Chat chatId={chatId} clientName={clientName} onClose={this.onClose} chatStatus={chatStatus} chatSeekerImage={chatSeekerImage} chatRecruiterImage={chatRecruiterImage} />}
                {this.getData()}
            </SiteWrapper>
        }
        return (
            this.getData()
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    // forgetPasswordResponse: state.reducerMethod.forgetPasswordResponse,
    // error: state.reducerMethod.error
});

const mapDispatchToProps = {
    sendRecommendEmail: sendRecommendEmail,
    saveSeekerProfileSuccess: saveSeekerProfileSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfileView);