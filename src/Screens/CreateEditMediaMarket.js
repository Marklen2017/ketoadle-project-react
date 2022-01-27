/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Card,
    Button,
    Alert
} from "tabler-react";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { saveMediaMarketMethod, getMediaEditData, clearDataMethod } from '../redux/Actions';
import Loader from '../Loader';
import RangeDatePicker from "../components/RangeDatePicker";
import Select from 'react-select';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
import { authCheckToaster } from '../redux/AuthCheckToaster';

import SiteWrapper from "../SiteWrapper.react";
import { getAccessToken, parseToekJwt } from '../common-methods';
import Toaster from "../redux/Toaster";

let that;
class CreateEditMediaMarket extends React.Component {
    constructor(props) {
        super(props);
        const mediaId = this.props.match && this.props.match.params && this.props.match.params.id;
        const query = new URLSearchParams(this.props.location.search);
        const type = query.get('type');
        this.state = {
            type: "",
            tags: '',
            isView: type === 'view' ? true : false,
            categoryType: [{ label: 'Event', value: 'Event' }, { label: 'Course', value: 'Course' }, { label: 'CV Help', value: 'CV Help' }],
            selectedCategory: { label: 'Event', value: 'Event' }, mediaId, isOwner: false
        };
        that = this;
    }

