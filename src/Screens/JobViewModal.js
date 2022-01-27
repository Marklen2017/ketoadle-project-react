import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import {
    Grid,
    Card,
    Alert,
    Button
} from "tabler-react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width > 500 ? '70%' : '95%',
        marginTop: window.screen.width > 500 ? 80 : 170,
        padding: 0,
        height: 700,
        paddingBottom: 150
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        padding: 20
    },
    jobref: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    score: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },
    scoreTitle: {
        fontSize: 18,
        color: '#2196f3'
    },
    scoreValue: {
        fontSize: 22
    },
    jobContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    jobTitle: {
        fontSize: 18,
        color: '#00af50'
    },
    jobValue: {
        fontSize: 18
    },
    refBoxTitle: {
        width: 100,
        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginRight: 20
    },
    boxTitle: {
        fontSize: 16,
        color: '#00af50'
    },
    boxContainer: {
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        margin: window.screen.width > 500 ? 10 : 0
    },
    boxSubcont: {
        margin: 10,
        display: 'flex'
    },
    boxValue: {
        fontSize: 16
    },
    boxMain: {
        display: 'flex',
        flexDirection: window.screen.width > 500 ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        backgroundColor: '#fff',
        width: '100%',
        margin: 10
    },
    benefits: {
        color: '#00af50',
        marginRight: 10,
        marginLeft: 10
    },
    benefitsCont: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        margin: 10
    },
    refContaine: {
        display: 'flex',
        alignItems: 'center'
    }
}

const JobModal = ({ data, onClose }) => {
    const date = new Date(data.postDate)
    return (
        <div style={styles.container}>
            <Modal
                isOpen={true}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={onClose}
                style={customStyles}
                contentLabel="Schedule Interview"
            >
                <div style={styles.container}>
                    <div style={styles.jobref}>
                        <div style={styles.refContaine}><span style={styles.boxTitle}>Ref:</span> <span style={window.screen.width > 500 ? {} : styles.refBoxTitle}>{data._id}</span></div>
                        <div><span style={styles.boxTitle}>Advert end:</span> {date.toLocaleDateString()}</div>
                        <div><Icon onClick={onClose} title="Close" style={{ cursor: 'pointer' }}>close</Icon></div>
                    </div>
                    <div style={styles.score}>
                        <div style={styles.scoreTitle}>Score Match</div>
                        <div style={styles.scoreValue}>{data.totalScore}</div>
                    </div>
                    <div style={styles.jobContainer}><span style={styles.jobTitle}>Title: </span><span style={styles.jobValue}>{data.title}</span></div>
                    <div style={styles.boxMain}>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxSubcont}>
                                <span style={styles.boxTitle}>Type: </span>
                                <span style={styles.boxValue}>{data.jobType}</span>
                            </div>
                            <div style={styles.boxSubcont}>
                                <span style={styles.boxTitle}>Salary Type: </span>
                                <span style={styles.boxValue}>{data.salaryType}</span>
                            </div>
                            <div style={styles.boxSubcont}>
                                <span style={styles.boxTitle}>Location: </span>
                                <span style={styles.boxValue}><a href={data.location} style={{ textDecoration: 'none' }} target="_blank"><Icon title="Location">person_pin_circle_icon</Icon></a></span>
                            </div>
                        </div>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxValue}>Required Soft Skills</div>
                            {data.softSkills.map((item, id) => {
                                const key = Object.keys(item) && Object.keys(item)[0];
                                return <div item={id}><span style={styles.boxTitle}>{key}:</span><span style={styles.boxValue}>{JSON.parse(item[key]).reduce((a, b) => a + b, 0)}</span></div>
                            })}
                        </div>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxValue}>Required Hard Skills</div>
                            {data.hardSkills.map((item, id) => {
                                const key = Object.keys(item) && Object.keys(item)[0];
                                return <div item={id}><span style={styles.boxTitle}>{key}:</span><span style={styles.boxValue}>{JSON.parse(item[key]).reduce((a, b) => a + b, 0)}</span></div>
                            })}
                        </div>
                    </div>
                    <div style={styles.benefitsCont}>
                        <div style={styles.boxValue}>Benefits</div>
                        {data.benifits.map((key, id) => {
                            const benefits = JSON.parse(key)
                            return <div key={id} style={styles.benefits}>{`${benefits.travel ? 'Travel: ' + benefits.travel + ', ' : ''}${benefits.holidays ? 'Holidays: ' + benefits.holidays + ', ' : ''}${benefits.healthcare ? 'Healthcare: ' + benefits.healthcare + ', ' : ''}${benefits.parking ? 'Others: ' + benefits.parking : ''}`}</div>
                        })}
                    </div>
                    <div style={styles.boxContainer}>
                        <div style={styles.boxValue}>Description</div>
                        <p>{data.description}</p>
                    </div>
                    <div style={styles.boxContainer}>
                        <div style={styles.boxValue}>Questions</div>
                        <div style={styles.boxSubcont}>
                            {data.questions.map((key, id) => (
                                <div key={id} style={styles.jobTitle}>{key}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default JobModal;