/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Card,
    Alert,
    Button
} from "tabler-react";
import { deleteMedia, getChatId, getMediaList, mediaChatList } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
import { Link } from 'react-router-dom';
import Redirect from "react-router-dom/Redirect";
import SiteWrapper from "../SiteWrapper.react";
import { Chat } from './ChatScreen';
import { getUserType, getAccessToken, parseToekJwt, getUrlTextLink } from "../common-methods";
import { authCheckToaster } from '../redux/AuthCheckToaster';
import MediaChatHistory from '../components/MediaChatHistory';
import MediaModal from '../components/MediaViewModal';

let that;
class MediaMarketList extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const type = query.get('type');
        const isRecruiter = getUserType() === 'recruiter' ? true : false;
        this.state = { isRecruiter, mediaStateData: [], readIds: [], isAll: !type ? true : false, isCvHelp: type === 'cv' ? true : false, isCourse: type === 'course' ? true : false, isEvent: type === 'event' ? true : false, postId: null, isAlert: true, isJobAlert: true, chatStatus: false, chatSeekerImage: null, chatRecruiterImage: null };
        that = this;
    }
    componentWillMount() {
        this.props.getMediaList(this.state.isRecruiter);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mediaDeleteResponse && nextProps.mediaDeleteResponse !== this.props.mediaDeleteResponse && !nextProps.mediaDeleteResponse.error) {

            this.props.getMediaList(this.state.isRecruiter);
        }
        if (nextProps.mediaChatData && nextProps.mediaChatData !== this.props.mediaChatData && !nextProps.mediaChatData.error) {
            this.setState({ isListOpen: true, isMinimised: true });
        }

        if (nextProps.mediaListData && nextProps.mediaListData !== this.props.mediaListData) {
            const finalData = nextProps.mediaListData && nextProps.mediaListData.data ? nextProps.mediaListData.data : [];
            const event = finalData.filter(data => data.category === 'event');
            const course = finalData.filter(data => data.category === 'course');
            const cvHelp = finalData.filter(data => data.category === 'cv help');
            this.setState({ event, course, cvHelp, mediaStateData: finalData, finalData });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('mousedown', this.handleRelatedClickOutside);
    }

    setShareRef(node) {
        that.shareRef = node;
    }

    setRelatedShareRef(node) {
        that.relatedShareRef = node;
    }

    setConsoleRef(node) {
        that.consoleRef = node;
    }

    handleClickOutside = (event) => {
        if (that.shareRef && !that.shareRef.contains(event.target) && that.state.isShareShow)
            that.setState({ isShareShow: false });
        if (that.consoleRef && !that.consoleRef.contains(event.target) && that.state.isListOpen) {
            that.setState({ isListOpen: false, isMinimised: false, chatJobId: null });
        }
    }

    handleRelatedClickOutside = (event) => {
        if (that.relatedShareRef && !that.relatedShareRef.contains(event.target) && that.state.isRelatedShareShow)
            that.setState({ isRelatedShareShow: false });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mousedown', this.handleRelatedClickOutside);
    }

    onDelete = (id) => {
        var r = window.confirm("Are you sure , you want to delete this media!");
        if (r == true) {
            if (authCheckToaster())
                this.props.deleteMedia(id)
        }
    }

    dismiss = () => {
        this.setState({ isAlert: false });
    }

    dismissJob = () => {
        this.setState({ isJobAlert: false });
    }

    onShareCLick = (id) => {
        this.setState({ isShareShow: !this.state.isShareShow, index: id });
    }

    onRelatedShareCLick = (id) => {
        this.setState({ isRelatedShareShow: !this.state.isRelatedShareShow, relatedIndex: id });
    }

    applyJob = (id) => {
        this.props.applyJob(id);
    }

    onChat = (post) => {
        this.setState({
            isChatOn: true,
            chatId: post.user,
            clientName: post.clientName ? post.clientName : post.title,
            chatStatus: post.live,
            chatJobId: !this.state.isRecruiter ? post._id : null,
            seekerScore: !this.state.isRecruiter ? post.totalScore : null,
            chatSeekerImage: post.image ? post.image : (this.state.isRecruiter ? 'demo/faces/female/user.png' : null),
            chatRecruiterImage: post.image ? post.image : (this.state.isRecruiter ? null : 'demo/faces/female/user.png'),
            mediaType: post.category?post.category.charAt(0).toUpperCase() + post.category.slice(1):'Media'
        });
    }

    onClose = () => {
        this.setState({ isChatOn: false });
    }

    onCloseMatches = () => {
        this.setState({ isListOpen: false, chatJobId: null, isMinimised: false });
    }

    openConsole = (mediaId) => {
        this.setState({ chatJobId: mediaId }, () => this.props.mediaChatList(mediaId));
    }

    filterData = (txt) => {
        if (this.state.finalData) {
            const event = this.state.finalData.filter(data => {
                if (data.category === 'event' && ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt))) || !txt.length)) {
                    return data;
                }
                return;
            });
            const course = this.state.finalData.filter(data => {
                if (data.category === 'course' && ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt)) || !txt.length)) && data) {
                    return data;
                }
                return;
            });
            const cvHelp = this.state.finalData.filter(data => {
                if (data.category === 'cv help' && ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt)) || !txt.length)) && data) {
                    return data;
                }
                return;
            });
            const mediaStateData = this.state.finalData.filter(data => {
                if ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt))) || !txt.length) {
                    return data;
                }
                return;
            });

            this.setState({ event, course, cvHelp, mediaStateData });
        }
    }

    onSearch = (e) => {
        this.filterData(e.target.value.toLowerCase());
    }

    onReadLess = (id) => {
        const existId = this.state.readIds.findIndex(data => data === id);
        if (existId >= 0) {
            const readIds = this.state.readIds;
            readIds.splice(existId, 1)
            this.setState({ readIds });
        }
    }

    onReadMore = (id) => {
        const readIds = this.state.readIds;
        readIds.push(id);
        this.setState({ readIds });
    }

    render() {
        const { mediaStateData, isEvent, event, isCourse, course, isCvHelp, cvHelp } = this.state;
        const iconStyle = { paddingTop: 1, fontSize: 16, color: '#4267b2', cursor: 'pointer' };
        const noDataStyle = { paddingLeft: 15, paddingRight: 15 };
        let mediaFilterData = mediaStateData;
        const screenSize = window.screen.width;
        if (mediaStateData) {
            if (isEvent)
                mediaFilterData = event;
            if (isCourse)
                mediaFilterData = course;
            if (isCvHelp)
                mediaFilterData = cvHelp;
        }
        if (this.state.isDetail) {
            return <Redirect to={`/media-market/${this.state.isDetail}`} />
        }
        let userToken = getAccessToken();
        if (!userToken)
            return <Redirect to="/" />
        else {
            return (
                <SiteWrapper isMinimised={this.state.isMinimised}>
                    <Container fluid className="main-content-container px-4">
                        {this.state.mediaData && <MediaModal data={this.state.mediaData} onClose={() => this.setState({ mediaData: null })} />}
                        {this.state.isListOpen && <MediaChatHistory setConsoleRef={this.setConsoleRef} isMedia={true} postId={this.state.chatJobId} data={this.props.mediaChatData} onCloseMatches={this.onCloseMatches} />}
                        {/* Page Header */}
                        {this.state.isChatOn && <Chat mediaType={this.state.mediaType} isMedia={true} postId={this.state.chatJobId} chatId={this.state.chatId} clientName={this.state.clientName} chatStatus={this.state.chatStatus} chatSeekerImage={this.state.chatSeekerImage} chatRecruiterImage={this.state.chatRecruiterImage} onClose={this.onClose} />}
                        <div style={{ paddingBottom: 40 }}>
                            <div noGutters className="page-header">
                                <PageTitle sm="4" title="Media Market" className="text-sm-left" />
                            </div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: this.state.isRecruiter ? 'space-between' : 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input style={screenSize > 500 ? { width: '80%' } : { width: '100%', marginBottom: 20 }} type="text" className="form-control" placeholder="Search..." onChange={(e) => this.onSearch(e)} />
                                {this.state.isRecruiter && <Link style={{ textDecoration: 'none' }} to="/media-market"><Button icon="new" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} theme="accent" size="md">
                                    Create New
                          </Button>
                                </Link>}
                            </div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={this.state.isAll ? { padding: '0.75rem', borderBottom: '2px solid' } : { padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isCourse: false, isEvent: false, isAll: true, isCvHelp: false })}>All</span>
                                <span style={this.state.isCourse ? { color: '#00af50', padding: '0.75rem', borderBottom: '2px solid #00af50' } : { color: '#00af50', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isCourse: true, isEvent: false, isAll: false, isCvHelp: false })}>Course</span>
                                <span style={this.state.isEvent ? { color: '#4267b2', padding: '0.75rem', borderBottom: '2px solid #4267b2' } : { color: '#4267b2', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isCourse: false, isEvent: true, isAll: false, isCvHelp: false })}>Event</span>
                                <span style={this.state.isCvHelp ? { color: '#f1c40f', padding: '0.75rem', borderBottom: '2px solid #f1c40f' } : { color: '#f1c40f', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isCourse: false, isEvent: false, isAll: false, isCvHelp: true })}>CV Help</span>
                            </div>
                            {/* First div of Posts */}
                            <Grid.Row>
                                {mediaFilterData && mediaFilterData.length ? mediaFilterData.map((item, idx) => {
                                    const title = item.category === 'event' ? 'Event' : (item.category === 'course' ? 'Course' : 'CV Help')
                                    // const isReadMoreId = this.state.readIds.find(data => data === item._id);
                                    const isOwner = parseToekJwt() && parseToekJwt()._id === item.user;
                                    const tags = item.tags ? item.tags.toString() : '';
                                    const linkText = item.webLink ? getUrlTextLink(item.webLink) : '';
                                    return <Grid.Col lg="4" md="8" sm="12" className="mb-4" key={idx} style={{ opacity: 0.1 }} className={this.state.chatJobId && this.state.chatJobId !== item._id && "isBlur"}>
                                        <Card small className="card-post card-post--1">
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div className="p-3" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap' }} title={item._id}>Ref: {item._id}</div>
                                                    {isOwner && <Link to={`/media-market/${item._id}`} style={{ marginRight: 10 }}><Icon style={iconStyle} title="Edit">settings</Icon></Link>}
                                                </div>
                                                <h5 className="card-title" title={item.title} style={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: 0,
                                                    backgroundColor: 'gainsboro',
                                                    padding: 10
                                                }}>
                                                    <span>{title}</span> : <span>{item.title}</span>
                                                </h5>
                                                <div style={{ padding: '0 15px 0 15px' }}>
                                                    <h6 style={{ color: '#00af50' }}>Details:</h6>
                                                    <p className={"mediaInfo card-text mb-0"}
                                                        title={item.description}>
                                                        {item.description}
                                                    </p>
                                                    {/* <div><Link to={`/media-market/${item._id}`} style={{ textDecoration: 'none' }}>Read More...</Link></div> */}
                                                    {/* {isReadMoreId ?
                                                        <div onClick={() => this.onReadLess(item._id)}
                                                            style={{ cursor: 'pointer', textAlign: 'right', paddingRight: 15 }}>
                                                            Read Less...
                                                        </div>
                                                        :
                                                        <div onClick={() => this.onReadMore(item._id)}
                                                            style={{ cursor: 'pointer', color: '#4267b2', textAlign: 'right', paddingRight: 15 }}>
                                                            Read More...
                                                            </div>} */}
                                                </div>
                                                <h5 className="card-title" title={item.title} style={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: 0,
                                                    backgroundColor: 'gainsboro',
                                                    padding: 10
                                                }}>
                                                    <span>Cost</span> : <span>{item.cost}</span>
                                                </h5>
                                                {linkText && <h5 className="card-title" title={item.webLink} style={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: 0,
                                                    paddingLeft: 10,
                                                    paddingRight: 10
                                                }}>
                                                    <span>Location</span> : <span dangerouslySetInnerHTML={{ __html: linkText }}></span>
                                                </h5>}
                                                {tags && <h5 className="card-title" title={tags} style={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    display: 'inline-block',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: 0,
                                                    padding: 10
                                                }}>
                                                    <span>Tags</span> : <span style={{ color: '#00af50' }}>{tags}</span>
                                                </h5>}
                                            </div>
                                            <div style={{
                                                height: 50, width: 'auto', display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center', borderTop: '1px solid #e1e5eb'
                                            }}>
                                                <span><Icon style={iconStyle} title="Chat" onClick={() => isOwner ? this.openConsole(item._id) : this.onChat(item)}>chat</Icon></span>
                                                <span>
                                                    <Icon style={iconStyle} title="Share" onClick={() => this.onShareCLick(idx)}>share</Icon>
                                                    {this.state.isShareShow && idx === this.state.index && <div ref={this.setShareRef} style={{
                                                        // backgroundColor: '#F4F5F7',
                                                        position: 'absolute',
                                                        bottom: 0
                                                    }}>
                                                        <a class="dropdown-item" href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fketoadle.com%2F`} target="_blank">
                                                            <img src={require('../assets/facebookimg.png')} alt='Facebook' height='30px' width='30px' /></a>
                                                        <a class="dropdown-item" href={`https://twitter.com/intent/tweet
?url=https%3A%2F%2Fketoadle.com%2F
&text=${item.description}
&hashtags=${item.title}`} target="_blank">
                                                            <img src={require('../assets/twitterimg.png')} alt='Twitter' height='30px' width='30px' /></a>
                                                    </div>}
                                                </span>
                                                {/* <span><Icon style={iconStyle} title="Calender">today</Icon></span> */}
                                                {/* <span><Icon style={iconStyle} title="Notifications">notifications</Icon></span> */}
                                                <Icon style={iconStyle} title="View" onClick={() => this.setState({ mediaData: item })}>remove_red_eye</Icon>
                                                {isOwner && <span><Icon style={{ paddingTop: 1, fontSize: 16, color: 'red', cursor: 'pointer' }} title="Delete" onClick={() => this.onDelete(item._id)}>delete</Icon></span>}
                                            </div>
                                        </Card>
                                    </Grid.Col>
                                }) : !this.props.loading && <div style={noDataStyle}>No media found</div>}

                            </Grid.Row>
                        </div>
                        <Loader loader={this.props.loading} />
                    </Container>
                </SiteWrapper>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    jobPosts: state.reducerMethod.jobPosts,
    error: state.reducerMethod.error,
    mediaDeleteResponse: state.reducerMethod.mediaDeleteResponse,
    saveJobResponse: state.reducerMethod.saveJobResponse,
    applyJobResponse: state.reducerMethod.applyJobResponse,
    data: state.reducerMethod,
    appliedCandidateData: state.reducerMethod.appliedCandidateData,
    mediaChatData: state.reducerMethod.mediaChatData,
    mediaListData: state.reducerMethod.mediaListData
});

const mapDispatchToProps = {
    getMediaList: getMediaList,
    deleteMedia: deleteMedia,
    getChatId: getChatId,
    mediaChatList: mediaChatList
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaMarketList);
