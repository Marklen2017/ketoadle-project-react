/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Grid,
  Card,
  Alert,
  Form
} from "tabler-react";
import { getAppliedJobs, deleteJob, applyJob } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
import { Link, Redirect } from 'react-router-dom';
import SiteWrapper from "../SiteWrapper.react";
import { Chat } from './ChatScreen';
import { getAccessToken, getUserType } from "../common-methods";
let that;

class AppliedJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAlert: true, isJobAlert: true, chatStatus: false, chatSeekerImage: null, chatRecruiterImage: null };
    that = this;
  }
  componentWillMount() {
    this.props.getAppliedJobs();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  setShareRef(node) {
    that.shareRef = node;
  }

  handleClickOutside = (event) => {
    if (that.shareRef && !that.shareRef.contains(event.target) && that.state.isShareShow)
      that.setState({ isShareShow: false });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onDelete = (id) => {
    var r = window.confirm("Are you sure , you want to delete this job!");
    if (r == true)
      this.props.deleteJob(id)
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

  onChat = (post) => {
    this.setState({
      isChatOn: true,
      chatId: post.user,
      clientName: post.clientName ? post.clientName : post.title,
      chatStatus: post.live,
      chatSeekerImage: post.image ? post.image : null,
      chatRecruiterImage: post.image ? post.image : 'demo/faces/female/user.png'
    });
  }

  onClose = () => {
    this.setState({ isChatOn: false });
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
    const { appliedJobData, loading } = this.props;
    let isRecruiter = getUserType() === 'recruiter' ? true : false;
    const iconStyle = { paddingTop: 1, fontSize: 16, color: '#4267b2', cursor: 'pointer' };
    const noDataStyle = { paddingLeft: 15, paddingRight: 15 };
    let isSeeker = false;
    if (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).userType !== 'recruiter')
      isSeeker = true
      let userToken = getAccessToken();
      if (!userToken)
          return <Redirect to="/" />
    else {
      return (
        <SiteWrapper>
          <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            {this.state.isChatOn && <Chat chatId={this.state.chatId} clientName={this.state.clientName} chatStatus={this.state.chatStatus} chatSeekerImage={this.state.chatSeekerImage} chatRecruiterImage={this.state.chatRecruiterImage} onClose={this.onClose} />}
            <div style={{ paddingBottom: 40 }}>
              <Grid.Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Applied Jobs" subtitle="Jobs" className="text-sm-left" />
              </Grid.Row>
              {/* First Grid.Row of Posts */}
              <Grid.Row>
                {appliedJobData && appliedJobData.data && appliedJobData.data.length ? appliedJobData.data.map((post, idx) => {
                  let date = new Date(post.postDate);
                  let jobData = post;
                  const softScore = this.getSoftScore(jobData);
                  const hardScore = this.getHardScore(jobData);

                  let softMatches = post.softSkills.filter(obj => obj.matched === true);
                  let softUnmatched = post.softSkills.filter(obj => obj.matched !== true);
                  let hardMatches = post.hardSkills.filter(obj => obj.matched === true);
                  let hardUnmatched = post.hardSkills.filter(obj => obj.matched !== true);
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
                        {!isSeeker && <span><Link to={`/skills/${post._id}`}>
                          <Icon style={iconStyle} title="Edit">edit</Icon>
                        </Link>
                        </span>}
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
                      <Card.Body className="p-3">
                        <h5 className="card-title" title={post.title} style={{
                          width: '100%',
                          overflow: 'hidden',
                          display: 'inline-block',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: 0
                        }}>
                          <a className="text-fiord-blue">
                            {post.title}
                          </a>
                        </h5>
                        <p className="jobParagraph card-text mb-0" style={{
                          display: '-webkit-box',
                          webkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '100%'
                        }} title={post.description}>{post.description}</p><br />
                        <div style={{ padding: '0 15px 0 15px' }}><Form.Switch checked={post.army} name="toggle" value="isMilitary" label="This role requires the individual to have Security Clearance" disabled={true}/></div>
                      </Card.Body>
                      <span className="text-muted p-3" style={{ borderTop: '1px solid #e1e5eb' }}>Posted on: {(date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()}</span>
                      {isSeeker && <div>
                        <div style={{ marginLeft: 15 }}><span>Soft Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {softMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{data.skill}</span> })
                        }
                          {softUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{data.skill}</span> })}
                        </div>
                        <div style={{ marginLeft: 15 }}><span>Hard Skill <span style={{ color: '#4267b2', fontWeight: 'bold' }}>Matches</span>/<span style={{ color: '#FF0064' }}>Unmatched</span></span> : {hardMatches.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#4267b2' }} className="skillChips">{data.skill}</span> })
                        }
                          {
                            hardUnmatched.map((data, index) => { return <span key={index} style={{ color: 'white', backgroundColor: '#FF0064' }} className="skillChips">{data.skill}</span> })
                          }
                        </div>
                      </div>}
                    </Card>
                  </Grid.Col>
                }) : !loading && <div style={noDataStyle}>No jobs found</div>}

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
  appliedJobData: state.reducerMethod.appliedJobData,
  error: state.reducerMethod.error,
  jobDeleteResponse: state.reducerMethod.jobDeleteResponse,
  saveJobResponse: state.reducerMethod.saveJobResponse
});

const mapDispatchToProps = {
  getAppliedJobs: getAppliedJobs,
  deleteJob: deleteJob
};

export default connect(mapStateToProps, mapDispatchToProps)(AppliedJobs);
