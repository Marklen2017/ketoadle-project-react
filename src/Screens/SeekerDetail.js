/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import {getSeekerProfile } from '../redux/Actions';
import SeekerProfileView from './SeekerProfileView';
import {getAccessToken} from '../common-methods';
import Loader from '../Loader';

class SeekerDetail extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id');
        const token = query.get('token');
        this.state = {seekerId:id,token};

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.seekerProfileData && nextProps.seekerProfileData !== this.props.seekerProfileData && !nextProps.seekerProfileData.error) {
            if ((nextProps.seekerProfileData.data && !this.props.seekerProfileData) || (nextProps.seekerProfileData.data &&  nextProps.seekerProfileData.data!==this.props.seekerProfileData.data)) {
                let data = nextProps.seekerProfileData.data;
                let carriers = [];
                let carrierData = [];
                data.detailedCareerInformation.map((que, index) => {
                    if (que.startDate)
                        que.startDate = new Date(que.startDate);
                    if (que.endDate)
                        que.endDate = new Date(que.endDate);
                    carrierData.push(que)
                    carriers.push(index);
                });
                let education = [];
                let educationData = [];
                data.educationData.map((que, index) => {
                    if (que.startDate)
                        que.startDate = new Date(que.startDate);
                    if (que.endDate)
                        que.endDate = new Date(que.endDate);
                    educationData.push(que)
                    education.push(index);
                });
                let languages = [];
                let languageData = [];
                data.languageData.map((que, index) => {
                    languageData.push(que)
                    languages.push(index);
                });
                let videos = [];
                let videosData = [];
                let files = data.portfolio && data.portfolio.length && data.portfolio[0].images;
                data.portfolio && data.portfolio.length && data.portfolio[0].videos.map((que, index) => {
                    if (que.video) {
                        videosData.push(que)
                        videos.push(index);
                    }
                });
                let hardSkillsArray = [];
                let skillsData = {}
                data.hardSkills && data.hardSkills.map(skill => {
                    const key = Object.keys(skill)[0];
                    let obj = {};
                    obj.label = key;
                    obj.value = key;
                    hardSkillsArray.push(obj);
                    let skillObj = skillsData['HardSkills'] ? skillsData['HardSkills'] : {};
                    skillObj[key] = JSON.parse(skill[key]);
                    skillsData['HardSkills'] = skillObj;
                    skillsData['HardSkillsScore'] = (skillsData['HardSkillsScore'] ? skillsData['HardSkillsScore'] : 0) + JSON.parse(skill[key]).reduce((a, b) => a + b);
                });
                let softSkillsArray = [];
                data.softSkills && data.softSkills.map(skill => {
                    const key = Object.keys(skill)[0];
                    let obj = {};
                    obj.label = key;
                    obj.value = key;
                    softSkillsArray.push(obj);
                    let skillObj = skillsData['SoftSkills'] ? skillsData['SoftSkills'] : {};
                    skillObj[key] = JSON.parse(skill[key]);
                    skillsData['SoftSkills'] = skillObj;
                    skillsData['SoftSkillsScore'] = (skillsData['SoftSkillsScore'] ? skillsData['SoftSkillsScore'] : 0) + JSON.parse(skill[key]).reduce((a, b) => a + b);
                });
                this.setState({
                    carriers,
                    carrierData,
                    education,
                    educationData,
                    languages,
                    languageData,
                    name: data.name,
                    age: data.age,
                    profession: data.professon,
                    contact: data.contact,
                    email: data.email,
                    location: data.location,
                    about: data.about,
                    softSkills: softSkillsArray,
                    hardSkills: hardSkillsArray,
                    skillsData,
                    videosData,
                    videos,
                    totalScore: data.totalScore,
                    files,
                    introVideo: data.portfolio && data.portfolio.length && data.portfolio[0].introVideo ? data.portfolio[0].introVideo : ''
                });
            }
        }
    }

    componentDidMount() {
        this.props.getSeekerProfile(this.state.seekerId,this.state.token);
    } 
    
    render() {
        let userToken = getAccessToken();
        if (!userToken && !this.state.token)
            return <Redirect to="/" />
        else
            return <div>
                <SeekerProfileView isToken={this.state.token || !userToken} completeData={this.props.seekerProfileData} data={this.state} videosData={this.state.videosData} introVideo={this.state.introVideo} seekerId={this.state.seekerId} isEdit={this.state.seekerId}/>
                <Loader loader={this.props.loading} />
                </div>
    }
}


const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    error: state.reducerMethod.error,
    seekerProfileData: state.reducerMethod.seekerProfileData,
});

const mapDispatchToProps = {
    getSeekerProfile:getSeekerProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(SeekerDetail);
