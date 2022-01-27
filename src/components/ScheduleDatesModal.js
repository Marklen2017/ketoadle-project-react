import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Table } from 'tabler-react';
import { getUserType } from '../common-methods';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    iconStyle: {
        fontSize: 24,
        color: '#00af50'
    },
    main: {
        fontSize: 18
    },
    sub: {
        fontSize: 14,
        cursor: 'pointer'
    }
}

const ScheduleDatesModal = ({ scheduleDates }) => {
    const [isOpen, setIsOpen] = useState(false);
    const userType = getUserType();
    const screeSize = window.screen.width;
    return (
        <div style={styles.container}>
            <div style={styles.main}>Auto Schedule</div>
            <Icon style={styles.iconStyle} onClick={() => setIsOpen(true)}>visibility</Icon>
            <div style={styles.sub} onClick={() => setIsOpen(true)}>View All Interview Dates</div>
            {isOpen && <Modal
                isOpen={isOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Schedule Interview"
            >
                <Table>
                    <Table.Header style={{backgroundColor:'#00af50'}}>
                        <Table.ColHeader>Date/Time</Table.ColHeader>
                        <Table.ColHeader>Name</Table.ColHeader>
                        <Table.ColHeader>Job Ref</Table.ColHeader>
                        <Table.ColHeader>View</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                        {scheduleDates && scheduleDates.data && scheduleDates.data.length ? scheduleDates.data.map((data, index) => {
                            const formattedDate = data.selectedDate ? data.selectedDate.split('To') : [];
                            const startDate = new Date(formattedDate[0]).toLocaleString();
                            const endDate = new Date(formattedDate[1]).toLocaleString();
                            if (formattedDate.length && formattedDate.length >= 2) {
                                return <Table.Row>
                                    <Table.Col><div>From: {startDate}</div><div> To: {endDate}</div></Table.Col>
                                    <Table.Col>{userType === 'recruiter' ? (data.jobSeekerId ? `Interview for ${data.jobSeekerId.name}` : `Interview for ${data.jobId}`) : (data.recruiterId ? `Interview for ${data.recruiterId.name}` : `Interview for ${data.jobId}`)}</Table.Col>
                                    <Table.Col><div title={data.jobId} style={screeSize<500?{width: 50,
                            overflow: 'hidden',
                            display: 'inline-block',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',}:{}}>{data.jobId}</div></Table.Col>
                                    <Table.Col><Link style={{ textDecoration: 'none' }} to={`/job-posts?jobId=${data.jobId}`}><Icon title="View">remove_red_eye</Icon></Link></Table.Col>
                                </Table.Row>
                            }
                        })
                            : <Table.Row><Table.Col>Your currently don’t have any interviews dates booked</Table.Col></Table.Row>}
                    </Table.Body>
                </Table>
            </Modal>}
        </div>
    )
}

export default ScheduleDatesModal;