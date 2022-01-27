import * as React from "react";
import { logOutMethod, deactivateAccount, deleteAccount, getNotifications, getChatUsers } from './redux/Actions';
import { connect } from 'react-redux';
import { getUserType, getAccessToken, getUserData } from './common-methods';
import SiteHeaderFooter from './SiteHeaderFooter';
import { Chat } from './Screens/ChatScreen';
import ChatUsersList from './components/ChatUsersList';
import { BASE_URL } from './redux/Constants';
import axios from 'axios';
import Toaster from './redux/Toaster';

class SiteWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jobId: null, notifications: props.notifications ? props.notifications : [], isChatShow: false, isMinimised: props.isMinimised ? props.isMinimised : false }
  }

  logout = (e) => {
    this.props.logOutMethod();
  }

  componentWillMount() {
    this.props.getNotifications();
    if (!this.props.chatUsersPeoples)
      this.props.getChatUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications && nextProps.notifications !== this.props.notifications) {
      this.setState({ notifications: nextProps.notifications });
    }
    if (nextProps.isMinimised !== this.props.isMinimised) {
      this.setState({ isMinimised: nextProps.isMinimised });
    }
  }

  onNotificationClick = (post) => {
    let jobId = null;
    if (post.jobId) {
      jobId = post.jobId;
    }
    this.setState({ jobId, type: post.type, chatId: post.senderId, clientName: post.senderName, chatStatus: post.live, isChatOn: true, notificationId: post._id, postId: post.jobId })
    const userType = getUserType();

    if (userType === 'recruiter') {
      this.setState({ chatSeekerImage: post.image, chatRecruiterImage: null });
    }
    else {
      this.setState({ chatSeekerImage: null, chatRecruiterImage: post.image })
    }
  }

  onClose = () => {
    this.setState({ isChatOn: false })
  }

  getNotifications = () => {
    this.setState({ notificationId: null }, () => this.props.getNotifications());
  }

  onChatClick = () => {
    this.setState({ isChatShow: !this.state.isChatShow })
  }

  onRemoveConnection = async (id) => {
      axios
        .delete(`${BASE_URL}api/friend/removeFriend/${id}`, {
          headers: {
            token: getAccessToken()
          }
        })
        .then((res) => {
          if (res.error)
            Toaster(res.error.message, 'error');
          else {
            Toaster(`Connection removed Successfully`, 'success');
            this.props.getChatUsers();
            this.props.refreshFeed && this.props.refreshFeed();
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
  }

  render() {
    let userValue = getUserType();
    const isChild = getUserData();
    const navBarItems = userValue === 'recruiter' ? [
      !isChild.parent && {
        value: "Manage Team",
        to: "/manage-team",
        icon: "group"
      },
      {
        value: "Manage Job Advert",
        to: "/job-posts",
        icon: "settings_applications"
      },
      {
        value: "Create Job Advert",
        to: "/job",
        icon: "assignment_ind"
      },
      {
        value: "Notifications",
        to: "",
        icon: "notifications"
      },
      {
        value: "Live Feed",
        to: "/home",
        icon: "public"
      },
      {
        value: "Media Market",
        to: "/media-market-list",
        icon: "store"
      },
    ] : [
        {
          value: "Live Feed",
          to: "/home",
          icon: "public"
        },
        {
          value: "My Jobs",
          to: "/job-posts",
          icon: "settings_applications"
        },
        {
          value:  window.screen.availWidth>500?"My CV & Portfolio":"My CV",
          to: "/seeker-detail",
          icon: "assignment_ind"
        },
        // {
        //   value: "Applied Jobs",
        //   to: "/applied-jobs",
        //   icon: "autorenew"
        // },
        {
          value: "Notifications",
          to: "",
          icon: "notifications"
        },
        {
          value: "Media Market",
          to: "/media-market-list",
          icon: "store"
        },
      ];

    const { notifications, notificationId, chatId, clientName, chatStatus, chatSeekerImage, chatRecruiterImage, isChatOn } = this.state;
    let userName = localStorage.getItem('userName') && localStorage.getItem('userName') !== 'undefined' ? localStorage.getItem('userName') : 'User';
    let image = localStorage.getItem('userImage') && localStorage.getItem('userImage') !== 'undefined' ? localStorage.getItem('userImage') : "demo/faces/female/user.png";

    const locationName = window.location.pathname;
    let screenSize = window.screen.availWidth;
    // if(this.state.jobId){
    //   return <Redirect to={`/job-posts?jobId=${this.state.jobId}`}/>
    // }
    return (
      <SiteHeaderFooter
        userName={userName}
        userImage={image}
        screenSize={screenSize}
        locationName={locationName}
        notifications={notifications}
        navProps={navBarItems}
        onNotificationClick={this.onNotificationClick}
        onChatClick={this.onChatClick}
      >
        {isChatOn &&
          <Chat type={this.state.type} postId={this.state.postId} getNotifications={this.getNotifications} notificationId={notificationId} chatId={chatId} clientName={clientName} onClose={this.onClose} chatStatus={chatStatus} chatSeekerImage={chatSeekerImage} chatRecruiterImage={chatRecruiterImage} />
        }
        {this.props.children}
        {screenSize > 500 ? <ChatUsersList loading={this.props.loading} isMinimised={this.state.isMinimised} data={this.props.chatUsersPeoples} onRemoveConnection={this.onRemoveConnection} /> : this.state.isChatShow && <ChatUsersList isMinimised={this.state.isMinimised} data={this.props.chatUsersPeoples} onChatClick={this.onChatClick} onRemoveConnection={this.onRemoveConnection} />}
      </SiteHeaderFooter>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  notifications: state.reducerMethod.notifications,
  chatUsersPeoples: state.reducerMethod.chatUsersPeoples
});

const mapDispatchToProps = {
  logOutMethod: logOutMethod,
  deactivateAccount: deactivateAccount,
  deleteAccount: deleteAccount,
  getNotifications: getNotifications,
  getChatUsers: getChatUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(SiteWrapper);
