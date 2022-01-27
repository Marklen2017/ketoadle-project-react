import React, { useState,useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import {
    Grid,
    Card,
    Alert,
    Button
} from "tabler-react";
import { useDispatch, useSelector } from 'react-redux';
import { saveFeedback } from '../redux/Actions';
import Loader from '../Loader';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width>500?'50%':'80%',
    }
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        height: '70vh'
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
    },
    subContainer: {
        width: '100%',
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fullWidth: {
        width: '100%'
    }
}

const FeedbackModal = ({onClose}) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmit, setIsSubmit] = useState('');
    const {feedbackResponse,loading} = useSelector(state => state.reducerMethod);
    const dispatch = useDispatch();

    useEffect(() => {
        if (feedbackResponse && !feedbackResponse.error && (email || contact)) {
            onClose();
        }
    }, [contact, email, feedbackResponse, onClose]);

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        // In case you have a limitation
        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
    }

    const onSubmit = () => {
        setIsSubmit(false);
        if (!email && !contact) {
            setIsSubmit(true);
            return;
        }
        let request = {
            "name": name,
            "email": email,
            "mobile": contact,
            "message": feedback
        }
        dispatch(saveFeedback(request));
    }

    return (
        <div style={styles.container}>
            <Modal
                isOpen={true}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={onClose}
                style={customStyles}
                contentLabel="Schedule Interview"
            >
                <div>
                    {(isSubmit && !email && !contact) &&
                        <Alert className="alert alert-danger">
                            <i className="fa fa-exclamation-triangle mx-2"></i> Please Provide Contact or Email
            </Alert>}
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Feedback Form</h4>
                        </div>
                    </div>
                    <div style={styles.subContainer}>
                        <div>Full Name</div>
                        <div style={styles.fullWidth}>
                            <input className="form-control" value={name} type="text" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div style={styles.subContainer}>
                        <div>Contact</div>
                        <div style={styles.fullWidth}>
                            <input className="form-control" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                        </div>
                    </div>
                    <div style={styles.subContainer}>
                        <div>Email Address</div>
                        <div style={styles.fullWidth}>
                            <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div style={styles.subContainer}>
                        <div>Feedback</div>
                        <div style={styles.fullWidth}>
                            <textarea onKeyDown={handleKeyDown} className="form-control" type="text" value={feedback} placeholder="Feedback" onChange={(e) => setFeedback(e.target.value)} />
                        </div>
                    </div>
                    <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={onClose} color="danger">Cancel</Button>
                    <Button theme="accent" className="mt-3 ml-10" onClick={onSubmit} color="primary" style={{ backgroundColor: '#00af50', borderColor: '#00af50', width: '100%', marginTop: 20, marginBottom: 20 }}>Submit</Button>
                    <Loader loader={loading} />
                </div>
            </Modal>
        </div>
    )
}

export default FeedbackModal;