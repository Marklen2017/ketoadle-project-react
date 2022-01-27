/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Card,
    Button
} from "tabler-react";
import Icon from '@material-ui/core/Icon';
import { getShortlisted, scheduleInterview, getShortlistModalData, sendToThirdParty } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import PageTitle from "../components/PageTitle";
import { Redirect } from 'react-router-dom';
import SiteWrapper from "../SiteWrapper.react";
import { Chat } from './ChatScreen';
import { getUserType } from "../common-methods";
import ModalComp from '../components/Modal';
import ShortlistCard from './ShortlistCard';
import { Link } from 'react-router-dom';
import { authCheckToaster } from '../redux/AuthCheckToaster';

class ShortListed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobId: props.match.params.id, modalData: [] };
    }
    componentWillMount() {
        this.props.getShortlisted(this.state.jobId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.saveInterviewDatesResponse && nextProps.saveInterviewDatesResponse !== this.props.saveInterviewDatesResponse && !nextProps.saveInterviewDatesResponse.error)
            this.setState({ isOpen: false })
        if (nextProps.shortlistModalData && nextProps.shortlistModalData !== this.props.shortlistModalData && !nextProps.shortlistModalData.error) {
            nextProps.shortlistModalData.data && nextProps.shortlistModalData.data.dates && this.setState({ modalData: nextProps.shortlistModalData.data.dates });
        }
    }

    scheduleInterview = (selectedDatesArray) => {
        const selectedDates = [];
        selectedDatesArray.forEach(element => {
            if (element) {
                selectedDates.push(element);
            }
        });
        if (authCheckToaster() && selectedDates.length) {
            if (this.state.modalData && this.state.modalData.length) {
                let request = {
                    "jobSeekerId": this.state.seekerId,
                    "dates": selectedDates
                };
                this.props.scheduleInterview(null, request, this.state.jobId);
            }
            else {
                let request = {
                    "jobSeekerId": this.state.seekerId,
                    "jobId": this.state.jobId,
                    "dates": selectedDates
                };
                this.props.scheduleInterview(null, request);
            }
        }
    }

    onCalenderClick = (id) => {
        this.props.getShortlistModalData(this.state.jobId, id);
        this.setState({ seekerId: id, isOpen: true });
    }

    sendToThirdParty = () => {
        if (this.state.jobId) {
            let request = {
                "jobId": this.state.jobId
            };
            this.props.sendToThirdParty(request);
        }
    }

    render() {
        const { shortlistedData, loading } = this.props;
        const noDataStyle = { paddingLeft: 15, paddingRight: 15 };
        let userType = getUserType();
        let userToken = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).token;
        if (!userToken)
            return <Redirect to="/" />
        else {
            return (
                <SiteWrapper>
                    {this.state.isOpen && <ModalComp modalData={this.state.modalData} key={this.state.jobId} scheduleInterview={this.scheduleInterview} onClose={() => this.setState({ isOpen: false })} open={this.state.isOpen} />}
                    <Container fluid className="main-content-container px-4">
                        {/* Page Header */}
                        {this.state.isChatOn && <Chat chatId={this.state.chatId} clientName={this.state.clientName} chatStatus={this.state.chatStatus} chatSeekerImage={this.state.chatSeekerImage} chatRecruiterImage={this.state.chatRecruiterImage} onClose={this.onClose} />}
                        <div style={{ paddingBottom: 40 }}>
                            <Grid.Row noGutters className="page-header py-4">
                                <PageTitle sm="4" title={`Shortlisted`} subtitle={<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Link style={{ fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#4267b2' }} to="/job-posts">
                                    <Icon style={{ fontSize: 12 }}>arrow_back</Icon>Back to Jobs </Link> ( {this.state.jobId} )</div>} className="text-sm-left" />
                            </Grid.Row>
                            {shortlistedData && shortlistedData.data && shortlistedData.data.length ? <div style={{ textAlign: 'right', marginBottom: 10 }}>
                                <Button icon="send" color="primary" title="Send jobs to third party" onClick={this.sendToThirdParty}>Send Candidates List</Button>
                            </div> : ''}
                            {/* First Grid.Row of Posts */}
                            <Grid.Row>
                                {shortlistedData && shortlistedData.data && shortlistedData.data.length ? shortlistedData.data.map((data, idx) => {

                                    return <Grid.Col lg="4" md="4" sm="12" className="mb-4" key={idx}>
                                        <ShortlistCard data={data} onCalenderClick={this.onCalenderClick} />
                                    </Grid.Col>
                                }) : !loading && <div style={noDataStyle}>No data found</div>}

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
    shortlistedData: state.reducerMethod.shortlistedData,
    error: state.reducerMethod.error,
    saveInterviewDatesResponse: state.reducerMethod.saveInterviewDatesResponse,
    shortlistModalData: state.reducerMethod.shortlistModalData
});

const mapDispatchToProps = {
    getShortlisted: getShortlisted,
    scheduleInterview: scheduleInterview,
    getShortlistModalData: getShortlistModalData,
    sendToThirdParty: sendToThirdParty
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortListed);
