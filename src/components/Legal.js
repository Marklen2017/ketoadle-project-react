import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import Modal from 'react-modal';
import {
    Grid,
    Card,
    Alert,
    Button
} from "tabler-react";
import { useDispatch, useSelector } from 'react-redux';
import CookieModal from '../components/CookieModal';
import { saveFeedback } from '../redux/Actions';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        height: '92vh',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width > 500 ? '80%' : '95%',
        backgroundColor: '#f1f1f1',
        marginTop:40
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
        height: '70vh',
        justifyContent: 'space-around'
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
    subInputContainer: {
        width: '45%',
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    header: {
        backgroundColor: '#4267b2',
        color: '#fff',
        padding: 10,
        paddingTop: 0
    },
    headerMain: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 22,
        fontWeight: 'bold',
        flexWrap:'wrap'
    },
    footer: {
        backgroundColor: '#00af50',
        color: '#fff',
        fontSize: 22,
        padding: 3,
        fontWeight: 'bold',
        textAlign: 'center',
        cursor: 'pointer'
    },
    headerText: {
        fontSize: 10
    },
    mainContainer: {
        width: '70%',
        margin: '0 auto',
        border: '1px solid #f1f1f1',
        backgroundColor: '#fff'
    },
    titleSubText: {
        fontSize: 16
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    horiz: {
        borderTop: '1px solid #d6d0d0',
        width: '85%',
        margin: '0 auto',
        marginBottom: 20
    },
    sepratorHoriz: {
        borderTop: '1px solid #d6d0d0',
        width: '85%',
        margin: '0 auto',
        marginTop: 20,
        marginBottom: 20
    },
    legalTitle: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 22,
        justifyContent: 'center'
    },
    grad: {
        backgroundImage: 'linear-gradient(#4267b2, #00af50)',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        color: '#fff',
        fontWeight: 'bold',
        position: 'relative',
        textAlign:'center'
    },
    legalContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        marginBottom: window.screen.width > 500 ?50:100
    },
    readBtn: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: 'grey',
        position: 'absolute',
        bottom: -20,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'normal',
        cursor: 'pointer',
        fontSize: 14
    },
    cookieModal: {
        position: 'absolute',
        boxShadow: '0 0 10px #404040',
        backgroundColor: '#fff',
        width: '100%',
        height: '50vh',
        marginTop: 100,
        margin: '0 auto',
        bottom: 0
    }
}

const LegalModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmit, setIsSubmit] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [userAdvt, setUserAdvt] = useState(false);
    const [userInvest, setUserInvest] = useState(false);
    const [userSpons, setUserSpons] = useState(false);
    const { feedbackResponse, loading } = useSelector(state => state.reducerMethod);
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
        let userType = userAdvt ? 'Advertisement,' : '';
        userType += userInvest ? 'Investors,' : '';
        userType += userSpons ? 'Sponsors' : '';

        if (!email && !contact) {
            setIsSubmit(true);
            return;
        }

        if (!userType) {
            setIsSubmit(true);
            return;
        }

        let request = {
            "name": name,
            "email": email,
            "mobile": contact,
            "message": feedback,
            'type': userType
        }
        dispatch(saveFeedback(request, true));
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
                    <div style={styles.title}>
                        <div style={styles.headerMain}>Do You Like What You See?</div>
                        <div style={styles.titleSubText}>Contact us to get how you can involved</div>
                    </div>
                    <div style={styles.mainContainer}>

                        <div style={styles.header}>
                            <div style={styles.headerMain}>
                                <div style={{ display: 'flex', alignItems: 'baseline', marginRight: 15 }}>
                                    <input type="checkbox" onChange={() => setUserInvest(!userInvest)} />
                                    <label style={{ marginLeft: 5, marginBottom: 0 }} for="investor"> Investors </label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', marginRight: 15 }}>
                                    <input type="checkbox" onChange={() => setUserSpons(!userSpons)} />
                                    <label style={{ marginLeft: 5, marginBottom: 0 }} for="investor"> Sponsors </label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <input type="checkbox" onChange={() => setUserAdvt(!userAdvt)} />
                                    <label style={{ marginLeft: 5, marginBottom: 0 }} for="investor"> Advertisement </label>
                                </div>
                            </div>
                            <div style={styles.headerText}>Want a piece of action? Now is the best time during our early stage of business and we are looking for long term deals</div>
                        </div>
                        <div>
                            {(isSubmit && !email && !contact) &&
                                <Alert className="alert alert-danger">
                                    <i className="fa fa-exclamation-triangle mx-2"></i> Please Provide Contact or Email
            </Alert>}
                            <div style={styles.inputContainer}>
                                <div style={styles.subContainer}>
                                    <div style={styles.fullWidth}>
                                        <input placeholder="Full Name" className="form-control" value={name} type="text" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div style={styles.subInputContainer}>
                                    <div style={styles.fullWidth}>
                                        <input placeholder="Contact" className="form-control" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div style={styles.subContainer}>
                                <div style={styles.fullWidth}>
                                    <input placeholder="Email Address" className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div style={styles.subContainer}>
                                <div style={styles.fullWidth}>
                                    <textarea placeholder="Write your message here..." onKeyDown={handleKeyDown} className="form-control" type="text" value={feedback} placeholder="Your message" onChange={(e) => setFeedback(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div style={styles.footer} onClick={onSubmit}>Send Message</div>
                    </div>
                    <div style={styles.sepratorHoriz}></div>
                    {/* <div style={styles.legalTitle}>
                        <div style={styles.grad}>
                            Legal
                            <div style={styles.readBtn}>
                                <a href="https://www.iubenda.com/privacy-policy/85889597" class="iubenda-white iubenda-embed" title="Legal " target="_blank">Read</a>
                            </div>
                        </div>
                    </div> */}
                    <div style={styles.legalContainer}>
                        <div style={styles.grad}>Terms & Conditions <div style={styles.readBtn}><a href="https://www.iubenda.com/terms-and-conditions/85889597" target="_blank">Read</a></div></div>
                        <div style={styles.grad}>Privacy Policy<div style={styles.readBtn}><a href="https://www.iubenda.com/privacy-policy/85889597" target="_blank">Read</a></div></div>
                        <div style={styles.grad}>Cookies<div style={styles.readBtn}><a href="https://www.iubenda.com/privacy-policy/85889597/cookie-policy" target="_blank">Read</a></div></div>
                    </div>
                    <Loader loader={loading} />
                </div>
            </Modal>
        </div>
    )
}

export default LegalModal;