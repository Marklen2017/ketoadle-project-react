import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import { connect } from 'react-redux';
import { updateProfileMethod, getSeekerProfile, getFeedData } from '../redux/Actions';
import Loader from '../components/Loader';
import Icon from '@material-ui/core/Icon';
import Discussions from '../components/blog/Discussions';
import {authCheckToaster} from '../redux/AuthCheckToaster';

class UserProfileLite extends React.Component {

  state = { isUpdated: false }

  componentWillMount() {
    this.props.getSeekerProfile();
    this.props.getFeedData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateProfileResponse && nextProps.updateProfileResponse !== this.props.updateProfileResponse && !nextProps.updateProfileResponse.error) {
      this.props.getSeekerProfile();
      this.props.getFeedData();
    }
    if (nextProps.seekerProfileData && nextProps.seekerProfileData !== this.props.seekerProfileData && !nextProps.seekerProfileData.error) {
      localStorage.setItem('userName', nextProps.seekerProfileData.data.name);
      localStorage.setItem('userImage', nextProps.seekerProfileData.data.image);
      this.setState({ isUpdated: true, userData: nextProps.seekerProfileData.data });
    }
  }

  onSave = (request) => {
    if(authCheckToaster())
    this.props.updateProfileMethod(request);
  }
  render() {
    const { updateProfileResponse, seekerProfileData, loading, myFeedData } = this.props;
    const { userData } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        {this.state.isUpdated && <div><Icon style={{ marginTop: 10, fontSize: 22, position: 'absolute', right: 40, cursor: 'pointer', zIndex: 10000, color: '#4267b2' }} onClick={() => this.setState({ isUpdated: !this.state.isUpdated })}>edit</Icon></div>}
        <Row>
          {this.state.isUpdated ? <Col lg="12">
            <UserDetails userDetails={userData} />
          </Col>
            : <Col lg="12">
              <UserAccountDetails onSave={this.onSave} UserAccountDetails={userData} />
            </Col>}
        </Row>
        <Col className="mb-4">
          <Discussions feedData={myFeedData} isProfileView={true} />
        </Col>
        <Loader loader={loading} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  profile: state.reducerMethod.profile,
  error: state.reducerMethod.error,
  updateProfileResponse: state.reducerMethod.updateProfileResponse,
  seekerProfileData: state.reducerMethod.seekerProfileData,
  myFeedData: state.reducerMethod.myFeedData
});

const mapDispatchToProps = {
  updateProfileMethod: updateProfileMethod,
  getSeekerProfile: getSeekerProfile,
  getFeedData: getFeedData
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileLite);
