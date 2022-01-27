import React from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import { getUrlTextLink } from "../common-methods";

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
        maxHeight: 700,
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
    boxTitle: {
        fontSize: 16,
        color: '#00af50'
    },
    boxContainer: {
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        margin: window.screen.width > 500 ? 10 : 0
        // boxShadow: '0 0 10px #404040'
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
    refBoxTitle: {
        width: 100,
        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginRight:20
    },
}

const MediaModal = ({ data, onClose }) => {
    const date = new Date(data.endDate);
    const startDate = new Date(data.startDate);
    const linkText = getUrlTextLink(data.webLink);
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
                        <div><span style={styles.boxTitle}>Ref:</span> <span style={window.screen.width > 500 ? {} : styles.refBoxTitle}>{data._id}</span></div>
                        <div><span style={styles.boxTitle}>Start Date</span> {startDate.toLocaleDateString()}</div>
                        <div><span style={styles.boxTitle}>End Date</span> {date.toLocaleDateString()}</div>
                        <div><Icon onClick={onClose} title="Close" style={{ cursor: 'pointer' }}>close</Icon></div>
                    </div>
                    <div style={styles.score}>
                        <div style={styles.scoreTitle}>Title</div>
                        <div style={styles.scoreValue}>{data.title}</div>
                    </div>
                    <div style={styles.boxMain}>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxValue}>Category</div>
                            <span style={styles.boxTitle}>{data.category}</span>
                        </div>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxValue}>Cost</div>
                            <span style={styles.boxTitle}>{data.cost}</span>
                        </div>
                        <div style={styles.boxContainer}>
                            <div style={styles.boxValue}>Link</div>
                            <span style={styles.boxTitle} dangerouslySetInnerHTML={{ __html: linkText }}></span>
                        </div>
                    </div>
                    <div style={styles.benefitsCont}>
                        <div style={styles.boxValue}>Tags</div>
                        {data.tags && data.tags.length && data.tags.map((tag,index)=>(
                            <div style={styles.benefits} key={index}>{tag}</div>
                        ))}
                    </div>
                    <div style={styles.boxContainer}>
                        <div style={styles.boxValue}>Description</div>
                        <p>{data.description}</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MediaModal;