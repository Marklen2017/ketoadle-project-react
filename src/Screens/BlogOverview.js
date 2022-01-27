import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import { Redirect } from 'react-router-dom';
import JobInfo from './../components/blog/JobInfo';
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { getDashboardData, onShare } from '../redux/Actions';

class BlogOverview extends React.Component {

  componentWillMount() {
    this.props.getDashboardData();
  }

  componentWillReceiveProps(nextProps) {
    // !nextProps.feedData && this.props.getFeedData();
  }

  onShare = (requestData) => {
    this.props.onShare(requestData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shareFeedResponse && nextProps.shareFeedResponse !== this.props.shareFeedResponse && !nextProps.shareFeedResponse.error) {
      this.props.getDashboardData();
    }
  }

  render() {
    const { dashboardData, feedData, shareFeedResponse } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        {/* <Row noGutters className="page-header py-4">
          <PageTitle title="Jobs Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row> */}

        <Row>
          {/* Users Overview */}
          {/* <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col> */}

          {/* Users by Device */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col> */}

          {/* New Draft */}
          <Col lg="3" md="3" sm="12" className="mb-4">
            <NewDraft dashboardData={dashboardData} />
          </Col>

          {/* Discussions */}
          <Col lg="6" md="6" sm="12" className="mb-4">
            <Discussions feedData={feedData} onShare={this.onShare} shareFeedResponse={shareFeedResponse} />
          </Col>

          {/* Top Referrals */}
          <Col lg="3" md="3" sm="12" className="mb-4">
            <JobInfo dashboardData={dashboardData} />
          </Col>

          {/* Top Referrals */}
          {/* <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col> */}
        </Row>
        <Loader loader={this.props.loading} />
      </Container>
    )
  };
}

const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  error: state.reducerMethod.error,
  dashboardData: state.reducerMethod.dashboardData,
  feedData: state.reducerMethod.feedData,
  shareFeedResponse: state.reducerMethod.shareFeedResponse
});

const mapDispatchToProps = {
  getDashboardData: getDashboardData,
  onShare: onShare
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogOverview);
