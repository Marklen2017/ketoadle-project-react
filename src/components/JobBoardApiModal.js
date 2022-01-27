import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BASE_URL } from '../redux/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomApiKey } from '../redux/Actions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: 100
    }
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    viewContent: {
        display: 'flex',
        cursor: 'pointer'
    },
    text: {
        color: '#00af50',
        marginLeft: 2
    },
    content: {
        display: 'flex'
    },
    subText: {
        fontSize: 18,
        color: '#4267b2'
    },
    problemTxt: {
        color: '#4267b2',
        marginTop: 10
    }
}

const JobBoardApiModal = ({ onClose, isSeeker, profile }) => {
    const { customApiKey, loading } = useSelector(state => state.reducerMethod);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCustomApiKey());
    }, []);

    return (
        <Modal
            isOpen={true}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Job and Media API's"
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={styles.text}>Your Custom API Request</div>
                <span> (Request Method: Get)</span>
            </div>
            {!loading && (customApiKey && customApiKey.data ? <div>{isSeeker ? <div style={{ display: 'flex', marginTop: 10 }}>
                <div style={styles.text}>Portfolio API : </div>
                {profile && profile._id ? <div style={{ backgroundColor: '#c1c1c1' }}>{BASE_URL + 'api/public/getJobSeeker?jobSeekerId=' + profile._id + '&apiKey=' + customApiKey.data.apiKey}</div> : <div>Something went wrong...Please try again</div>}
            </div> :
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    <div style={styles.text}>Live Job API : </div>
                    <div style={{ backgroundColor: '#c1c1c1' }}> {BASE_URL + 'api/public/getJobs?apiKey=' + customApiKey.data.apiKey}</div>
                </div>}
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                    <div style={styles.subText}>If you are unsure how to use it then plese follow the given instructions.</div>
                    <div style={styles.text}>Instructions to integrate:-</div>
                    <div style={styles.text}>1. Copy the API given above.</div>
                    <div style={styles.text}>2. Download the postman or add chrome extension to test the API.</div>
                    <div style={styles.text}>3. Paste the URL in postman URL space</div>
                    <div style={styles.text}>4. Select GET method from adjacent dropbox to the left.</div>
                    <div style={styles.text}>5. Click on SEND button on the right side.</div>
                    <div style={styles.text}>6. You can see the result of API you will get.</div>
                    <div style={styles.text}>7. You can integrate your {isSeeker ? 'portfolio' : 'jobs'} from the output.</div>
                    <div style={styles.text}>8. Put redirect URL onClick on component.</div>
                    <div style={styles.text}>9. You can integrate the API in your website using fetch or axios.</div>
                    <div style={styles.text}>10. You can click if using <a href="https://support.wix.com/en/article/corvid-accessing-third-party-services-with-the-fetch-api" target="_blank">Wix</a> , <a href="https://wpgeorgetown.com/2018/10/04/integrating-3rd-party-apis-with-wordpress/" target="_blank">Wordpress</a> here.</div>
                </div>
            </div> : <div>Something went wrong...Please try again</div>)}
        </Modal>
    )
}

export default JobBoardApiModal;