// @flow

import React from "react";

import {
  Container,
  Grid,
  Card,
  Button,
  Profile
} from "tabler-react";
import { connect } from 'react-redux';
import { updateProfileMethod, getSeekerProfile, getFeedData, onShare, onComment, onLike, onDislike, deleteComment, deletePost } from '../redux/Actions';
import Loader from '../Loader';
import EditProfile from './EditProfile';
import FeedData from '../Screens/FeedData';
import { getUserType } from '../common-methods';
import SiteWrapper from "../SiteWrapper.react";
import { authCheckToaster } from '../redux/AuthCheckToaster';
// import CalendarComp from '../Screens/Calender';
import ScheduleDatesModal from '../components/ScheduleDatesModal';
import ProfileBlock from '../components/ProfileBlock';
import AboutBlock from '../components/AboutBlock';
import QuestionAnswer from '../components/QuestionAnswer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import JobBoardApiModal from '../components/JobBoardApiModal';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  viewContent: {
    display: 'flex',
    cursor: 'pointer',
    color: '#4267b2'
  },
  text: {
    color: '#00af50',
    marginLeft: 2
  },
  textBlue: {
    color: '#4267b2',
    marginLeft: 2
  },
  content: {
    display: 'flex'
  }
}

class ProfilePage extends React.Component {

  state = { isUpdated: false }

  componentWillMount() {
    this.props.getSeekerProfile();
  }

  componentDidMount() {
    this.props.getFeedData();
  }

  onThumbnailChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let files = [];
      files.push({ name: file.name, preview: event.target.result });
      this.setState({
        files: files
      });
    };
  }

  onPicThumbnailChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.onProfileSave(event.target.result);
    };
  }

  onProfileSave = (image) => {
    let request = {
      "name": this.state.userData && this.state.userData.name ? this.state.userData.name : 'User',
      "image": image,
      "location": this.state.userData && this.state.userData.location ? this.state.userData.location : 'No Location Found',
    }
    if (authCheckToaster())
      this.props.updateProfileMethod(request);
  }

  onThumbnailRemove = (files) => {
    this.setState({ files });
  }

  onChangeMethod = (key, e) => {
    this.setState({ [key]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateProfileResponse && nextProps.updateProfileResponse !== this.props.updateProfileResponse && !nextProps.updateProfileResponse.error) {
      this.setState({ isUpdated: false })
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.seekerProfileData && nextProps.seekerProfileData !== this.props.seekerProfileData && !nextProps.seekerProfileData.error) {
      localStorage.setItem('userName', nextProps.seekerProfileData.data.name);
      localStorage.setItem('userImage', nextProps.seekerProfileData.data.image);
      this.setState({ userData: nextProps.seekerProfileData.data });
    }
    if (nextProps.shareFeedResponse && nextProps.shareFeedResponse !== this.props.shareFeedResponse && !nextProps.shareFeedResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.commentFeedResponse && nextProps.commentFeedResponse !== this.props.commentFeedResponse && !nextProps.commentFeedResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.likeResponse && nextProps.likeResponse !== this.props.likeResponse && !nextProps.likeResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.dislikeResponse && nextProps.dislikeResponse !== this.props.dislikeResponse && !nextProps.dislikeResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.deleteCommentResponse && nextProps.deleteCommentResponse !== this.props.deleteCommentResponse && !nextProps.deleteCommentResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.deletePostResponse && nextProps.deletePostResponse !== this.props.deletePostResponse && !nextProps.deletePostResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (!nextProps.myFeedData && nextProps.myFeedData !== this.props.myFeedData)
      this.props.getFeedData();
  }

  onSave = (request) => {
    if (authCheckToaster())
      this.props.updateProfileMethod(request);
  }

  onShare = (requestData, id) => {
    this.props.onShare(requestData, id);
  }

  onComment = (requestData, id) => {
    this.props.onComment(requestData, id);
  }

  render() {
    const { updateProfileResponse, seekerProfileData, loading, myFeedData, shareFeedResponse, scheduleDates } = this.props;
    const { userData, isUpdated, jobBoardAPi } = this.state;
    let screenSize = window.screen.availWidth;
    const userType = getUserType();
    return (
      <SiteWrapper>
        <div className="my-3 my-md-5">
          <Container>
            {jobBoardAPi && <JobBoardApiModal profile={userData ? userData : {}} isSeeker={userType !== 'recruiter'} onClose={() => this.setState({ jobBoardAPi: false })} />}
            <div cards={true}>
              <Grid.Col lg={12}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: (screenSize > 500 ? 'space-between' : 'center'), alignItems: 'center', overflow: 'scroll', flexWrap: 'wrap' }}>
                    <ScheduleDatesModal scheduleDates={scheduleDates} />
                    {/* <CalendarComp scheduleDates={scheduleDates} /> */}
                  </div>
                </Card>
              </Grid.Col>
            </div>
            <Grid.Row>
              <Grid.Col lg={4} sm={12}>
                <div style={{ paddingRight: '0.75rem', paddingLeft: '0.75rem' }}>
                  <Card>
                    {!isUpdated ? <ProfileBlock onPicThumbnailChange={this.onPicThumbnailChange} profile={userData ? userData : {}} isProfile={true} onEdit={() => this.setState({ isUpdated: true })} /> : <Card>
                      <Card.Header>
                        <Card.Title>Edit Profile</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <EditProfile onSave={this.onSave} UserAccountDetails={userData} onCancel={() => this.setState({ isUpdated: false })} />
                      </Card.Body>
                    </Card>}
                  </Card>
                  <Card>
                    <AboutBlock profile={userData ? userData : {}} isRecruiter={userType === 'recruiter'} onApiClick={() => this.setState({ jobBoardAPi: true })} />
                  </Card>
                  {userType !== 'recruiter' && <Card>
                    <div style={{ padding: 20 }}>
                      <div style={styles.container}>
                        <div style={styles.content}><QuestionAnswerIcon /><span style={styles.text}>Interview Q&A's</span></div>
                        <div style={styles.viewContent} onClick={() => this.setState({ isModalOpen: true })}><VisibilityIcon /><span style={styles.textBlue}>View</span></div>
                      </div>
                      <div style={{ paddingLeft: 20 }}>Read the most common interview questions and then add your own answers for reference prior to your interview</div>
                      {this.state.isModalOpen && <QuestionAnswer isModalOpen={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} />}
                    </div>
                  </Card>}
                </div>
              </Grid.Col>
              <Grid.Col lg={8} sm={12}>
                <div style={{ paddingRight: '0.75rem', paddingLeft: '0.75rem' }}>
                  <Card>
                    <Card.Body>
                      <FeedData deletePost={(postId) => this.props.deletePost(postId)} screenSize={screenSize} deleteComment={(commentId) => this.props.deleteComment(commentId)} onDislike={(feedId) => this.props.onDislike(feedId)} onLike={(feedId) => this.props.onLike(feedId)} onComment={this.onComment} feedData={myFeedData} shareFeedResponse={shareFeedResponse} loading={loading} isProfileView={true} onShare={this.onShare} />
                    </Card.Body>
                  </Card>
                </div>
              </Grid.Col>
            </Grid.Row>
            <Loader loader={this.props.loading} />
          </Container>
        </div>
      </SiteWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  profile: state.reducerMethod.profile,
  error: state.reducerMethod.error,
  updateProfileResponse: state.reducerMethod.updateProfileResponse,
  seekerProfileData: state.reducerMethod.seekerProfileData,
  myFeedData: state.reducerMethod.myFeedData,
  shareFeedResponse: state.reducerMethod.shareFeedResponse,
  commentFeedResponse: state.reducerMethod.commentFeedResponse,
  likeResponse: state.reducerMethod.likeResponse,
  dislikeResponse: state.reducerMethod.dislikeResponse,
  deleteCommentResponse: state.reducerMethod.deleteCommentResponse,
  deletePostResponse: state.reducerMethod.deletePostResponse,
  scheduleDates: state.reducerMethod.scheduleDates,
});

const mapDispatchToProps = {
  updateProfileMethod: updateProfileMethod,
  getSeekerProfile: getSeekerProfile,
  getFeedData: getFeedData,
  onShare: onShare,
  onComment: onComment,
  onLike: onLike,
  onDislike: onDislike,
  deleteComment: deleteComment,
  deletePost: deletePost
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
