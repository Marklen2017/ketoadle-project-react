/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Card,
    Badge,
    Button,
    Form
} from "tabler-react";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getSkills, addSkill, saveSeekerProfile, getSeekerProfile, clearDataMethod, saveSkills } from '../redux/Actions';
import Loader from '../Loader';
import RangeDatePicker from "../components/RangeDatePicker";
import Select from 'react-select';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
import CreatableSelect from 'react-select/creatable';
import SoftSkillModal from './SoftSkillModal';
import HardSkillModal from './HardSkillModal';
import ScoreModal from './ScoreModal';
import SeekerDropzone from '../components/SeekerDropzone';
import ReactPlayer from 'react-player';
import SiteWrapper from "../SiteWrapper.react";
import { getAccessToken } from '../common-methods';
import Microlink from '@microlink/react';

let that;
class SeekerCreateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            softSkills: [],
            hardSkill: "",
            hardSkills: [],
            skillValues: [],
            type: "",
            softSkillArray: [],
            hardSkillArray: [],
            jobType: [{ label: 'Full-time Permanent', value: 'fullTimePermanent' }, { label: 'Part-time Permanent', value: 'partTimePermanent' }, { label: 'Contractor', value: 'contractor' }, { label: 'Internship', value: 'internship' }, { label: 'Freelancer', value: 'freelancer' }, { label: 'Volunteer', value: 'volunteer' }, { label: 'Full-time Temporary', value: 'fullTimeTemporary' }, { label: 'Part-time Temporary', value: 'partTimeTemporary' }],
            languageLevel: [{ label: 'Begginer', value: 'Begginer' }, { label: 'Intermediate', value: 'Intermediate' }, { label: 'Proficient', value: 'Proficient' }, { label: 'Expert', value: 'Expert' }],
            selectedType: { label: 'Full-time Permanent', value: 'fullTimePermanent' }, salaryType: [{ label: 'Annual', value: 'Annual' }, { label: 'Day-Rate', value: 'Day-Rate' }],
            selectedSalary: { label: 'Annual', value: 'Annual' }, isAlert: true, selectedLangLevel: { label: 'Begginer', value: 'Begginer' },
            carriers: [0], carrierData: [], images: [], imagesData: [], description: '', education: [0], educationData: [], languages: [0], languageData: [], files: [], videos: [0], videosData: [], skillsData: {}, isMilitary: false
        };
        this.setData(true);
        this.props.clearDataMethod && this.props.clearDataMethod();
        that = this;
    }
    handleScoreBoard = type => {
        if (type === "soft")
            this.setState({ skillValues: this.state.softSkills, type: "Soft" });
        else
            this.setState({ skillValues: this.state.hardSkills, type: "Hard" });
    };

    handleChange = (newValue, actionMeta) => {
        let softSkills = that.state.softSkills;
        softSkills = newValue;
        that.setState({ softSkills });
        if (actionMeta.action === 'create-option') {
            let request = {
                "label": newValue[newValue.length - 1].label,
                "value": newValue[newValue.length - 1].label,
                "type": "soft"
            }
            this.props.addSkill(request);
        }
        if (actionMeta.action === "remove-value") {
            const removedItem = actionMeta.removedValue.label;
            const isExist = this.state.skillsData.SoftSkills[removedItem];
            if (isExist) {
                const score = isExist.reduce((a, b) => a + b);
                let skillsData = this.state.skillsData;
                skillsData.SoftSkillsScore = skillsData.SoftSkillsScore - score;
                delete skillsData.SoftSkills[removedItem];
                this.props.saveSkills(skillsData);
            }
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.skillsData && nextProps.skillsData !== this.props.skillsData && !nextProps.skillsData.error) {
            this.setState({ skillsData: nextProps.skillsData, type: null });
        }
        if (nextProps.saveSeekerProfileResponse && nextProps.saveSeekerProfileResponse !== this.props.saveSeekerProfileResponse && !nextProps.saveSeekerProfileResponse.error) {
            this.onRedirect();
        }
        if (nextProps.skills && nextProps.skills !== this.props.skills && !nextProps.skills.error) {
            if (nextProps.skills.skills) {
                let skillsData = nextProps.skills.skills;
                let softSkillArray = this.state.softSkills;
                softSkillArray = skillsData.filter(obj => obj.type === 'soft');
                let hardSkillArray = this.state.hardSkillArray;
                hardSkillArray = skillsData.filter(obj => obj.type === 'hard');
                this.setState({ softSkillArray, hardSkillArray });
            }
        }
        if (nextProps.seekerProfileData && nextProps.seekerProfileData !== this.props.seekerProfileData && !nextProps.seekerProfileData.error) {
            if ((nextProps.seekerProfileData.data && !this.props.seekerProfileData) || (nextProps.seekerProfileData.data && nextProps.seekerProfileData.data !== this.props.seekerProfileData.data)) {
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
                data.portfolio && data.portfolio.length && data.portfolio[0].videos.map((que, index) => {
                    if (que.video) {
                        videosData.push(que)
                        videos.push(index);
                    }
                });
                const images = [];
                const imagesData = data.portfolio && data.portfolio.length && data.portfolio[0].images ? data.portfolio[0].images : [];
                imagesData.map((que, index) => {
                    images.push(index);
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
                    imagesData,
                    images,
                    isMilitary:data.army,
                    introVideo: data.portfolio && data.portfolio.length && data.portfolio[0].introVideo ? data.portfolio[0].introVideo : ''
                });
            }
        }
    }

    handleHardChange = (newValue, actionMeta) => {
        let hardSkills = that.state.hardSkills;
        hardSkills = newValue;
        that.setState({ hardSkills });
        if (actionMeta.action === 'create-option') {
            let request = {
                "label": newValue[newValue.length - 1].label,
                "value": newValue[newValue.length - 1].label,
                "type": "hard"
            }
            this.props.addSkill(request);
        }
        if (actionMeta.action === "remove-value") {
            const removedItem = actionMeta.removedValue.label;
            const isExist = this.state.skillsData.HardSkills[removedItem];
            if (isExist) {
                const score = isExist.reduce((a, b) => a + b);
                let skillsData = this.state.skillsData;
                skillsData.HardSkillsScore = skillsData.HardSkillsScore - score;
                delete skillsData.HardSkills[removedItem];
                this.props.saveSkills(skillsData);
            }
        }
    };
    componentDidMount() {
        this.props.getSkills();
        this.props.getSeekerProfile();
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.getElementById('createSeeker') && !this.state.type) {
            this.saveJob();
        }
    }

    onStartDateChange = (selectedDate) => {
        this.setState({ startDate: selectedDate });
    }

    onEndDateChange = (selectedDate) => {
        this.setState({ endDate: selectedDate });
    }


    saveJob = () => {
        const { name, age, profession, contact, location, about, carrierData, languageData, educationData } = this.state

        const softScore = this.state.skillsData && this.state.skillsData['SoftSkillsScore'] ? this.state.skillsData['SoftSkillsScore'] : 0;
        const hardScore = this.state.skillsData && this.state.skillsData['HardSkillsScore'] ? this.state.skillsData['HardSkillsScore'] : 0;

        const softSkillArray = [];
        this.state.skillsData && this.state.skillsData['SoftSkills'] && Object.keys(this.state.skillsData['SoftSkills']).map(data => {
            softSkillArray.push({ [data]: JSON.stringify(this.state.skillsData['SoftSkills'][data]) });
        });

        const hardSkillArray = [];
        this.state.skillsData && this.state.skillsData['HardSkills'] && Object.keys(this.state.skillsData['HardSkills']).map(data => {
            hardSkillArray.push({ [data]: JSON.stringify(this.state.skillsData['HardSkills'][data]) });
        });

        const languageFinalData = languageData.map(data => {
            if (!data.selectedLangLevel) {
                let obj = {};
                obj.language = data.language;
                obj.selectedLangLevel = { label: 'Begginer', value: 'Begginer' };
                return obj;
            }
            return data;
        });

        let request = {
            "name": name,
            "age": age,
            "professon": profession,
            "contact": contact,
            "location": location,
            "about": about,
            "hardSkills": hardSkillArray,
            "softSkills": softSkillArray,
            "totalScore": softScore + hardScore,
            "detailedCareerInformation": carrierData,
            "languageData": languageFinalData,
            "educationData": educationData,
            "portfolio": { videos: this.state.videosData, images: this.state.imagesData, introVideo: this.state.introVideo },
            "army": this.state.isMilitary
        }
        this.props.saveSeekerProfile(request);
    }

    setData = (isClear, data) => {
        if (isClear) {
            this.props.clearDataMethod && this.props.clearDataMethod();
            this.setState({
                carriers: [0],
                carrierData: [],
                education: [0],
                educationData: [],
                languages: [0],
                languageData: [],
                name: '',
                age: '',
                profession: '',
                contact: '',
                email: '',
                location: '',
                about: '',
                softSkills: [],
                hardSkills: []
            });
            this.props.saveSkills({});
        }
    }

    submitSkill = () => {
        this.setState({ type: null });
    }

    addcarriers = () => {
        let carriers = this.state.carriers;
        carriers.push(this.state.carriers.length);
        this.setState({ carriers });
    }

    addEducation = () => {
        let education = this.state.education;
        education.push(this.state.education.length);
        this.setState({ education });
    }

    addLanguage = () => {
        let languages = this.state.languages;
        languages.push(this.state.languages.length);
        this.setState({ languages });
    }

    addVideos = () => {
        let videos = this.state.videos;
        videos.push(this.state.videos.length);
        this.setState({ videos });
    }

    addImages = () => {
        let images = this.state.images;
        images.push(this.state.images.length);
        this.setState({ images });
    }

    onEducationDataChange = (e, index) => {
        let educationData = this.state.educationData;
        educationData[index] = e.target.value;
        this.setState({ educationData });
    }

    onCarrierDataChange = (value, key, index) => {
        let carrierData = this.state.carrierData;
        let data = carrierData[index] ? carrierData[index] : {};
        data[key] = value;
        carrierData[index] = data;
        this.setState({ carrierData });
    }

    onEducationDataChange = (value, key, index) => {
        let educationData = this.state.educationData;
        let data = educationData[index] ? educationData[index] : {};
        data[key] = value;
        educationData[index] = data;
        this.setState({ educationData });
    }

    onLangDataChange = (value, key, index) => {
        let languageData = this.state.languageData;
        let data = languageData[index] ? languageData[index] : {};
        data[key] = value;
        languageData[index] = data;
        this.setState({ languageData });
    }

    onThumbnailChange = (file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const imagesData = this.state.imagesData;
            imagesData[index] = { 'image': event.target.result };
            this.setState({ imagesData });
        };
    }

    onVideoDataChange = (value, key, index) => {
        let videosData = this.state.videosData;
        let data = videosData[index] ? videosData[index] : {};
        data[key] = value;
        videosData[index] = data;
        this.setState({ videosData });
    }

    onImageDataChange = (value, key, index) => {
        let imagesData = this.state.imagesData;
        let data = imagesData[index] ? imagesData[index] : {};
        data[key] = value;
        imagesData[index] = data;
        this.setState({ imagesData });
    }

    onNumChange = (e, key) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ [key]: e.target.value })
        }
    }

    onRedirect = () => {
        this.setData(true);
        !this.state.isRedirect && this.setState({ isRedirect: true });
    }

    onRemove = (stateName, stateDataName, index) => {
        const stateData = this.state[stateName];
        const dataState = this.state[stateDataName];
        stateData.splice(index, 1);
        dataState.splice(index, 1);
        this.setState({ [stateName]: stateData, [stateDataName]: dataState });
    }

    render() {
        const { skillsData, educationData, carrierData, languageData, videosData, isRedirect, imagesData } = this.state;
        const softScore = skillsData ? parseFloat(skillsData['SoftSkillsScore'] || 0.00) : '0.00';
        const hardScore = skillsData ? parseFloat(skillsData['HardSkillsScore'] || 0.00) : '0.00';

        let userToken = getAccessToken();
        if (!userToken)
            return <Redirect to="/" />
        if (isRedirect)
            return <Redirect to="/seeker-detail" />
        else {
            return (
                <SiteWrapper>
                    <Container fluid className="main-content-container px-4">
                        {this.state.type && <ScoreModal onCancel={() => this.setState({ type: null })} skillsData={this.state.skillsData} skillValues={this.state.skillValues} type={this.state.type} submitSkill={this.submitSkill} />}
                        {/* Page Header */}

                        <Grid.Row noGutters className="page-header py-4">
                            <PageTitle
                                sm="4"
                                title="Career Info"
                                subtitle={'Update Info'}
                                className="text-sm-left"
                            />
                        </Grid.Row>

                        {/* Second Grid.Row of Posts */}
                        <div id="createSeeker">
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" >
                                                    Personal Details
              </a>
                                            </h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Name</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.name} className="form-control" onChange={(e) => this.setState({ name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Profession</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.profession} className="form-control" onChange={(e) => this.setState({ profession: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Age</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.age} className="form-control" onChange={(e) => this.onNumChange(e, 'age')} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Mobile</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.contact} className="form-control" onChange={(e) => this.onNumChange(e, 'contact')} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <div className="col-md-4">
                                                            <label>Email</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.email} className="form-control" onChange={(e) => this.setState({ email: e.target.value })} disabled={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <div className="col-md-4" style={{ display: 'flex' }}>
                                                            <label>Location</label>
                                                            <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.location} className="form-control" onChange={(e) => this.setState({ location: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row md-12">
                                                <div className="col-md-12">
                                                    <div className="form-group row">
                                                        <div className="col-md-4" style={{ display: 'flex' }}>
                                                            <label>About</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <textarea type="text" rows={2} value={this.state.about} className="form-control" onChange={(e) => this.setState({ about: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="6" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" style={{ display: 'flex' }}>
                                                    Add Soft Skills
                    <small>
                                                        <SoftSkillModal />
                                                    </small>
                                                </a>
                                            </h5>
                                            <div className="form-group">
                                                <CreatableSelect
                                                    isMulti
                                                    placeholder="Soft skill"
                                                    value={this.state.softSkills}
                                                    onChange={this.handleChange}
                                                    defaultValue={this.state.softSkills}
                                                    options={this.state.softSkillArray}
                                                />
                                                <div className="my-2">
                                                    {skillsData && skillsData['SoftSkills'] && Object.keys(skillsData['SoftSkills']).map((skill, index) => {
                                                        return (
                                                            <Badge key={index} className="bg-red mx-1">
                                                                {skill.charAt(0).toUpperCase() + skill.slice(1) + ' : ' + skillsData['SoftSkills'][skill].reduce((a, b) => a + b)}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                                <div className="text-right">
                                                    {this.state.softSkills && this.state.softSkills.length ? (
                                                        <Button
                                                            theme="accent"
                                                            color="primary"
                                                            onClick={() => this.handleScoreBoard("soft")}
                                                        >
                                                            Calculate Score
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>Soft skill score: <span style={{ color: '#006FE6' }}>{softScore}</span></div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                                <Grid.Col lg="6" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" style={{ display: 'flex' }}>
                                                    Add Hard Skills
                    <small>
                                                        <HardSkillModal />
                                                    </small>
                                                </a>
                                            </h5>
                                            <div className="form-group">
                                                <CreatableSelect
                                                    isMulti
                                                    placeholder="Hard skill"
                                                    value={this.state.hardSkills}
                                                    defaultValue={this.state.hardSkills}
                                                    onChange={this.handleHardChange}
                                                    options={this.state.hardSkillArray}
                                                />
                                                <div className="my-2">
                                                    {skillsData && skillsData['HardSkills'] && Object.keys(skillsData['HardSkills']).map((skill, index) => {
                                                        return (
                                                            <Badge key={index} className="bg-red mx-1">
                                                                {skill.charAt(0).toUpperCase() + skill.slice(1) + ' : ' + skillsData['HardSkills'][skill].reduce((a, b) => a + b)}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                                <div className="text-right">
                                                    {this.state.hardSkills && this.state.hardSkills.length ? (
                                                        <Button
                                                            theme="accent"
                                                            color="primary"

                                                            onClick={() => this.handleScoreBoard("hard")}
                                                        >
                                                            Calculate Score
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div>Hard skill score: <span style={{ color: '#006FE6' }}>{hardScore}</span></div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
                                            <h5 className="card-title">
                                                Total Score
                </h5>
                                            <small>(Soft + Hard Skills)</small>
                                            <div style={{ fontSize: 34, fontFamily: 'bold', color: '#006FE6' }}>{softScore + hardScore}</div>
                                        </div>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row md-12">
                                                <div className="col-md-12" style={{ display: 'flex' }}>
                                                    <div className="col-md-6">
                                                        <div className="col-md-12">
                                                            <label>Introduction Video link</label>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <input type="text" value={this.state.introVideo} className="form-control" onChange={(e) => this.setState({ introVideo: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="col-md-12">
                                                            <ReactPlayer url={this.state.introVideo} controls width={150} height={125} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row">
                                                <h6>Images/Links/Certificates upload</h6>
                                                <div className="form-group row col-md-12" style={{ float: 'left', marginBottom: 10 }}>
                                                    <Button theme="accent" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} className="mt-3" onClick={this.addImages}>
                                                        Add Images
        </Button>
                                                </div>
                                                {this.state.images.map((data, index) => {
                                                    return <div className="row-md-12" style={{ width: '100%' }}>
                                                        <div className="col-md-12" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            <div className="col-md-4">
                                                                <div className="col-md-12">
                                                                    <label>Image Link {index + 1}</label>
                                                                </div>
                                                                <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <input type="text" value={imagesData[index] && imagesData[index].image} className="form-control" onChange={(e) => this.onImageDataChange(e.target.value, 'image', index)} />
                                                                    <SeekerDropzone onThumbnailChange={(files) => this.onThumbnailChange(files, index)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="col-md-12">
                                                                    <label>Preview</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    {imagesData[index] && imagesData[index].image && (imagesData[index].image.includes('http') ? <Microlink url={imagesData[index].image} /> : <img src={imagesData[index].image} width={150} height={125} alt='' />)}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="col-md-12">
                                                                    <label>Description</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={imagesData[index] && imagesData[index].description} className="form-control" onChange={(e) => this.onImageDataChange(e.target.value, 'description', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                <Icon style={{ color: '#ff0000', cursor: 'pointer', marginBottom: 5 }} onClick={() => this.onRemove('images', 'imagesData', index)}>highlight_off</Icon>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row">
                                                <h6>Video links</h6>
                                                <div className="form-group row col-md-12" style={{ float: 'left', marginBottom: 10 }}>
                                                    <Button theme="accent" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} className="mt-3" onClick={this.addVideos}>
                                                        Add Videos
        </Button>
                                                </div>
                                                {this.state.videos.map((data, index) => {
                                                    return <div className="row-md-12" style={{ width: '100%' }}>
                                                        <div className="col-md-12" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            <div className="col-md-4">
                                                                <div className="col-md-12">
                                                                    <label>Video Link {index + 1}</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={videosData[index] && videosData[index].video} className="form-control" onChange={(e) => this.onVideoDataChange(e.target.value, 'video', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="col-md-12">
                                                                    <label>Preview</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    {videosData[index] && videosData[index].video ? <ReactPlayer url={videosData[index] && videosData[index].video} controls width={150} height={125} /> : <div style={{ color: '#ff0000' }}>No Preview</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="col-md-12">
                                                                    <label>Description</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={videosData[index] && videosData[index].description} className="form-control" onChange={(e) => this.onVideoDataChange(e.target.value, 'description', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                <Icon style={{ color: '#ff0000', cursor: 'pointer', marginBottom: 5 }} onClick={() => this.onRemove('videos', 'videosData', index)}>highlight_off</Icon>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row">
                                                <h6>Detailed Career Information</h6>
                                                <div className="form-group row col-md-12" style={{ float: 'left', marginBottom: 10 }}>
                                                    <Button theme="accent" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} className="mt-3" onClick={this.addcarriers}>
                                                        Add Career History
        </Button>
                                                </div>
                                                {this.state.carriers.map((data, index) => {
                                                    return <div style={{ marginBottom: 10 }}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}><h6 style={{ color: '#4267b2', marginBottom: 0 }}>Career Details {index + 1}</h6><Icon style={{ color: '#ff0000', cursor: 'pointer', marginLeft: 5 }} onClick={() => this.onRemove('carriers', 'carrierData', index)}>highlight_off</Icon></div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Company Name</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={carrierData[index] && carrierData[index].companyName} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'companyName', index)} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Position</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={carrierData[index] && carrierData[index].position} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'position', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="row form-group">
                                                                    <div className="col-md-4">
                                                                        <label>Job Type</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <Select
                                                                            defaultValue={this.state.jobType[0]}
                                                                            isSearchable={true}
                                                                            name="type"
                                                                            value={carrierData[index] && carrierData[index].selectedType}
                                                                            placeholder="Job Type"
                                                                            onChange={(val) => this.onCarrierDataChange(val, 'selectedType', index)}
                                                                            options={this.state.jobType}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Duration</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <RangeDatePicker onStartDateChange={(selectedDate) => this.onCarrierDataChange(selectedDate, 'startDate', index)} onEndDateChange={(selectedDate) => this.onCarrierDataChange(selectedDate, 'endDate', index)} startDate={carrierData[index] && carrierData[index].startDate ? carrierData[index].startDate : null} endDate={carrierData[index] && carrierData[index].endDate ? carrierData[index].endDate : null} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Link</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={carrierData[index] && carrierData[index].link} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'link', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4" style={{ display: 'flex' }}>
                                                                        <label>Location</label>
                                                                        <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={carrierData[index] && carrierData[index].location} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'location', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row md-12">
                                                            <div className="col-md-12">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4" style={{ display: 'flex' }}>
                                                                        <label>Description</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <textarea type="text" rows={2} value={carrierData[index] && carrierData[index].description} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'description', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="form-group row col-md-12" >
                                                                <h6 style={{ paddingLeft: 15, color: '#4267b2' }}>Reference Info</h6>
                                                            </div>
                                                            <div className="form-group row col-md-4">
                                                                <div className="col-md-4">
                                                                    <label>Name</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={carrierData[index] && carrierData[index].refName} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'refName', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row col-md-4">
                                                                <div className="col-md-4">
                                                                    <label>Contact</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={carrierData[index] && carrierData[index].refContact} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'refContact', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row col-md-4">
                                                                <div className="col-md-4">
                                                                    <label>Email</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={carrierData[index] && carrierData[index].refEmail} className="form-control" onChange={(e) => this.onCarrierDataChange(e.target.value, 'refEmail', index)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row">
                                                <h6>Languages</h6>
                                                <div className="form-group row col-md-12" style={{ float: 'left', marginBottom: 10 }}>
                                                    <Button theme="accent" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} className="mt-3" onClick={this.addLanguage}>
                                                        Add Language
        </Button>
                                                </div>
                                                {this.state.languages.map((data, index) => {
                                                    return <div className="row-md-12" style={{ width: '100%', marginBottom: 10 }}>
                                                        <div className="col-md-12" style={{ display: 'flex' }}>
                                                            <div className="col-md-6">
                                                                <div className="col-md-12">
                                                                    <label>Language {index + 1}</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={languageData[index] && languageData[index].language} className="form-control" onChange={(e) => this.onLangDataChange(e.target.value, 'language', index)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="col-md-12">
                                                                    <label>Language Level</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <Select
                                                                        defaultValue={this.state.languageLevel[0]}
                                                                        isSearchable={true}
                                                                        name="languageLevel"
                                                                        value={languageData[index] && languageData[index].selectedLangLevel}
                                                                        placeholder="Language Levels"
                                                                        onChange={(val) => this.onLangDataChange(val, 'selectedLangLevel', index)}
                                                                        options={this.state.languageLevel}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                <Icon style={{ color: '#ff0000', cursor: 'pointer', marginBottom: 5 }} onClick={() => this.onRemove('languages', 'languageData', index)}>highlight_off</Icon>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col lg="12" sm="12" className="mb-4">
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <div className="row">
                                                <h6>Detailed Education Information</h6>
                                                <div className="form-group row col-md-12" style={{ float: 'left', marginBottom: 10 }}>
                                                    <Button theme="accent" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} className="mt-3" onClick={this.addEducation}>
                                                        Add Education History
        </Button>
                                                </div>
                                                {this.state.education.map((data, index) => {
                                                    return <div style={{ marginBottom: 10 }}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}><h6 style={{ color: '#4267b2', marginBottom: 0 }}>Education Details {index + 1}</h6><Icon style={{ color: '#ff0000', cursor: 'pointer', marginLeft: 5 }} onClick={() => this.onRemove('education', 'educationData', index)}>highlight_off</Icon></div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Institute Name</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={educationData[index] && educationData[index].instituteName} className="form-control" onChange={(e) => this.onEducationDataChange(e.target.value, 'instituteName', index)} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Degree</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={educationData[index] && educationData[index].degree} className="form-control" onChange={(e) => this.onEducationDataChange(e.target.value, 'degree', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="row form-group">
                                                                    <div className="col-md-4">
                                                                        <label>Degree Type</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <Select
                                                                            defaultValue={this.state.jobType[0]}
                                                                            isSearchable={true}
                                                                            name="Degree"
                                                                            value={educationData[index] && educationData[index].selectedDegreeType}
                                                                            placeholder="Job Type"
                                                                            onChange={(val) => this.onEducationDataChange(val, 'selectedDegreeType', index)}
                                                                            options={this.state.jobType}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Duration</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <RangeDatePicker onStartDateChange={(selectedDate) => this.onEducationDataChange(selectedDate, 'startDate', index)} onEndDateChange={(selectedDate) => this.onEducationDataChange(selectedDate, 'endDate', index)} startDate={educationData[index] && educationData[index].startDate ? educationData[index].startDate : null} endDate={educationData[index] && educationData[index].endDate ? educationData[index].endDate : null} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4">
                                                                        <label>Link</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={educationData[index] && educationData[index].link} className="form-control" onChange={(e) => this.onEducationDataChange(e.target.value, 'link', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4" style={{ display: 'flex' }}>
                                                                        <label>Location</label>
                                                                        <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <input type="text" value={educationData[index] && educationData[index].location} className="form-control" onChange={(e) => this.onEducationDataChange(e.target.value, 'location', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row md-12">
                                                            <div className="col-md-12">
                                                                <div className="form-group row">
                                                                    <div className="col-md-4" style={{ display: 'flex' }}>
                                                                        <label>Description</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <textarea type="text" rows={2} value={educationData[index] && educationData[index].description} className="form-control" onChange={(e) => this.onEducationDataChange(e.target.value, 'description', index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}

                                                <Form.Switch checked={this.state.isMilitary} name="toggle" value="isMilitary" label="Are you Security Cleared" onChange={() => this.setState({ isMilitary: !this.state.isMilitary })} />
                                                <div className="row col-md-12" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 10 }}>
                                                    <Button color="danger" theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={this.onRedirect}>
                                                        Cancel
                                                    </Button>
                                                    <br />
                                                    <Button loading={this.props.loading} color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} theme="accent" className="mt-3" style={{ margin: 10 }} onClick={this.saveJob}>
                                                        Update Info
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Grid.Col>
                            </Grid.Row>
                            <Loader loader={this.props.loading} />
                        </div>
                    </Container>
                </SiteWrapper>
            );
            // }
        }
    }
}


const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    skills: state.reducerMethod.skills,
    error: state.reducerMethod.error,
    saveSeekerProfileResponse: state.reducerMethod.saveSeekerProfileResponse,
    seekerProfileData: state.reducerMethod.seekerProfileData,
    skillsData: state.reducerMethod.skillsData
});

const mapDispatchToProps = {
    getSkills: getSkills,
    addSkill: addSkill,
    saveSeekerProfile: saveSeekerProfile,
    getSeekerProfile: getSeekerProfile,
    clearDataMethod: clearDataMethod,
    saveSkills: saveSkills
};
export default connect(mapStateToProps, mapDispatchToProps)(SeekerCreateEdit);
