/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Grid,
    Card,
    Button,
    Form
} from "tabler-react";
import Modal from 'react-modal';
// import { Slider } from "shards-react";
import PageTitle from "../components/PageTitle";
import '../index.css';
import { connect } from 'react-redux';
import { saveSkills } from '../redux/Actions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width > 500 ? '80%' : '100%',
        maxHeight: 600
    }
};

class ScoreModal extends React.Component {
    constructor(props) {
        super(props);
        const slidersValue = [];
        props.skillValues.forEach(element => {
            if (props.skillsData && props.skillsData[props.type + 'Skills'])
                slidersValue[element.label] = props.skillsData[props.type + 'Skills'][element.label] ? props.skillsData[props.type + 'Skills'][element.label] : [];
        });
        this.state = { slidersValue: slidersValue, isSubmit: false, score: 0 }
    }

    onChangeSlide = (values, key, index) => {
        let stateData = this.state.slidersValue;
        let data = stateData[key] ? stateData[key] : [];
        data[index] = parseInt(values);
        stateData[key] = data;
        this.setState({ slidersValue: stateData });
    }

    onSubmit = () => {
        const keys = Object.keys(this.state.slidersValue);
        let totalScore = 0;
        keys.map(data => {
            totalScore = totalScore + this.state.slidersValue[data].reduce((a, b) => a + b);
        })
        const skillsData = this.props.skillsData ? this.props.skillsData : {};
        skillsData[this.props.type + 'Skills'] = this.state.slidersValue;
        skillsData[this.props.type + 'SkillsScore'] = totalScore
        this.props.saveSkills(skillsData);
        this.props.submitSkill();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.getElementById('scoreModal')) {
            this.onSubmit();
        }
    }

    valuetext = (value) => {
        return value;
    }

    render() {
        const { skillValues, type, skillsData, onCancel } = this.props;
        const { slidersValue } = this.state;
        const numberLabel = [
            {
                value: 0,
                label: '0',
            },
            {
                value: 25,
                label: '15',
            },
            {
                value: 50,
                label: '30',
            },
            {
                value: 75,
                label: '45',
            },
            {
                value: 100,
                label: '60',
            },
        ];
        const txtLable = [
            {
                value: 0,
                label: 'Fresher',
            },
            {
                value: 25,
                label: 'Beginner',
            },
            {
                value: 50,
                label: 'Intermediate',
            },
            {
                value: 75,
                label: 'Proffessional',
            },
            {
                value: 100,
                label: 'Expert',
            }
        ];
        return (
            <Container fluid className="main-content-container px-4" >
                <Modal
                    isOpen={true}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={onCancel}
                    style={customStyles}
                    contentLabel="Score System"
                >
                    {/* Page Header */}
                    <Grid.Row noGutters className="page-header" style={{ marginTop: '0px !important' }}>
                        <PageTitle sm="12" title={`${type} Score Board`} subtitle="Calculate your scores"
                        />
                    </Grid.Row>

                    {/* Second Grid.Row of Posts */}
                    {skillValues && skillValues.length && skillValues.map((data, index) => {
                        return <div id="scoreModal"><Grid.Row sm="12" key={index} id="scoreModal">
                            <Grid.Col>
                                <div style={{ marginBottom: '20px' }}>
                                    <Card small className="card-post card-post--aside card-post--1">
                                        <Card.Body>
                                            <PageTitle sm="12" subtitle={`${data.label} Score`}
                                                className="text-sm-left" />

                                            <div style={{ marginTop: '15px' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ width: '-webkit-fill-available' }}>
                                                        <Form.Group label="Knowledge (Years)">
                                                            <Slider
                                                                defaultValue={0}
                                                                value={slidersValue[data.label] && slidersValue[data.label][0] ? slidersValue[data.label][0] : 0}
                                                                getAriaValueText={this.valuetext}
                                                                aria-labelledby="discrete-slider-always"
                                                                step={1}
                                                                marks={numberLabel}
                                                                valueLabelDisplay="on"
                                                                onChange={(value, newValue) => this.onChangeSlide(newValue, data.label, '0')}
                                                                valueLabelDisplay="auto"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ width: '-webkit-fill-available' }}>
                                                        <Form.Group label="Experience (Years)">
                                                            <Slider
                                                                defaultValue={0}
                                                                value={slidersValue[data.label] && slidersValue[data.label][1] ? slidersValue[data.label][1] : 0}
                                                                getAriaValueText={this.valuetext}
                                                                aria-labelledby="discrete-slider-always"
                                                                step={1}
                                                                marks={numberLabel}
                                                                valueLabelDisplay="on"
                                                                onChange={(value, newValue) => this.onChangeSlide(newValue, data.label, '1')}
                                                                valueLabelDisplay="auto"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ width: '-webkit-fill-available' }}>
                                                        <Form.Group label="Ability (Percentage)">
                                                            <Slider
                                                                defaultValue={0}
                                                                value={slidersValue[data.label] && slidersValue[data.label][2] ? slidersValue[data.label][2] : 0}
                                                                getAriaValueText={this.valuetext}
                                                                aria-labelledby="discrete-slider-always"
                                                                step={1}
                                                                marks={txtLable}
                                                                valueLabelDisplay="on"
                                                                onChange={(value, newValue) => this.onChangeSlide(newValue, data.label, '2')}
                                                                valueLabelDisplay="auto"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>

                            </Grid.Col>

                        </Grid.Row>
                        </div>
                    })}
                    <Button color="danger" theme="accent" onClick={onCancel}>Cancel</Button>
                    <Button color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} theme="accent" onClick={() => this.onSubmit()}>Save</Button>
                </Modal>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    saveSkills: saveSkills
};
export default connect(mapStateToProps, mapDispatchToProps)(ScoreModal);