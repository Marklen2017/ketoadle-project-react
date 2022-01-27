/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Grid,
  Card,
  Alert,
  Form,
  Button
} from "tabler-react";
import { getJobs, deleteJob, applyJob, getChatId, appliedCandidateList } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
import { Link } from 'react-router-dom';
import Redirect from "react-router-dom/Redirect";
import SiteWrapper from "../SiteWrapper.react";
import { Chat } from './ChatScreen';
import { getUserType, getAccessToken } from "../common-methods";
import NestedList from '../components/NestedList';
import { authCheckToaster } from '../redux/AuthCheckToaster';
import JobModal from './JobViewModal';

let that;
class Jobs extends React.Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const jobId = query.get('jobId');
    this.state = { isAll: true, isManual: false, isAuto: false, postId: jobId, isAlert: true, isJobAlert: true, chatStatus: false, chatSeekerImage: null, chatRecruiterImage: null };
    that = this;
  }
  componentWillMount() {
    this.props.getJobs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applyJobResponse && nextProps.applyJobResponse !== this.props.applyJobResponse)
      this.props.getJobs();

    if (nextProps.jobPosts && nextProps.jobPosts !== this.props.jobPosts) {
      const appliedData = nextProps.appliedJobData && nextProps.appliedJobData.data ? nextProps.appliedJobData.data : [];
      const finalData = nextProps.jobPosts.data.concat(appliedData);
      const applicantData = finalData.filter(data => data.manualApplicant.length && data);
      const matchesData = finalData.filter(data => data.autoApplicant.length && data);
      this.setState({ applicantData, matchesData, jobPostStateData: finalData, finalData });
    }

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('mousedown', this.handleRelatedClickOutside);
  }

  setShareRef(node) {
    that.shareRef = node;
  }

  setConsoleRef(node) {
    that.consoleRef = node;
  }

  setRelatedShareRef(node) {
    that.relatedShareRef = node;
  }

  handleClickOutside = (event) => {
    if (that.shareRef && !that.shareRef.contains(event.target) && that.state.isShareShow) {
      that.setState({ isShareShow: false });
    }
    if (that.consoleRef && !that.consoleRef.contains(event.target) && that.state.isListOpen) {
      that.setState({ isListOpen: false, isMinimised: false, postId: null });
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
    var r = window.confirm("Are you sure , you want to delete this job!");
    if (r == true) {
      if (authCheckToaster())
        this.props.deleteJob(id)
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
    let isRecruiter = getUserType() === 'recruiter' ? true : false;
    this.setState({
      isChatOn: true,
      chatId: post.user,
      clientName: post.clientName ? post.clientName : post.title,
      chatStatus: post.live,
      chatJobId: !isRecruiter ? post._id : null,
      seekerScore: !isRecruiter ? post.totalScore : null,
      chatSeekerImage: post.image ? post.image : (isRecruiter ? 'demo/faces/female/user.png' : null),
      chatRecruiterImage: post.image ? post.image : (isRecruiter ? null : 'demo/faces/female/user.png')
    });
  }

  onClose = () => {
    this.setState({ isChatOn: false });
  }

  onCloseMatches = () => {
    this.setState({ isListOpen: false, isMinimised: false, postId: null });
  }

  openConsole = (jobId) => {
    this.setState({ isListOpen: true, isMinimised: true, postId: jobId }, () => this.props.appliedCandidateList(jobId));
  }

  filterData = (txt) => {
    if (this.state.finalData) {
      const applicantData = this.state.finalData.filter(data => {
        if (data.manualApplicant.length && ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt))) || !txt.length)) {
          return data;
        }
        return;
      });
      const matchesData = this.state.finalData.filter(data => {
        if (data.autoApplicant.length && ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt)) || !txt.length)) && data) {
          return data;
        }
        return;
      });
      const jobPostStateData = this.state.finalData.filter(data => {
        if ((data.title && data.title.toLowerCase().includes(txt)) || (data.description && data.description.toLowerCase().includes(txt) || (data._id && data._id.toLowerCase().includes(txt))) || !txt.length) {
          return data;
        }
        return;
      });

      this.setState({ applicantData, matchesData, jobPostStateData });
    }
  }

  onSearch = (e) => {
    this.filterData(e.target.value.toLowerCase());
    // if (e.target.value && e.target.value.length > 2) {
    // const value = e.target.value;
    // const that = this;
    // setTimeout(function () {
    //   that.filterData(value.toLowerCase())
    // }, 1000);
    // }
  }

  getSoftScore = (jobData) => {
    let softScore = 0;
    jobData.softSkills.forEach(data => {
      const keys = Object.keys(data);
      if (keys[0] && data[keys[0]] && !data.score) {
        softScore = softScore + JSON.parse(data[keys[0]]).reduce((a, b) => a + b);
      }
    });
    return softScore
  }

  getHardScore = (jobData) => {
    let hardScore = 0;
    jobData.hardSkills.forEach(data => {
      const keys = Object.keys(data);
      if (keys[0] && data[keys[0]] && !data.score) {
        hardScore = hardScore + JSON.parse(data[keys[0]]).reduce((a, b) => a + b);
      }
    });
    return hardScore;
  }

  render() {
    const { jobPosts, loading, appliedCandidateData } = this.props;
    let isRecruiter = getUserType() === 'recruiter' ? true : false;
    const iconStyle = { paddingTop: 1, fontSize: 16, color: '#4267b2', cursor: 'pointer' };
    const applyJobStyle = { paddingTop: 1, fontSize: 16, color: 'orange', cursor: 'pointer' };
    const noDataStyle = { paddingLeft: 15, paddingRight: 15 };
    const jobFilterData = this.state.jobPostStateData ? (this.state.isAll ? this.state.jobPostStateData : (this.state.isManual ? this.state.applicantData : this.state.matchesData)) : [];
    let isSeeker = false;
    const screenSize = window.screen.width;
    if (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).userType !== 'recruiter')
      isSeeker = true

    if (this.state.isDetail) {
      return <Redirect to={`/job-detail/${this.state.isDetail}`} />
    }
    let userToken = getAccessToken();
    if (!userToken)
      return <Redirect to="/" />
    else {
      return (
        <SiteWrapper isMinimised={this.state.isMinimised}>
          <Container fluid className="main-content-container px-4">
            {this.state.isOpenJobModalData && <JobModal data={this.state.isOpenJobModalData} onClose={() => this.setState({ isOpenJobModalData: null })} />}
            {!isSeeker && this.state.isListOpen && <NestedList setConsoleRef={this.setConsoleRef} postId={this.state.postId} data={appliedCandidateData} onCloseMatches={this.onCloseMatches} />}
            {/* Page Header */}
            {this.state.isChatOn && <Chat seekerScore={this.state.seekerScore} postId={this.state.chatJobId} chatId={this.state.chatId} clientName={this.state.clientName} chatStatus={this.state.chatStatus} chatSeekerImage={this.state.chatSeekerImage} chatRecruiterImage={this.state.chatRecruiterImage} onClose={this.onClose} />}
            <div style={{ paddingBottom: 40 }}>
              <div noGutters className="page-header">
                <PageTitle sm="4" title="Your Job Dashboard" className="text-sm-left" />
              </div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={this.state.isAll ? { color: '#f1c40f', padding: '0.75rem', borderBottom: '2px solid #f1c40f' } : { color: '#f1c40f', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isManual: false, isAuto: false, isAll: true })}>All</span>
                <span style={this.state.isAuto ? { color: '#00af50', padding: '0.75rem', borderBottom: '2px solid #00af50' } : { color: '#00af50', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isManual: false, isAuto: true, isAll: false })}>Matches</span>
                <span style={this.state.isManual ? { color: '#4267b2', padding: '0.75rem', borderBottom: '2px solid #4267b2' } : { color: '#4267b2', padding: '0.75rem', cursor: 'pointer' }} onClick={() => this.setState({ isManual: true, isAuto: false, isAll: false })}>Applications</span>
                {/* <span className="postInput" style={{ width: '70%' }}> */}
                {/* <span style={{ color: '#EAEAEA' }}>Search ...</span> */}
                {/* <Icon style={{ color: '#4267b2', marginRight: 5 }}>search</Icon> */}
                <input style={screenSize > 500 ? { width: '70%' } : { width: '100%', marginTop: 20 }} type="text" className="form-control" placeholder="Search..." onChange={(e) => this.onSearch(e)} />
                {/* </span> */}
                {/* <input type="text" className="form-control" onChange={(e)=>this.onSearch(e)} /> */}
              </div>
              {/* First div of Posts */}
              {!isSeeker ? <Grid.Row>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', padding: '5px 0 5px 0' }}>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>Reference</div>
                  <div style={{ width: '5%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>Score</div>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>Title</div>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>Details</div>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>3rd Party</div>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>Clearance</div>
                  <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', backgroundColor: '#00af50', color: '#fff', marginLeft: 5 }}>Auto Matches</div>
                  <div style={{ width: '14%', padding: '5px 10px 5px 10px', textAlign: 'center', backgroundColor: '#4267b2', color: '#fff', marginLeft: 5 }}>Manual Applicants</div>
                  <div style={{ width: '9%', padding: '5px 10px 5px 10px', textAlign: 'center', backgroundColor: '#000', color: '#fff', marginLeft: 5 }}>Edit</div>
                  <div style={{ width: '9%', padding: '5px 10px 5px 10px', textAlign: 'center', backgroundColor: '#f1c40f', color: '#fff', marginLeft: 5 }}>Console</div>
                </div>
                {jobFilterData.length ? jobFilterData.map((post, idx) => {
                  let jobData = post;
                  const softScore = this.getSoftScore(jobData);
                  const hardScore = this.getHardScore(jobData);

                  return <div style={{ width: '100%', margin: '10px 0 10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'black', width: 'max-content' }}>
                      <div style={{ backgroundColor: 'white', margin: '2px 5px 2px 5px', padding: 5 }} onClick={() => this.setState({ postId: post._id })}>
                        <Link to={`/shortlisted/${post._id}`}><Icon style={iconStyle} title="Shortlisted Candidates">grade</Icon></Link>
                      </div>
                      <div style={{ backgroundColor: 'white', margin: '2px 5px 2px 5px', padding: 5 }}>
                        <Icon style={iconStyle} title="View" onClick={() => this.setState({ isOpenJobModalData: post })}>remove_red_eye</Icon>
                      </div>
                      <div style={{ backgroundColor: 'white', margin: '2px 5px 2px 5px', padding: 5 }}>
                        <Icon style={{ paddingTop: 1, fontSize: 16, color: 'red', cursor: 'pointer' }} title="Delete" onClick={() => this.onDelete(post._id)}>delete</Icon>
                      </div>
                      <div style={{ backgroundColor: 'white', margin: '2px 5px 2px 5px', padding: 5 }}>
                        <Icon style={iconStyle} title="Share" onClick={() => this.onShareCLick(idx)}>share</Icon>
                        {this.state.isShareShow && idx === this.state.index && <div ref={this.setShareRef} style={{
                          // backgroundColor: '#F4F5F7',
                          position: 'absolute'
                        }}>
                          <a class="dropdown-item" href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fketoadle.com%2F`} target="_blank">
                            <img src={require('../assets/facebookimg.png')} alt='Facebook' height='30px' width='30px' /></a>
                          <a class="dropdown-item" href={`https://twitter.com/intent/tweet
?url=https%3A%2F%2Fketoadle.com%2F
&text=${post.description}
&hashtags=${post.title}`} target="_blank">
                            <img src={require('../assets/twitterimg.png')} alt='Twitter' height='30px' width='30px' /></a>
                        </div>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', padding: '5px 0 5px 0' }}>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={post._id}>{post._id}</div>
                      <div style={{ width: '5%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>{hardScore + softScore}</div>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</div>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.description}</div>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>3rd Party</div>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', borderRight: '1px solid' }}>{post.army ? 'Yes' : 'None'}</div>
                      <div style={{ width: '10%', padding: '5px 10px 5px 10px', textAlign: 'center', marginLeft: 5 }}>{post.autoApplicant ? post.autoApplicant.length : 0}</div>
                      <div style={{ width: '14%', padding: '5px 10px 5px 10px', textAlign: 'center', marginLeft: 5 }}>{post.manualApplicant ? post.manualApplicant.length : 0}</div>
                      <div style={{ width: '9%', padding: '5px 10px 5px 10px', textAlign: 'center', marginLeft: 5 }}>
                        <Link to={`/job/${post._id}`}>
                          <Icon style={iconStyle} title="Edit">edit</Icon>
                        </Link>
                      </div>
                      <div style={{ width: '9%', padding: '5px 10px 5px 10px', textAlign: 'center', marginLeft: 5 }} onClick={() => this.openConsole(post._id)}>
                        <Icon style={{ paddingTop: 1, fontSize: 16, cursor: 'pointer', color: '#f1c40f' }} title="console" >link</Icon>
                      </div>
                    </div>
                  </div>
                }
                ) : !loading && <div style={noDataStyle}>No jobs found</div>}
              </Grid.Row> :
                <Grid.Row>

                  {jobFilterData.length ? jobFilterData.map((post, idx) => {
                    let jobData = post;
                    const softScore = this.getSoftScore(jobData);
                    const hardScore = this.getHardScore(jobData);

                    let softMatches = post.softSkills && post.softSkills.filter(obj => obj.matched === true);
                    let softUnmatched = post.softSkills && post.softSkills.filter(obj => obj.matched !== true);
                    let hardMatches = post.hardSkills && post.hardSkills.filter(obj => obj.matched === true);
                    let hardUnmatched = post.hardSkills && post.hardSkills.filter(obj => obj.matched !== true);
                    return <Grid.Col lg="4" md="8" sm="12" className="mb-4" key={idx} style={{ opacity: 0.1 }} className={this.state.postId && this.state.postId !== post._id && "isBlur"}>
                      <Card small className="card-post card-post--1">
                        <div style={{
                          height: 50, width: 'auto', display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center', borderBottom: '1px solid #e1e5eb'
                        }}>
                          {!isRecruiter && <span><Icon style={iconStyle} title="Chat" onClick={() => this.onChat(post)}>chat</Icon></span>}
                          {!isSeeker && <span onClick={() => this.setState({ postId: post._id })}><Link to={`/shortlisted/${post._id}`}><Icon style={iconStyle} title="Shortlisted Candidates">grade</Icon></Link></span>}
                          {/* <span><Icon style={iconStyle} title="Calender">today</Icon></span> */}
                          {/* <span><Icon style={iconStyle} title="Notifications">notifications</Icon></span> */}
                          <Icon style={iconStyle} title="View" onClick={() => this.setState({ isOpenJobModalData: post })}>remove_red_eye</Icon>
                          {!isSeeker && <span><Icon style={{ paddingTop: 1, fontSize: 16, color: 'red', cursor: 'pointer' }} title="Delete" onClick={() => this.onDelete(post._id)}>delete</Icon></span>}
                          <span>
                            <Icon style={iconStyle} title="Share" onClick={() => this.onShareCLick(idx)}>share</Icon>
                            {this.state.isShareShow && idx === this.state.index && <div ref={this.setShareRef} style={{
                              // backgroundColor: '#F4F5F7',
                              position: 'absolute',
                              top: 50,
                              right: 0
                            }}>
                              <a class="dropdown-item" href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fketoadle.com%2F`} target="_blank">
                                <img src={require('../assets/facebookimg.png')} alt='Facebook' height='30px' width='30px' /></a>
                              <a class="dropdown-item" href={`https://twitter.com/intent/tweet
?url=https%3A%2F%2Fketoadle.com%2F
&text=${post.description}
&hashtags=${post.title}`} target="_blank">
                                <img src={require('../assets/twitterimg.png')} alt='Twitter' height='30px' width='30px' /></a>
                            </div>}
                          </span>
                        </div>
                        <div>
                          <div className="p-3" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap' }} title={post._id}>Job Reference : {post._id}</div>
                          <div style={{
                            width: '100%', height: 60, display: 'flex', backgroundColor: !isSeeker ? '#aaaaaa' : "#4267b2",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center', fontWeight: 'bold', color: '#fff'
                          }}><span>Job Score</span><span>{hardScore + softScore}</span></div>
                          {!isSeeker && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontWeight: 'bold', color: '#fff' }}>
                            <span style={{
                              width: '49%', height: 60, backgroundColor: '#00af50', display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}><span>Auto Matches</span><span>{post.autoApplicant ? post.autoApplicant.length : 0}</span></span>
                            <span style={{
                              width: '49%', height: 60, backgroundColor: '#4267b2', display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}><span>Job Applicants</span><span>{post.manualApplicant ? post.manualApplicant.length : 0}</span></span>
                          </div>}
                          <h5 className="card-title" title={post.title} style={{
                            width: '100%',
                            overflow: 'hidden',
                            display: 'inline-block',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginBottom: 0,
                            backgroundColor: 'gainsboro',
                            padding: 10,
                            cursor: 'pointer'
                          }} onClick={() => this.setState({ isOpenJobModalData: post })}>
                            <a className="text-fiord-blue">
                              Job: {post.title}
                            </a>
                          </h5>
                          <div style={{ padding: '0 15px 0 15px' }}>
                            <h6 style={{ color: '#00af50' }}>Details:</h6>
                            <p className="jobParagraph card-text mb-0" style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%',
                              whiteSpace: 'nowrap'
                            }} title={post.description}>{post.description}</p>
                          </div>
                          <div style={{ padding: '0 15px 0 15px' }}><Form.Switch checked={post.army} name="toggle" value="isMilitary" label="This role requires the individual to have Security Clearance" disabled={true} /></div>
                          {!isSeeker && <div style={{ margin: '5px 0 5px 0', display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <Link to={`/job/${post._id}`}><Button icon="edit" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} theme="accent" size="md">
                              Edit Job Advert
                          </Button>
                            </Link>
                            <Button icon="link" color="warning" theme="accent" size="md" onClick={() => this.openConsole(post._id)}>
                              Open Console
          </Button>
                          </div>}
                          {/* <span className="text-muted p-3" style={{ borderTop: '1px solid #e1e5eb', display: 'flex' }}>Posted on: {(date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()}</span> */}
                          {isSeeker && <div>
                            <div style={{ marginLeft: 15 }}><span>Soft Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {softMatches.toString() && softMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                            }
                              {softUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })}
                            </div>
                            <div style={{ marginLeft: 15 }}><span>Hard Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {hardMatches.toString() && hardMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                            }
                              {
                                hardUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                              }
                            </div>
                          </div>}
                        </div>
                      </Card>
                    </Grid.Col>
                  }) : !loading && <div style={noDataStyle}>No jobs found</div>}

                </Grid.Row>}

              {
                isSeeker && this.state.isAll && <div>
                  <div noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Related Job Posts" className="text-sm-left" />
                  </div>

                  {/* First div of Posts */}
                  <div>
                    {jobPosts && jobPosts.otherJobs && jobPosts.otherJobs.length ? jobPosts.otherJobs.map((post, idx) => {
                      let date = new Date(post.postDate);
                      let jobData = post;
                      const softScore = this.getSoftScore(jobData);
                      const hardScore = this.getHardScore(jobData);

                      let softMatches = post.softSkills && post.softSkills.filter(obj => obj.matched === true);
                      let softUnmatched = post.softSkills && post.softSkills.filter(obj => obj.matched !== true);
                      let hardMatches = post.hardSkills && post.hardSkills.filter(obj => obj.matched === true);
                      let hardUnmatched = post.hardSkills && post.hardSkills.filter(obj => obj.matched !== true);
                      return <Grid.Col lg="4" md="8" sm="12" className="mb-4" key={idx}>
                        <Card small className="card-post card-post--1">
                          <div style={{
                            height: 50, width: 'auto', display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center', borderBottom: '1px solid #e1e5eb'
                          }}>
                            {!isRecruiter && <span><Icon style={iconStyle} title="Chat" onClick={() => this.onChat(post)}>chat</Icon></span>}
                            <span><Icon style={iconStyle} title="Shortlisted Candidates">grade</Icon></span>
                            <span><Icon style={iconStyle} title="Calender">today</Icon></span>
                            <span><Icon style={iconStyle} title="Notifications">notifications</Icon></span>
                            {!isSeeker && <span><Link to={`/job/${post._id}`}>
                              <Icon style={iconStyle} title="Edit">edit</Icon>
                            </Link>
                            </span>}
                            {!isSeeker && <span><Icon style={{ paddingTop: 1, fontSize: 16, color: 'red', cursor: 'pointer' }} title="Delete" onClick={() => this.onDelete(post._id)}>delete</Icon></span>}
                            <span><Icon style={applyJobStyle} title="Apply job" onClick={() => this.applyJob(post._id)}>exit_to_app</Icon></span>
                            <span>
                              <Icon style={iconStyle} title="Share" onClick={() => this.onRelatedShareCLick(idx)}>share</Icon>
                              {this.state.isRelatedShareShow && idx === this.state.relatedIndex && <div ref={this.setRelatedShareRef} style={{
                                // backgroundColor: '#F4F5F7',
                                position: 'absolute',
                                top: 50,
                                right: 0
                              }}>
                                <a class="dropdown-item" href={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Fketoadle.com%2F`} target="_blank">
                                  <img src={require('../assets/facebookimg.png')} alt='Facebook' height='30px' width='30px' /></a>
                                <a class="dropdown-item" href={`https://twitter.com/intent/tweet
?url=https%3A%2F%2Fketoadle.com%2F
&text=${post.description}
&hashtags=${post.title}`} target="_blank">
                                  <img src={require('../assets/twitterimg.png')} alt='Twitter' height='30px' width='30px' /></a>
                              </div>}
                            </span>
                          </div>
                          <div className="p-3">Job Reference : {post._id}</div>
                          <div style={{
                            width: '100%', height: 60, display: 'flex', backgroundColor: !isSeeker ? '#aaaaaa' : "#4267b2",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center', fontWeight: 'bold', color: '#fff'
                          }}><span>Job Score</span><span>{hardScore + softScore}</span></div>
                          {!isSeeker && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontWeight: 'bold', color: '#fff' }}>
                            <span style={{
                              width: '49%', height: 60, backgroundColor: '#00af50', display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}><span>Auto Matches</span><span>{post.autoApplicant ? post.autoApplicant.length : 0}</span></span>
                            <span style={{
                              width: '49%', height: 60, backgroundColor: '#4267b2', display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}><span>Job Applicants</span><span>{post.manualApplicant ? post.manualApplicant.length : 0}</span></span>
                          </div>}

                          <h5 className="card-title" title={post.title} style={{
                            width: '100%',
                            overflow: 'hidden',
                            display: 'inline-block',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginBottom: 0,
                            backgroundColor: 'gainsboro',
                            padding: 10,
                            cursor: 'pointer'
                          }} onClick={() => this.setState({ isOpenJobModalData: post })}>
                            <a className="text-fiord-blue">
                              Job: {post.title}
                            </a>
                          </h5>
                          <div style={{ padding: '0 15px 0 15px' }}>
                            <h6 style={{ color: '#00af50' }}>Details:</h6>
                            <p className="jobParagraph card-text mb-0" style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%',
                              whiteSpace: 'nowrap'
                            }} title={post.description}>{post.description}</p>
                          </div>
                          <div style={{ padding: '0 15px 0 15px' }}><Form.Switch checked={post.army} name="toggle" value="isMilitary" label="This role requires the individual to have Security Clearance" disabled={true} /></div>
                          {!isSeeker && <div style={{ margin: '5px 0 5px 0', display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
                            <Link to={`/job/${post._id}`}><Button icon="edit" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} theme="accent" size="md">
                              Edit Job Advert
                          </Button>
                            </Link>
                            <Button icon="link" color="warning" theme="accent" size="md" onClick={() => this.openConsole(post._id)}>
                              Open Console
          </Button>
                          </div>}
                          <span className="text-muted p-3" style={{ borderTop: '1px solid #e1e5eb' }}>Posted on: {(date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()}</span>
                          {isSeeker && <div>
                            <div style={{ marginLeft: 15 }}><span>Soft Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {softMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                            }
                              {softUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })}
                            </div>
                            <div style={{ marginLeft: 15 }}><span>Hard Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {hardMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                            }
                              {
                                hardUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{Object.keys(data) && Object.keys(data)[0]}</span> })
                              }
                            </div>
                          </div>}
                        </Card>
                      </Grid.Col>
                    }) : !loading && <div style={noDataStyle}>No Related jobs found</div>}

                  </div>
                </div>
              }
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
  jobDeleteResponse: state.reducerMethod.jobDeleteResponse,
  saveJobResponse: state.reducerMethod.saveJobResponse,
  applyJobResponse: state.reducerMethod.applyJobResponse,
  data: state.reducerMethod,
  appliedCandidateData: state.reducerMethod.appliedCandidateData,
  appliedJobData: state.reducerMethod.appliedJobData,
});

const mapDispatchToProps = {
  getJobs: getJobs,
  deleteJob: deleteJob,
  applyJob: applyJob,
  getChatId: getChatId,
  appliedCandidateList: appliedCandidateList
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
