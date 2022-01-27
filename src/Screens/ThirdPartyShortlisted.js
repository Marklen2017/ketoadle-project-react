/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Button
} from "tabler-react";
import { getShortlisted, sendCandidatesList, checkIsPageOpened } from '../redux/Actions';
import { connect } from 'react-redux';
import Loader from '../Loader';
import PageTitle from "../components/PageTitle";
import { getUserType } from "../common-methods";
import ShortlistCard from './ShortlistCard';
import { authCheckToaster } from '../redux/AuthCheckToaster';
import { Redirect } from 'react-router-dom';

class ThirdPartyShortListed extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const code = query.get('code');
        this.state = { jobId: props.match.params.id, modalData: [], token: token, code,selectedateCandidates:[] };
    }

    componentWillMount() {
        if (this.state.jobId && this.state.token) {
            this.props.checkIsPageOpened(this.state.code, this.state.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpenUrlResponse && nextProps.isOpenUrlResponse !== this.props.isOpenUrlResponse) {
            if (nextProps.isOpenUrlResponse.error) {
                return <Redirect to="/401" />
            }
            else {
                this.props.getShortlisted(this.state.jobId, this.state.token);
            }
        }
    }

    sendCandidatesList = () => {
        if (authCheckToaster())
            this.props.sendCandidatesList(this.state.token,{candidates:this.state.selectedateCandidates},this.state.jobId);
    }

    render() {
        const { shortlistedData, loading } = this.props;
        const {selectedateCandidates}=this.state;
        const noDataStyle = { paddingLeft: 15, paddingRight: 15 };
        let userType = getUserType();
        return (
            <div>
                <Container fluid className="main-content-container px-4">
                    {/* Page Header */}
                    <div style={{ paddingBottom: 40 }}>
                        <Grid.Row noGutters className="page-header py-4">
                            <PageTitle sm="4" title="Shortlisted" subtitle={userType === 'recruiter' ? "Candidates" : "Jobs"} className="text-sm-left" />
                        </Grid.Row>
                        {/* First Grid.Row of Posts */}
                        {selectedateCandidates && selectedateCandidates.length ? <div style={{ textAlign: 'right', marginBottom: 10 }}>
                                <Button icon="send" color="primary" title="Send Shortlisted Candidates" onClick={this.sendCandidatesList}>Send Shortlisted Candidates</Button>
                            </div>:''}
                        <Grid.Row>
                            {shortlistedData && shortlistedData.data && shortlistedData.data.length ? shortlistedData.data.map((data, idx) => {

                                return <Grid.Col lg="4" md="4" sm="12" className="mb-4" key={idx}>
                                    <ShortlistCard onCandidateSelect={(value)=>this.setState({selectedateCandidates:value})} data={data} isThirdParty={true} token={this.state.token}/>
                                </Grid.Col>
                            }) : !loading && <div style={noDataStyle}>No data found</div>}

                        </Grid.Row>
                    </div>
                    <Loader loader={this.props.loading} />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    shortlistedData: state.reducerMethod.shortlistedData,
    error: state.reducerMethod.error,
    sendCandidatesListResponse: state.reducerMethod.sendCandidatesListResponse,
    isOpenUrlResponse: state.reducerMethod.isOpenUrlResponse
});

const mapDispatchToProps = {
    getShortlisted: getShortlisted,
    sendCandidatesList: sendCandidatesList,
    checkIsPageOpened: checkIsPageOpened
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyShortListed);
