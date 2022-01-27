// @flow

import * as React from "react";

import {
  Page,
  Grid,
  Card,
} from "tabler-react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDashboardData, getPublicFeedData, onShare, getChatUsers, getJobs, onComment, onLike, onDislike, deleteComment, deletePost, onShareFeed, reportPost } from './redux/Actions';
import FeedData from './Screens/FeedData';
import Loader from './Loader';
import { getUserType } from './common-methods';
import CompanyBlocks from './components/CompanyBlocks';
import SiteWrapper from "./SiteWrapper.react";
// import CalendarComp from './Screens/Calender';
import ProfileBlock from './components/ProfileBlock';
import AboutBlock from './components/AboutBlock';
import ScheduleDatesModal from './components/ScheduleDatesModal';
import QuestionAnswer from './components/QuestionAnswer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfiniteScroll from 'react-infinite-scroll-component';
import SeekerDashboardView from './components/SeekerDashboardView';
import SeekerProfileSection from './components/SeekerProfileSection';
import SeekerPortfolio from './components/SeekerPortfolio';
import JobBoardApiModal from './components/JobBoardApiModal';

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
    cursor: 'pointer'
  },
  text: {
    color: '#00af50',
    marginLeft: 2
  },
  content: {
    display: 'flex'
  }
}

class Home extends React.Component {

  state={isModalOpen:false,feedData:{data:[],error:false}};
  componentWillMount() {
    this.props.getPublicFeedData();
    this.props.getDashboardData(1);
    // this.props.getChatUsers();
  }

  onShare = (requestData, id) => {
    this.props.onShare(requestData, id);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.shareFeedResponse && nextProps.shareFeedResponse !== this.props.shareFeedResponse && !nextProps.shareFeedResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.shareFeedPostResponse && nextProps.shareFeedPostResponse !== this.props.shareFeedPostResponse && !nextProps.shareFeedPostResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.commentFeedResponse && nextProps.commentFeedResponse !== this.props.commentFeedResponse && !nextProps.commentFeedResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.likeResponse && nextProps.likeResponse !== this.props.likeResponse && !nextProps.likeResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.dislikeResponse && nextProps.dislikeResponse !== this.props.dislikeResponse && !nextProps.dislikeResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.deleteCommentResponse && nextProps.deleteCommentResponse !== this.props.deleteCommentResponse && !nextProps.deleteCommentResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    if (nextProps.deletePostResponse && nextProps.deletePostResponse !== this.props.deletePostResponse && !nextProps.deletePostResponse.error) {
      this.props.getPublicFeedData();
      this.props.getDashboardData(this.props.pageSize);
    }
    // if (nextProps.pageSize && nextProps.pageSize !== this.props.pageSize) {
    //   if (nextProps.pageSize > this.props.pageSize) {
    //     const feedData = this.state.feedData;
    //     feedData.data = feedData.data.concat(nextProps.feedData.data);
    //     feedData.error = nextProps.feedData.error;
    //     this.setState({ feedData });
    //   } else {
    //     this.setState({ feedData: nextProps.feedData });
    //   }
    // }
  }

  onComment = (requestData, id) => {
    this.props.onComment(requestData, id);
  }

  onFetchFeed=()=>{
    this.props.getPublicFeedData(this.props.pageSize+1);
  }

  onSubLabel1Click=(type)=>{
    this.setState({isLabelType:type});
  }

  onSubLabel2Click = () => {
   this.setState({isLabel2:true});
  }

