import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import {
    Button
} from "tabler-react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequest, acceptRequest, rejectRequest } from '../redux/Actions';
import Loader from '../Loader';
import { authCheckToaster } from '../redux/AuthCheckToaster';
import UserInfoPopup from '../Screens/UserInfoPopup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width > 500 ? '50%' : '90%',
        minHeight:100
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
    }
}

const FriendRequestModal = ({ isModalOpen, onClose }) => {
    const [friendRequestData, setFriendRequestData] = useState(null);
    // const [isEdit, setIsEdit] = useState(false);
    const { friendRequests, acceptFriendRequestResponse, rejectFriendRequestResponse, loading } = useSelector(state => state.reducerMethod);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendRequest());
    }, []);

    useEffect(() => {
        if (friendRequests && !friendRequests.error) {
            setFriendRequestData(friendRequests.data);
        }
    }, [friendRequests]);

    useEffect(() => {
        if (acceptFriendRequestResponse && !acceptFriendRequestResponse.error) {
            dispatch(getFriendRequest());
        }
    }, [acceptFriendRequestResponse, dispatch]);

    useEffect(() => {
        if (rejectFriendRequestResponse && !rejectFriendRequestResponse.error) {
            dispatch(getFriendRequest());
        }
    }, [dispatch, rejectFriendRequestResponse]);

    const onRequestAccept = (id) => {
        dispatch(acceptRequest(id));
    }

    const onRejectAccept = (id) => {
        dispatch(rejectRequest(id));
    }

    return (
        <Modal
            isOpen={isModalOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Schedule Interview"
        >
            <div style={styles.text}>Friend Requests
                        <span style={{ marginLeft: 20, paddingTop: 1, fontSize: 16, cursor: 'pointer' }} title="Delete" ><i class="fa fa-users" aria-hidden="true"></i></span>
            </div>
            <div>{friendRequestData && friendRequestData.map((data, index) => {
                return <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row',alignItems:'center' }}>
                        <UserInfoPopup info={data.requestFrom} isRequestScreen={true} />
                        <div><Button theme="accent" className="mt-3 ml-10" color="primary" style={{ backgroundColor: '#00af50', borderColor: '#00af50', width: '100%', marginTop: 20, marginBottom: 20 }} onClick={() => onRequestAccept(data._id)}><i class="fa fa-check-square" aria-hidden="true"></i></Button>
                            <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} color="danger" onClick={() => onRejectAccept(data._id)}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                        </div>
                    </div>
                </div>
            })}</div>
            {/* <Loader loader={loading} /> */}
        </Modal>
    )
}

export default FriendRequestModal;