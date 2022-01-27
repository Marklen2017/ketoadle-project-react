/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Grid,
  Card,
  Badge,
  Button,
  Alert,
  Form
} from "tabler-react";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getSkills, addSkill, saveJobMethod, getJobData, clearDataMethod, saveSkills } from '../redux/Actions';
import Loader from '../Loader';
import RangeDatePicker from "../components/RangeDatePicker";
import Select from 'react-select';
import Icon from '@material-ui/core/Icon';
import PageTitle from "../components/PageTitle";
// import JobAdvertDetailFooter from "../components/skills/job-advert/JobAdvertDetailFooter";
import CreatableSelect from 'react-select/creatable';
import SoftSkillModal from './SoftSkillModal';
import HardSkillModal from './HardSkillModal';
import ScoreModal from './ScoreModal';
import { ToastContainer, toast } from 'react-toastify';
import { authCheckToaster } from '../redux/AuthCheckToaster';

import SiteWrapper from "../SiteWrapper.react";
import { getAccessToken } from '../common-methods';
import Toaster from "../redux/Toaster";

let that;
class CreateEditJob extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      softSkills: [],
      hardSkill: "",
      hardSkills: [],
      skillValues: [],
      type: "",
      softSkillArray: [],
      hardSkillArray: [],
      modalIsOpen: false,
      isEditJob: true,
      jobType: [{ label: 'Full-time Permanent', value: 'fullTimePermanent' }, { label: 'Part-time Permanent', value: 'partTimePermanent' }, { label: 'Contractor', value: 'contractor' }, { label: 'Internship', value: 'internship' }, { label: 'Freelancer', value: 'freelancer' }, { label: 'Volunteer', value: 'volunteer' }, { label: 'Full-time Temporary', value: 'fullTimeTemporary' }, { label: 'Part-time Temporary', value: 'partTimeTemporary' }],
      selectedType: { label: 'Full-time Permanent', value: 'fullTimePermanent' }, salaryType: [{ label: 'Annual', value: 'Annual' }, { label: 'Day-Rate', value: 'Day-Rate' }],
      selectedSalary: { label: 'Annual', value: 'Annual' }, isAlert: true,
      questions: [0], questionsData: [], description: '', isDetail: this.props.isDetails, skillsData: {}, isMilitary: false
    };
    this.setData(true);
    const jobId = this.getJobId();
    if (!jobId) {
      this.props.clearDataMethod && this.props.clearDataMethod();
    }
    that = this;
  }

  getJobId = () => {
    return this.props.jobId ? this.props.jobId : (this.props.match && this.props.match.params && this.props.match.params.id ? this.props.match.params.id : null);
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
    if (nextProps.skillsData && nextProps.skillsData !== this.props.skillsData) {
      this.setState({ skillsData: nextProps.skillsData, type: null });
    }

    if (nextProps.skills && nextProps.skills !== this.props.skills) {
      if (nextProps.skills.skills) {
        let skillsData = nextProps.skills.skills;
        let softSkillArray = this.state.softSkills;
        softSkillArray = skillsData.filter(obj => obj.type === 'soft');
        let hardSkillArray = this.state.hardSkillArray;
        hardSkillArray = skillsData.filter(obj => obj.type === 'hard');
        this.setState({ softSkillArray, hardSkillArray });
      }
    }
    if (nextProps.jobData && nextProps.jobData !== this.props.jobData) {
      if (nextProps.jobData.data && !nextProps.jobData.error) {
        let data = nextProps.jobData.data;
        let questions = [];
        data.questions.map((que, index) => {
          questions.push(index);
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

        const isEditJobResp = this.isEditableJob(data.createdAt);
        const benefits = JSON.parse(data.benifits);
        this.setState({
          title: data.title,
          selectedSalary: { label: (data.salaryType.charAt(0).toUpperCase() + data.salaryType.slice(1)), value: (data.salaryType.charAt(0).toUpperCase() + data.salaryType.slice(1)) },
          startDate: new Date(data.postDate),
          endDate: new Date(data.expiryDate),
          amount: data.amount,
          isEditJob: isEditJobResp,
          selectedType: { label: (data.jobType.charAt(0).toUpperCase() + data.jobType.slice(1)), value: (data.salaryType.charAt(0).toUpperCase() + data.salaryType.slice(1)) },
          location: data.location,
          holidays: benefits.holidays,
          travel: benefits.travel,
          healthcare: benefits.healthcare,
          parking: benefits.parking,
          name: data.clientName,
          email: data.clientEmail,
          phone: data.clientContact,
          companyName: data.clientCompany,
          description: data.description,
          questions: questions,
          questionsData: data.questions,
          softSkills: softSkillsArray,
          hardSkills: hardSkillsArray,
          skillsData,
          isMilitary: data.army
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
    const jobId = this.getJobId();
    if (jobId)
      this.props.getJobData(jobId);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  isSubmitEnable = () => {
    const { skillsData } = this.state;
    const softScore = skillsData ? parseFloat(skillsData['SoftSkillsScore'] || 0.00) : '0.00';
    const hardScore = skillsData ? parseFloat(skillsData['HardSkillsScore'] || 0.00) : '0.00';
    if ((!softScore && !hardScore) || !this.state.title || !this.state.startDate || !this.state.endDate) {
      return false;
    }
    return true;
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.currentTarget.getElementById('createJob') && !this.state.type && !this.state.isFocused) {
      this.saveJob();
    }
  }

  onStartDateChange = (selectedDate) => {
    this.setState({ startDate: selectedDate });
  }

  onEndDateChange = (selectedDate) => {
    this.setState({ endDate: selectedDate });
  }


  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  saveJob = () => {
    if (!this.isSubmitEnable()) {
      Toaster('Title, Start date , End date and Skills score is required', 'warning');
      return;
    }
    const softScore = this.state.skillsData && this.state.skillsData['SoftSkillsScore'] ? this.state.skillsData['SoftSkillsScore'] : 0;
    const hardScore = this.state.skillsData && this.state.skillsData['HardSkillsScore'] ? this.state.skillsData['HardSkillsScore'] : 0;

    const softSkillArray = [];
    this.state.skillsData && this.state.skillsData['SoftSkills'] && Object.keys(this.state.skillsData['SoftSkills']).map(data => {
      softSkillArray.push({ [data]: JSON.stringify(this.state.skillsData['SoftSkills'][data]) });
    })

    const hardSkillArray = [];
    this.state.skillsData && this.state.skillsData['HardSkills'] && Object.keys(this.state.skillsData['HardSkills']).map(data => {
      hardSkillArray.push({ [data]: JSON.stringify(this.state.skillsData['HardSkills'][data]) });
    })

    const benefits = JSON.stringify({ travel: this.state.travel, holidays: this.state.holidays, healthcare: this.state.healthcare, parking: this.state.parking });
    let request = {
      "title": this.state.title,
      "salaryType": this.state.selectedSalary.value.toLowerCase(),
      "postDate": this.state.startDate,
      "expiryDate": this.state.endDate,
      "amount": this.state.amount,
      "jobType": this.state.selectedType.label.toLowerCase(),
      "location": this.state.location,
      "hardSkills": hardSkillArray,
      "softSkills": softSkillArray,
      "benifits": benefits,
      "clientName": this.state.name,
      "clientEmail": this.state.email,
      "clientContact": this.state.phone,
      "clientCompany": this.state.companyName,
      "description": this.state.description,
      "army": this.state.isMilitary,
      "questions": this.state.questionsData,
      "totalScore": softScore + hardScore
    }
    const jobId = this.getJobId();
    if (authCheckToaster() && jobId) {
      this.props.saveJobMethod(request, jobId);
    }
    else {
      this.props.saveJobMethod(request, jobId);
    }
  }

  setData = (isClear) => {
    if (isClear) {
      this.props.clearDataMethod && this.props.clearDataMethod();
      this.setState({
        title: '',
        selectedSalary: { label: 'Annual', value: 'Annual' },
        startDate: '',
        endDate: '',
        amount: '',
        selectedType: { label: 'Permanent', value: 'Permanent' },
        location: '',
        holidays: '',
        name: '',
        email: '',
        phone: '',
        companyName: '',
        description: '',
        questions: [0],
        questionsData: [],
        softSkills: [],
        hardSkills: []
      });
      this.props.saveSkills({});
    }
  }

  dismiss = () => {
    this.setState({ isAlert: false });
  }

  jobSuccess = (message) => {
    // <Alert className="alert alert-success" dismissible={this.dismiss} open={this.state.isAlert}>
    //   <i class="fas fa-info"></i> {message.message}
    // </Alert>
    this.setData(true);
    return <Redirect to="/job-posts" />
    // return toast.success('Successfully Updated', {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }

  addQuestions = () => {
    let questions = this.state.questions;
    questions.push(this.state.questions.length);
    this.setState({ questions });
  }

  onQuestionDataChange = (e, index) => {
    let questionsData = this.state.questionsData;
    questionsData[index] = e.target.value;
    this.setState({ questionsData });
  }

  closePop = () => {
    return <div><Link to="/job-posts">Close</Link></div>
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

  submitSkill = () => {
    this.setState({ type: null });
  }

  render() {
    const { saveJobResponse } = this.props;
    const jobId = this.getJobId();
    const { isDetail, skillsData } = this.state;
    const softScore = skillsData ? parseFloat(skillsData['SoftSkillsScore'] || 0.00) : '0.00';
    const hardScore = skillsData ? parseFloat(skillsData['HardSkillsScore'] || 0.00) : '0.00';
    let userToken = getAccessToken();
    if (!userToken)
      return <Redirect to="/" />
    else {
      return (
        <SiteWrapper>
          <Container fluid className="main-content-container px-4" style={{ paddingBottom: 50 }}>
            {this.state.type && <ScoreModal onCancel={() => this.setState({ type: null })} skillValues={this.state.skillValues} skillsData={this.state.skillsData} type={this.state.type} submitSkill={this.submitSkill} />}
            {/* Page Header */}
            {!isDetail ? <Grid.Row noGutters className="page-header py-4">
              <PageTitle
                sm="4"
                title="Job"
                subtitle={`${jobId ? (isDetail ? 'Job Detail' : 'Update Job') : 'Create Job'}`}
                className="text-sm-left"
              />
            </Grid.Row> :
              <Grid.Row noGutters className="page-header py-4">
                <PageTitle sm="4" title={'Job Detail'} subtitle={<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Link style={{ fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#4267b2' }} to="/job-posts">
                  <Icon style={{ fontSize: 12 }}>arrow_back</Icon>Back to Jobs </Link> ( {jobId} )</div>} className="text-sm-left" />
              </Grid.Row>}

            {/* Second Grid.Row of Posts */}
            <div id="createJob">
              <Grid.Row>
                <Grid.Col lg="12" sm="12" className="mb-4" style={isDetail ? { marginTop: 70 } : {}}>
                  <Card className="card-post card-post--aside card-post--1">
                    <Card.Body>
                      <h5 className="card-title">
                        <a className="text-fiord-blue" >
                          Job Advert Details
              </a>
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col-md-4">
                              <label>Job Title</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" value={this.state.title} className="form-control" onChange={(e) => this.setState({ title: e.target.value })} disabled={isDetail} />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-4">
                              <label>Job Type</label>
                            </div>
                            <div className="col-md-8">
                              <Select
                                defaultValue={this.state.jobType[0]}
                                isSearchable={true}
                                name="type"
                                value={this.state.selectedType}
                                placeholder="Job Type"
                                onChange={(val) => this.setState({ selectedType: val })}
                                options={this.state.jobType}
                                isDisabled={isDetail}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row form-group">
                            <div className="col-md-4">
                              <label>Salary Type</label>
                            </div>
                            <div className="col-md-8">
                              <Select
                                defaultValue={this.state.salaryType[0]}
                                isSearchable={true}
                                name="type"
                                value={this.state.selectedSalary}
                                placeholder="Job Type"
                                onChange={(val) => this.setState({ selectedSalary: val })}
                                options={this.state.salaryType}
                                isDisabled={isDetail}
                              />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-4">
                              <label>Amount</label>
                            </div>
                            <div className="col-md-8">
                              <input placeholder="eg: $100, €50, £80, Free etc" disabled={isDetail} type="text" value={this.state.amount} className="form-control" onChange={(e) => this.setState({ amount: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col-md-4">
                              <label>Job Date</label>
                            </div>
                            <div className="col-md-8">
                              {/* <input type="text" className="form-control" /> */}
                              <RangeDatePicker isJob={true} isDetail={isDetail} onStartDateChange={this.onStartDateChange} onEndDateChange={this.onEndDateChange} startDate={this.state.startDate} endDate={this.state.endDate} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col-md-4" style={{ display: 'flex' }}>
                              <label>Location</label>
                              <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
                            </div>
                            <div className="col-md-8">
                              <input disabled={isDetail} type="text" value={this.state.location} className="form-control" onChange={(e) => this.setState({ location: e.target.value })} />
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
                    <small><SoftSkillModal /></small>
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
                          isDisabled={isDetail}
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
                          {this.state.softSkills && this.state.softSkills.length && !isDetail ? (
                            <Button
                              theme="accent"
                              onClick={() => this.handleScoreBoard("soft")}
                              color="primary"
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
                    <small><HardSkillModal /></small>
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
                          isDisabled={isDetail}
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
                          {this.state.hardSkills && this.state.hardSkills.length && !isDetail ? (
                            <Button
                              theme="accent"
                              onClick={() => this.handleScoreBoard("hard")}
                              color="primary"
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
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <h4>Benefits <small>(Optional)</small></h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col-md-4">Holidays</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" value={this.state.holidays} type="text" onChange={(e) => this.setState({ holidays: e.target.value })} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">Travel</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" value={this.state.travel} type="text" onChange={(e) => this.setState({ travel: e.target.value })} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col-md-4">Healthcare</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" value={this.state.healthcare} type="text" onChange={(e) => this.setState({ healthcare: e.target.value })} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">Other</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" type="text" value={this.state.parking} onChange={(e) => this.setState({ parking: e.target.value })} />
                              </div>
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
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <h4>Client Info</h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col-md-4">Full Name</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" value={this.state.name} type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">Email Address</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <div className="col-md-4">Contact Number</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" type="text" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">Company Name</div>
                              <div className="col-md-8">
                                <input disabled={isDetail} className="form-control" type="text" value={this.state.companyName} onChange={(e) => this.setState({ companyName: e.target.value })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Grid.Col>
              </Grid.Row>
              <div style={{ marginBottom: 70 }}>
                <Grid.Col lg="12" sm="12" className="mb-4 p-0">
                  <Card small className="card-post card-post--aside card-post--1 mb-60">
                    <Card.Body>
                      <div>
                        <h6>Detailed Job Information</h6>
                        <textarea onKeyDown={this.handleKeyDown} onFocus={this.handleKeyDown} disabled={isDetail} className="form-control" type="text" value={this.state.description} placeholder="Job Description" onChange={(e) => this.setState({ description: e.target.value })} onFocus={() => this.setState({ isFocused: true })} onBlur={() => this.setState({ isFocused: false })} />
                        <div style={{ marginBottom: 10 }}>
                          {!isDetail && <Button theme="accent" className="mt-3" onClick={this.addQuestions} color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }}>
                            Add Questions
        </Button>}
                        </div>
                        {this.state.questions.map((data, index) => {
                          return <div style={{ marginBottom: 10 }}><input disabled={isDetail} className="form-control" value={this.state.questionsData[index]} type="text" placeholder={`Question ${data + 1}`} onChange={(e) => this.onQuestionDataChange(e, data)} /></div>
                        })}
                        <Form.Switch checked={this.state.isMilitary} name="toggle" value="isMilitary" label="This role requires the individual to have Security Clearance" onChange={() => this.setState({ isMilitary: !this.state.isMilitary })} />
                        {!isDetail && <div className="text-right" style={{ display: 'flex', float: 'right' }}>
                          {jobId ? <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} color="danger">
                            <Link to="/job-posts" style={{ color: 'white', textDecoration: 'none' }}> Cancel job</Link>
                          </Button> : <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={this.props.history.goBack} color="danger">
                              Cancel job
          </Button>}
                          <br />
                          <Button loading={this.props.loading} theme="accent" className="mt-3 ml-10" onClick={this.saveJob} color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} title={jobId ? (this.state.isEditJob ? "Update Job" : "You can not edit this job after 15 minutes of it's creation") : ((softScore || hardScore) ? "Create Job" : "Add skills and other info to create a job")}>
                            {jobId ? 'Update job' : 'Create job'}
                          </Button>
                        </div>}
                      </div>
                    </Card.Body>
                  </Card>
                </Grid.Col>
              </div>
              {saveJobResponse && (saveJobResponse.error ?
                <Alert className="alert alert-danger">
                  <i className="fa fa-exclamation-triangle mx-2"></i> {saveJobResponse && saveJobResponse.message}
                </Alert> : this.jobSuccess(saveJobResponse))}
              {/* <ToastContainer autoClose={3000} closeButton={this.closePop}/> */}
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
  skills: state.reducerMethod.skills,
  error: state.reducerMethod.error,
  saveJobResponse: state.reducerMethod.saveJobResponse,
  jobData: state.reducerMethod.jobData,
  skillsData: state.reducerMethod.skillsData
});

const mapDispatchToProps = {
  getSkills: getSkills,
  addSkill: addSkill,
  saveJobMethod: saveJobMethod,
  getJobData: getJobData,
  clearDataMethod: clearDataMethod,
  saveSkills: saveSkills
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditJob);