  render() {
    let screenSize = window.screen.availWidth;
    let userToken = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).token;
    if (!userToken)
      return <Redirect to="/" />
    else if(this.state.isLabel2){
      return <Redirect to="/media-market" />
    }  
    else if(this.state.isLabelType){
      return <Redirect to={`/media-market-list?type=${this.state.isLabelType}`} />
    }  
    else {
      const { dashboardData,feedData, hasMoreData, shareFeedResponse, chatUsersPeoples, notifications, scheduleDates, profile } = this.props;
      // const { feedData } = this.state;
      const data = dashboardData && dashboardData.data ? dashboardData.data : {};
      const userType = getUserType();

      return (
        <SiteWrapper refreshFeed={this.props.getPublicFeedData}>
          <Page.Content>
            {this.state.jobBoardAPi && <JobBoardApiModal onClose={()=>this.setState({jobBoardAPi:false})}/>}
            <div cards={true}>
              <Grid.Col lg={12}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: (screenSize>500?'space-between':'center'), alignItems: 'center',overflow:'scroll',flexWrap:'wrap' }}>
                    <ScheduleDatesModal scheduleDates={scheduleDates} />
                    {/* <CalendarComp scheduleDates={scheduleDates} /> */}
                  </div>
                </Card>
              </Grid.Col>
            </div>
            <div cards={true}>
              <div cards={true} style={{ display: 'flex' }}>
                {screenSize > 500 && (userType === 'recruiter' ? <Grid.Col lg={2}>
                  <Card>
                    <ProfileBlock profile={profile && profile.data ? profile.data : {}} isRecruiter={true} />
                    <div className="dashboard-card">Company Events</div>
                    <CompanyBlocks faIcon={'fa fa-calendar'} count={data.jobAdvertDueToEnd} subLabel1={"Manage Events"} subLabel2={"Create Events"} onSubLabel1Click={()=>this.onSubLabel1Click('event')} onSubLabel2Click={this.onSubLabel2Click} />
                    <div className="dashboard-card">Company Courses</div>
                    <CompanyBlocks faIcon={'fa fa-graduation-cap'} count={data.jobAdvertEnded} subLabel1={"Manage Courses"} subLabel2={"Create Courses"} onSubLabel1Click={()=>this.onSubLabel1Click('course')} onSubLabel2Click={this.onSubLabel2Click} />
                    <div className="dashboard-card">CV Help</div>
                    <CompanyBlocks faIcon={'fa fa-bullhorn'} count={data.jobAdvertsDueToGoLive} subLabel1={"Manage CV Help"} subLabel2={"Create CV Help"} onSubLabel1Click={()=>this.onSubLabel1Click('cv')} onSubLabel2Click={this.onSubLabel2Click} />
                    {/* <div className="dashboard-card">Job Board</div>
                    <CompanyBlocks faIcon={'fa fa-address-book'} count={data.liveJobAdverts} subLabel1={"Acquire Job Board API"} onSubLabel1Click={()=>this.setState({jobBoardAPi:true})}/> */}
                  </Card>
                </Grid.Col> : <Grid.Col lg={2}>
                      {/* <ProfileBlock profile={profile && profile.data ? profile.data : {}} /> */}
                      <Card>
                    <div className="dashboard-card" style={{color:'grey'}}>CV & Personal</div>
                    <SeekerProfileSection profile={profile && profile.data ? profile.data : {}}/>
                    </Card>
                    {/* <SeekerDashboardView imgName={null} subLabel1={"Manage Events"} subLabel2={"Create Events"} jobPosts={this.props.jobPosts} isJobs={true} /> */}
                    <Card>
                      {/* <AboutBlock profile={profile && profile.data ? profile.data : {}} /> */}
                      <div className="dashboard-card" style={{color:'grey'}}>Media Portfolio</div>
                      <SeekerPortfolio profile={profile && profile.data ? profile.data : {}}/>
                    </Card>
                    {/* <Card>
                      <div style={{ padding: 20 }}>
                        <div style={styles.container}>
                          <div style={styles.content}><QuestionAnswerIcon /><span style={styles.text}>Interview Q&A's</span></div>
                          <div style={styles.viewContent} onClick={() => this.setState({ isModalOpen: true })}><VisibilityIcon /><span style={styles.text}>View</span></div>
                        </div>
                        <div style={{ paddingLeft: 20 }}>Read the most common interview questions and then add your own answers for reference prior to your interview</div>
                        {this.state.isModalOpen && <QuestionAnswer isModalOpen={this.state.isModalOpen} onClose={() => this.setState({ isModalOpen: false })} />}
                      </div>
                    </Card> */}
                  </Grid.Col>)}
                <Grid.Col lg={screenSize > 500 ? 8 : 12}>
                  {/* {feedData && feedData.data && <InfiniteScroll
                    dataLength={feedData.data.length}
                    next={this.onFetchFeed}
                    hasMore={true}
                    endMessage="You have reached to end"
                    pullDownToRefresh={false}
                  // loader={<Loader loader={this.props.loading} />}
                  > */}
                    <FeedData reportPost={this.props.reportPost} onShareFeed={(text, id) => this.props.onShareFeed({ text: text }, id)} deletePost={(postId) => this.props.deletePost(postId)} deleteComment={(commentId) => this.props.deleteComment(commentId)} onDislike={(feedId) => this.props.onDislike(feedId)} onLike={(feedId, request) => this.props.onLike(feedId, request)} onComment={this.onComment} scheduleDates={scheduleDates} feedData={feedData} onShare={this.onShare} shareFeedResponse={shareFeedResponse} loading={this.props.loading} screenSize={screenSize} />
                  {/* </InfiniteScroll>} */}
                </Grid.Col>
                {screenSize > 500 && <Grid.Col lg={2}>
                  {userType === 'recruiter' ? <Card>
                    <div className="dashboard-card">Live Adverts</div>
                    <CompanyBlocks count={data.liveJobAdverts} label={"Live Job Adverts"} />
                    <div className="dashboard-card">Adverts Due To Go Live</div>
                    <CompanyBlocks count={data.jobAdvertsDueToGoLive} label={"Job Adverts Due To Go Live"} />
                    <div className="dashboard-card">Adverts Due To End</div>
                    <CompanyBlocks count={data.jobAdvertDueToEnd} label={"Job Adverts Due To End"} />
                    <div className="dashboard-card">Adverts Ended</div>
                    <CompanyBlocks count={data.jobAdvertEnded} label={"Job Adverts Ended"} />
                    <div className="dashboard-card">3rd Party Clients</div>
                    <CompanyBlocks count={data.manualJobSeekerMatches} label={"Total 3rd Party Clients"} />
                    <div className="dashboard-card">Auto Job Matches</div>
                    <CompanyBlocks count={data.totalJobSeekerMatches} label={"Total Job Seeker Matches"} />
                    <div className="dashboard-card">Manual Job Matches</div>
                    <CompanyBlocks count={data.manualJobSeekerMatches} label={"Manual Job Seeker Matches"} />
                  </Card>:<Card>
                    <div className="dashboard-card" style={{color:'grey'}}>Job Score Matches</div>
                    <div style={{ textAlign: 'center', padding: 5, backgroundColor: '#F6F6F6' }}><Link to="/job-posts" style={{textDecoration:'none'}}>View All Jobs Matches</Link></div>
                    <SeekerDashboardView imgName={null} subLabel1={"Manage Events"} subLabel2={"Create Events"} jobPosts={this.props.jobPosts} isJobs={true} />
                  </Card>}
                </Grid.Col>}
              </div>
            </div>
            <Loader loader={this.props.loading} />
          </Page.Content>
        </SiteWrapper>
      );
    }
  }
}


