import React from "react";
import classNames from "classnames";
import {
    Grid,
    Card,
    Button
} from "tabler-react";
import Icon from '@material-ui/core/Icon';
import { Link, Redirect } from 'react-router-dom';
import Portfolio_bg from '../assets/Portfolio_bg.png';

class SeekerDashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isDetail: null }
    }

    redirectToDetail = (id) => {
        this.setState({ isDetail: id });
    }


    render() {
        const iconStyle = { paddingTop: 1, fontSize: 16, color: '#4267b2', cursor: 'pointer' };
        const { variation, count, imgName, subLabel1, subLabel2, isIcon, jobPosts, isJobs, isProfile } = this.props;
        const noDataStyle = { padding: 10, textAlign: 'center' };
        const cardClasses = classNames(
            "stats-small",
            variation && `stats-small--${variation}`
        );

        const cardBodyClasses = classNames(
            variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
        );

        const labelClasses = classNames(
            "stats-small__label",
            "text-uppercase",
            variation !== "1" && "mb-1"
        );
        const subLabelClasses = classNames(
            "stats-small__label",
            variation !== "1" && "mb-1"
        );

        const valueClasses = classNames(
            "stats-small__value",
            "count",
            variation === "1" ? "my-3" : "m-0"
        );

        const innerDataFieldClasses = classNames(
            "stats-small__data",
            variation !== "1" && "text-right align-items-center"
        );
        if (this.state.isDetail) {
            return <Redirect to={`/job-posts?jobId=${this.state.isDetail}`} />
        }
        else if (isJobs) {
            return (<div style={{ backgroundColor: '#F6F6F6' }}>
                {jobPosts && jobPosts.data ? jobPosts.data.map((post, idx) => {
                    return <div style={{ cursor: 'pointer', margin: 10, border: '1px solid #EAEAEA' }} onClick={() => this.redirectToDetail(post._id)} key={idx}>
                        <div className="dashboard-card" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap', borderRadius: 0 }} title={post._id}>Job Reference : {post._id}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontWeight: 'bold', color: '#fff' }}>
                            <span style={{
                                width: '49%', height: 60, backgroundColor: '#00af50', display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign:'center'
                            }}><span>Auto Matches</span><span>{post.autoApplicant ? post.autoApplicant.length : 0}</span></span>
                            <span style={{
                                width: '49%', height: 60, backgroundColor: '#4267b2', display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign:'center'
                            }}><span>Job Applicants</span><span>{post.manualApplicant ? post.manualApplicant.length : 0}</span></span>
                        </div>
                        <Card.Body className="p-3" style={{
                            maxHeight: 140,
                            minHeight: 140
                        }}>
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
                            <p className="card-text mb-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap' }} title={post.description}>{post.description}</p>
                        </Card.Body>
                        {/* <span className="text-muted p-3" style={{ borderTop: '1px solid #e1e5eb', display: 'flex' }}>Posted on: {(date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()}</span> */}
                        <div style={{ textAlign: 'center', padding: 5 }}><Link to={`/job-posts?jobId=${post._id}`} style={{ textDecoration: 'none' }}><Button color="primary" size="sm">Read More...</Button></Link></div>
                    </div>
                }) : <div style={noDataStyle}>No jobs found</div>}
            </div>)
        }
        else {
            return <div className={cardBodyClasses} style={isIcon ? { display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#F6F6F6' } : { display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F6F6F6' }}>
                <div className={innerDataFieldClasses} style={{ height: 'fit-content', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 5, marginTop: 5 }}>
                    <div id="profile" className="row" style={{ backgroundImage: `url(${Portfolio_bg})`, backgroundSize: 'contain', color: '#fff', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 30, margin: 0, height:60,width:60 }}>
                        450
                </div>
                </div>
                <div className={subLabelClasses} style={{ height: 'fit-content', fontSize: 11 }}><Link to="/seeker-detail">{subLabel1}</Link></div>
            </div>
        }

    }
}

export default SeekerDashboardView;