    getmediaId = () => {
        return this.props.mediaId ? this.props.mediaId : (this.props.match && this.props.match.params && this.props.match.params.id ? this.props.match.params.id : null);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mediaEditData && nextProps.mediaEditData !== this.props.mediaEditData) {
            if (nextProps.mediaEditData.data && !nextProps.mediaEditData.error) {
                let data = nextProps.mediaEditData.data;
                // const isEditJobResp = this.isEditableJob(data.createdAt);
                const isOwner = this.state.mediaId && parseToekJwt() && parseToekJwt()._id === data.user;
                this.setState({
                    title: data.title,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    amount: data.cost,
                    tags: data.tags.toString(),
                    isEditJob: true,
                    selectedCategory: { label: (data.category.charAt(0).toUpperCase() + data.category.slice(1)), value: (data.category.charAt(0).toUpperCase() + data.category.slice(1)) },
                    location: data.webLink,
                    description: data.description,
                    isOwner
                });
            }
        }
    }

    componentDidMount() {
        if (this.state.mediaId)
            this.props.getMediaEditData(this.state.mediaId);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    isSubmitEnable = () => {
        if ((!this.state.startDate && !this.state.endDate) || !this.state.title) {
            return false;
        }
        return true;
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.getElementById('createMedia')) {
            this.saveMediaMarket();
        }
    }

    onStartDateChange = (selectedDate) => {
        this.setState({ startDate: selectedDate });
    }

    onEndDateChange = (selectedDate) => {
        this.setState({ endDate: selectedDate });
    }

    saveMediaMarket = () => {
        if (!this.isSubmitEnable()) {
            Toaster('Title, Start date or End date is required', 'warning');
            return;
        }
        const startDate=new Date(this.state.startDate).setHours(0,0,0,0);
        const endDate=new Date(this.state.endDate).setHours(23,59,59,999);
        
        let request = {
            "title": this.state.title,
            "description": this.state.description,
            "webLink": this.state.location,
            "cost": this.state.amount,
            "startDate": new Date(startDate),
            "endDate": new Date(endDate),
            "tags": this.state.tags ? this.state.tags.split(' ') : [],
            "category": this.state.selectedCategory.value.toLowerCase()
        }
        const mediaId = this.state.mediaId;
        if (authCheckToaster() && mediaId) {
            this.props.saveMediaMarketMethod(request, mediaId);
        }
        else {
            this.props.saveMediaMarketMethod(request);
        }
    }

    setData = (isClear) => {
        if (isClear) {
            this.props.clearDataMethod && this.props.clearDataMethod();
            this.setState({
                title: '',
                startDate: '',
                endDate: '',
                amount: '',
                selectedCategory: { label: 'Event', value: 'Event' },
                location: '',
                tags: ''
            });
        }
    }

    mediaSuccess = (message) => {
        this.setData(true);
        return <Redirect to="/media-market-list" />
    }


    isEditableJob = (createdDate) => {
        var today = new Date();
        var Christmas = new Date(createdDate);
        var diffMs = (today - Christmas); // milliseconds between now & Christmas
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffDays = Math.floor(diffMs / 86400000); // days

        if (diffMins > 15 || diffHrs > 0 || diffDays > 0) {
            return false;
        }
        return true;
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        // In case you have a limitation
        e.target.style.height = `${Math.min(e.target.scrollHeight, 500)}px`;
    }

    render() {
        const mediaId = this.getmediaId();
        const { isOwner, isView } = this.state;
        const { saveMediaMarketResponse } = this.props;
        let userToken = getAccessToken();
        if (!userToken)
            return <Redirect to="/" />
        else {
            return (
                <SiteWrapper>
                    <Container fluid className="main-content-container px-4" style={{ paddingBottom: 50 }}>
                        {/* Page Header */}
                        <Grid.Row noGutters className="page-header py-4">
                            {!mediaId ? <PageTitle
                                sm="4"
                                title="Media Market"
                                subtitle={'Create Media'}
                                className="text-sm-left"
                            /> : <PageTitle sm="4" title={`Media Market ${isOwner ? '(Update)' : ''}`} subtitle={<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Link style={{ fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#4267b2' }} to="/media-market-list">
                                    <Icon style={{ fontSize: 12 }}>arrow_back</Icon>
                        Back to Media's </Link> ( {mediaId} )</div>} className="text-sm-left" />}
                        </Grid.Row>
                        {/* Second Grid.Row of Posts */}
                        <div id="createMedia">
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4" style={!isOwner && mediaId ? { marginTop: 70 } : {}}>
                                    <Card className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" >
                                                    Media Market Details
              </a>
                                            </h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Title</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input type="text" value={this.state.title} className="form-control" onChange={(e) => this.setState({ title: e.target.value })} disabled={!isOwner && mediaId} />
                                                        </div>
                                                    </div>

                                                    <div className="row form-group">
                                                        <div className="col-md-4">
                                                            <label>Cost</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input disabled={!isOwner && mediaId} placeholder="eg: $100, €50, £80, Free etc" type="text" value={this.state.amount} className="form-control" onChange={(e) => this.setState({ amount: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Date</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            {/* <input type="text" className="form-control" /> */}
                                                            <RangeDatePicker isDetail={!isOwner && mediaId} onStartDateChange={this.onStartDateChange} onEndDateChange={this.onEndDateChange} startDate={this.state.startDate} endDate={this.state.endDate} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row form-group">
                                                        <div className="col-md-4">
                                                            <label>Category</label>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Select
                                                                defaultValue={this.state.categoryType[0]}
                                                                isSearchable={true}
                                                                name="type"
                                                                value={this.state.selectedCategory}
                                                                placeholder="Category"
                                                                onChange={(val) => this.setState({ selectedCategory: val })}
                                                                options={this.state.categoryType}
                                                                isDisabled={!isOwner && mediaId}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-4" style={{ display: 'flex' }}>
                                                            <label>Weblink</label>
                                                            <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input disabled={!isOwner && mediaId} type="text" value={this.state.location} className="form-control" onChange={(e) => this.setState({ location: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-4" style={{ display: 'flex' }}>
                                                            <label>Tags</label>
                                                            <Icon style={{ paddingTop: 1, fontSize: 18 }} title="Enter the most suitable # tags for your media for a better match">info</Icon>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input disabled={!isOwner && mediaId} type="text" value={this.state.tags} className="form-control" onChange={(e) => this.setState({ tags: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <textarea onKeyDown={isView ? null : this.handleKeyDown} onFocus={this.handleKeyDown} style={isView ? (this.state.description && this.state.description.length > 500 ? { height: 500 } : { height: 200 }) : {}} disabled={!isOwner && mediaId} className="form-control" type="text" value={this.state.description} placeholder="Media Description" onChange={(e) => this.setState({ description: e.target.value })} />
                                            </div>
                                            {((isOwner && mediaId && !isView) || !mediaId) && <div className="text-right" style={{ display: 'flex', float: 'right' }}>
                                                {mediaId ? <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} color="danger">
                                                    <Link to="/media-market-list" style={{ color: 'white', textDecoration: 'none' }}> Cancel</Link>
                                                </Button> : <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={() => this.setData(true)} color="danger">
                                                        Cancel
          </Button>}
                                                <br />
                                                <Button loading={this.props.loading} theme="accent" className="mt-3 ml-10" onClick={this.saveMediaMarket} color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }}>
                                                    {mediaId ? 'Update' : 'Create'}
                                                </Button>
                                            </div>}
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            {saveMediaMarketResponse && (saveMediaMarketResponse.error ?
                                <Alert className="alert alert-danger">
                                    <i className="fa fa-exclamation-triangle mx-2"></i> {saveMediaMarketResponse && saveMediaMarketResponse.message}
                                </Alert> : this.mediaSuccess(saveMediaMarketResponse))}
                            <Loader loader={this.props.loading} />
                        </div>
                    </Container>
                </SiteWrapper>
            );
        }
    }
}


const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    error: state.reducerMethod.error,
    saveMediaMarketResponse: state.reducerMethod.saveMediaMarketResponse,
    mediaEditData: state.reducerMethod.mediaEditData,
});

const mapDispatchToProps = {
    saveMediaMarketMethod: saveMediaMarketMethod,
    getMediaEditData: getMediaEditData,
    clearDataMethod: clearDataMethod
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditMediaMarket);