const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  error: state.reducerMethod.error,
  dashboardData: state.reducerMethod.dashboardData,
  feedData: state.reducerMethod.feedData,
  shareFeedResponse: state.reducerMethod.shareFeedResponse,
  jobPosts: state.reducerMethod.jobPosts,
  scheduleDates: state.reducerMethod.scheduleDates,
  // chatUsersPeoples: state.reducerMethod.chatUsersPeoples,
  notifications: state.reducerMethod.notifications,
  commentFeedResponse: state.reducerMethod.commentFeedResponse,
  likeResponse: state.reducerMethod.likeResponse,
  dislikeResponse: state.reducerMethod.dislikeResponse,
  deleteCommentResponse: state.reducerMethod.deleteCommentResponse,
  deletePostResponse: state.reducerMethod.deletePostResponse,
  shareFeedPostResponse: state.reducerMethod.shareFeedPostResponse,
  profile: state.reducerMethod.seekerProfileData,
  hasMoreData: state.reducerMethod.hasMoreData,
  pageSize:state.reducerMethod.pageSize
});

const mapDispatchToProps = {
  getDashboardData: getDashboardData,
  onShare: onShare,
  getChatUsers: getChatUsers,
  getJobs: getJobs,
  onComment: onComment,
  onLike: onLike,
  onDislike: onDislike,
  deleteComment: deleteComment,
  deletePost: deletePost,
  onShareFeed: onShareFeed,
  reportPost: reportPost,
  getPublicFeedData: getPublicFeedData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
