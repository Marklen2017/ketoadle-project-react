import { BASE_URL } from './Constants'
import Toaster from './Toaster';
import io from 'socket.io-client';
import { getAccessToken, getUserData } from '../common-methods';

let socket = null;

const connectToSocket = () => {
    return io(BASE_URL);
};

export const suscribeToSocket = (token) => {
    socket = connectToSocket();
    socket.emit('registerSocketUser', token);
    global.socket = socket;
};

export function isShowChat(payload) {
    return {
        type: 'SET_CHAT',
        payload
    }
};

export function signupRequst() {
    return {
        type: 'SIGNUP_REQUEST'
    }
}

export function signupSuccess(payload) {
    return {
        type: 'SIGNUP_SUCCESS',
        payload
    }
}

export function signupFailure(error) {
    return {
        type: 'SIGNUP_FAILURE',
        error
    }
}

export const signUpMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(signupRequst());
        fetch(`${BASE_URL}user/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (!data.error)
                    localStorage.setItem('email', requestBody.email);
                else {
                    dispatch(signupSuccess(data));
                    return data;
                }
                dispatch(signupSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(signupFailure(err));
                console.log('err', err);
            });
    };
};

export function loginRequst() {
    return {
        type: 'LOGIN_REQUEST'
    }
}

export function loginSuccess(payload) {
    return {
        type: 'LOGIN_SUCCESS',
        payload
    }
}

export function loginFailure(error) {
    return {
        type: 'LOGIN_FAILURE',
        error
    }
}
export const loginMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(loginRequst());
        fetch(`${BASE_URL}user/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (!data.error)
                    localStorage.setItem('userData', JSON.stringify(data.data));
                else {
                    dispatch(loginSuccess(data));
                    return data;
                }
                if (data.data) {
                    localStorage.setItem('userName', data.data.name);
                    localStorage.setItem('userImage', data.data.image);
                }
                suscribeToSocket(data.data.token);
                dispatch(loginSuccess(data));
                dispatch(getNotifications());
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(loginFailure(err));
                console.log('err', err);
            });
    };
};

export const socialLogin = (requestBody, isFacebook) => {
    return (dispatch) => {
        dispatch(loginRequst());
        fetch(`${BASE_URL}api/social/googleLogin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (!data.error)
                    localStorage.setItem('userData', JSON.stringify(data.data));
                else {
                    dispatch(loginSuccess(data));
                    return data;
                }
                if (data.data) {
                    localStorage.setItem('userName', data.data.name);
                    localStorage.setItem('userImage', data.data.image);
                    !isFacebook && localStorage.setItem('isSocial', true);
                }
                suscribeToSocket(data.data.token);
                dispatch(loginSuccess(data));
                dispatch(getNotifications());
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(loginFailure(err));
                console.log('err', err);
            });
    };
};

export const logOutMethod = () => {
    return (dispatch) => {
        dispatch(loginSuccess(null));
    }
}

export function verifyAccountRequst() {
    return {
        type: 'VERIFY_ACCOUNT_REQUEST'
    }
}

export function verifyAccountSuccess(payload) {
    return {
        type: 'VERIFY_ACCOUNT_SUCCESS',
        payload
    }
}

export function verifyAccountFailure(error) {
    return {
        type: 'VERIFY_ACCOUNT_FAILURE',
        error
    }
}
export const varifyAccountMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(verifyAccountRequst());
        fetch(`${BASE_URL}user/activate`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                dispatch(verifyAccountSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(verifyAccountFailure(err));
                console.log('err', err);
            });
    };
};


export function resendLinkRequst() {
    return {
        type: 'RESEND_LINK_REQUEST'
    }
}

export function resendLinkSuccess(payload) {
    return {
        type: 'RESEND_LINK_SUCCESS',
        payload
    }
}

export function resendLinkFailure(error) {
    return {
        type: 'RESEND_LINK_FAILURE',
        error
    }
}
export const resendLinkMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(resendLinkRequst());
        fetch(`${BASE_URL}user/resend`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                dispatch(resendLinkSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(resendLinkFailure(err));
                console.log('err', err);
            });
    };
};

export function forgotPasswordRequst() {
    return {
        type: 'FORGOT_PASSWORD_REQUEST'
    }
}

export function forgotPasswordSuccess(payload) {
    return {
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload
    }
}

export function forgotPasswordFailure(error) {
    return {
        type: 'FORGOT_PASSWORD_FAILURE',
        error
    }
}
export const forgotPasswordMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(forgotPasswordRequst());
        fetch(`${BASE_URL}user/forgot`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                dispatch(forgotPasswordSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(forgotPasswordFailure(err));
                console.log('err', err);
            });
    };
};

export function resetPasswordRequst() {
    return {
        type: 'RESET_PASSWORD_REQUEST'
    }
}

export function resetPasswordSuccess(payload) {
    return {
        type: 'RESET_PASSWORD_SUCCESS',
        payload
    }
}

export function resetPasswordFailure(error) {
    return {
        type: 'RESET_PASSWORD_FAILURE',
        error
    }
}
export const resetPasswordMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(resetPasswordRequst());
        fetch(`${BASE_URL}user/reset`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                dispatch(resetPasswordSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(resetPasswordFailure(err));
                console.log('err', err);
            });
    };
};


export function addSkillRequst() {
    return {
        type: 'ADD_SKILL_REQUEST'
    }
}

export function addSkillSuccess(payload) {
    return {
        type: 'ADD_SKILL_SUCCESS',
        payload
    }
}

export function addSkillFailure(error) {
    return {
        type: 'ADD_SKILL_FAILURE',
        error
    }
}
export const addSkill = (requestBody) => {
    return (dispatch) => {
        // dispatch(addSkillRequst());
        fetch(`${BASE_URL}api/skill/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                dispatch(addSkillSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                // dispatch(addSkillFailure(err));
                console.log('err', err);
            });
    };
};


export function saveJobRequst() {
    return {
        type: 'SAVE_JOB_REQUEST'
    }
}

export function saveJobSuccess(payload) {
    return {
        type: 'SAVE_JOB_SUCCESS',
        payload
    }
}

export function saveJobFailure(error) {
    return {
        type: 'SAVE_JOB_FAILURE',
        error
    }
}
export const saveJobMethod = (requestBody, id) => {
    return (dispatch) => {
        let url = id ? `edit/${id}` : 'add';
        dispatch(saveJobRequst());
        fetch(`${BASE_URL}api/job/${url}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Job ${id ? 'Updated' : 'Saved'} Successfully`, 'success');
                dispatch(saveSkills({}));
                dispatch(saveJobSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveJobFailure(err));
                console.log('err', err);
            });
    };
};

export function saveMediaMarketRequst() {
    return {
        type: 'SAVE_MEDIA_MARKET_REQUEST'
    }
}

export function saveMediaMarketSuccess(payload) {
    return {
        type: 'SAVE_MEDIA_MARKET_SUCCESS',
        payload
    }
}

export function saveMediaMarketFailure(error) {
    return {
        type: 'SAVE_MEDIA_MARKET_FAILURE',
        error
    }
}
export const saveMediaMarketMethod = (requestBody, id) => {
    return (dispatch) => {
        let url = id ? `updateMedia/${id}` : 'addMedia';
        dispatch(saveMediaMarketRequst());
        fetch(`${BASE_URL}api/media/${url}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Media ${id ? 'Updated' : 'Saved'} Successfully`, 'success');
                dispatch(saveSkills({}));
                dispatch(saveMediaMarketSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveMediaMarketFailure(err));
                console.log('err', err);
            });
    };
};

export const clearDataMethod = () => {
    return (dispatch) => {
        dispatch(signupSuccess(null));
        dispatch(forgotPasswordSuccess(null));
        dispatch(resetPasswordSuccess(null));
        dispatch(getJobDataSuccess(null));
        dispatch(saveSeekerProfileSuccess(null));
        dispatch(referenceFeedbackSuccess(null));
    }
}

export const clearLoginDataMethod = () => {
    return (dispatch) => {
        dispatch(loginSuccess(null));
    }
}

export function saveSkillsData(payload) {
    return {
        type: 'SAVE_SKILLS',
        payload
    }
}

export const saveSkills = (skills) => {
    return (dispatch) => {
        dispatch(saveJobRequst());
        dispatch(saveSkillsData(skills));
    };
}

export function getSkillsRequst() {
    return {
        type: 'GET_SKILLS_REQUEST'
    }
}

export function getSkillsSuccess(payload) {
    return {
        type: 'GET_SKILLS_SUCCESS',
        payload
    }
}

export function getSkillsFailure(error) {
    return {
        type: 'GET_SKILLS_FAILURE',
        error
    }
}

export const getSkills = () => {
    return (dispatch) => {
        dispatch(getSkillsRequst());
        fetch(`${BASE_URL}api/skill/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getSkillsSuccess(data))
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getSkillsFailure(err));
                console.log('err', err);
            });
    };
};

export function getJobsRequst() {
    return {
        type: 'GET_JOBS_REQUEST'
    }
}

export function getJobsSuccess(payload) {
    return {
        type: 'GET_JOBS_SUCCESS',
        payload
    }
}

export function getJobsFailure(error) {
    return {
        type: 'GET_JOBS_FAILURE',
        error
    }
}

export const getJobs = () => {
    return (dispatch) => {
        dispatch(getJobsRequst());
        Promise.all([fetch(`${BASE_URL}api/job/myJobs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()),
        fetch(`${BASE_URL}api/job/apply/myAppliedJobs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json())])
            .then((response) => {
                const jobPosts = response[0];
                const appliedJobData = response[1];
                dispatch(getJobsSuccess({ jobPosts, appliedJobData }));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getJobsFailure(err));
                console.log('err', err);
            });
    };
};

export function getMediaListRequst() {
    return {
        type: 'GET_MEDIA_LIST_REQUEST'
    }
}

export function getMediaListSuccess(payload) {
    return {
        type: 'GET_MEDIA_LIST_SUCCESS',
        payload
    }
}

export function getMediaListFailure(error) {
    return {
        type: 'GET_MEDIA_LIST_FAILURE',
        error
    }
}

export const getMediaList = (isRecruiter) => {
    return (dispatch) => {
        dispatch(getMediaListRequst());
        fetch(`${BASE_URL}api/media/${isRecruiter ? 'getAllMedia' : 'getMediaForJobSeeker'}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getMediaListSuccess(data))
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getMediaListFailure(err));
                console.log('err', err);
            });
    };
};

export function getAppliedRequst() {
    return {
        type: 'GET_APPLIED_JOBS_REQUEST'
    }
}

export function getAppliedSuccess(payload) {
    return {
        type: 'GET_APPLIED_JOBS_SUCCESS',
        payload
    }
}

export function getAppliedFailure(error) {
    return {
        type: 'GET_APPLIED_JOBS_FAILURE',
        error
    }
}

export const getAppliedJobs = () => {
    return (dispatch) => {
        dispatch(getAppliedRequst());
        fetch(`${BASE_URL}api/job/apply/myAppliedJobs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getAppliedSuccess(data))
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getAppliedFailure(err));
                console.log('err', err);
            });
    };
};

export function getJobDataRequst() {
    return {
        type: 'GET_JOB_DATA_REQUEST'
    }
}

export function getJobDataSuccess(payload) {
    return {
        type: 'GET_JOB_DATA_SUCCESS',
        payload
    }
}

export function getJobDataFailure(error) {
    return {
        type: 'GET_JOB_DATA_FAILURE',
        error
    }
}

export const getJobData = (id) => {
    return (dispatch) => {
        dispatch(getJobDataRequst());
        fetch(`${BASE_URL}api/job/jobById/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getJobDataSuccess(data))
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getJobDataFailure(err));
                console.log('err', err);
            });
    };
};

export function getMediaEditDataRequst() {
    return {
        type: 'GET_MEDIA_DATA_REQUEST'
    }
}

export function getMediaEditDataSuccess(payload) {
    return {
        type: 'GET_MEDIA_DATA_SUCCESS',
        payload
    }
}

export function getMediaEditDataFailure(error) {
    return {
        type: 'GET_MEDIA_DATA_FAILURE',
        error
    }
}

export const getMediaEditData = (id) => {
    return (dispatch) => {
        dispatch(getMediaEditDataRequst());
        fetch(`${BASE_URL}api/media/getMediaById/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getMediaEditDataSuccess(data))
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getMediaEditDataFailure(err));
                console.log('err', err);
            });
    };
};

export function deleteJobRequst() {
    return {
        type: 'DELETE_JOB_REQUEST'
    }
}

export function deleteJobSuccess(payload) {
    return {
        type: 'DELETE_JOB_SUCCESS',
        payload
    }
}

export function deleteJobFailure(error) {
    return {
        type: 'DELETE_JOB_FAILURE',
        error
    }
}

export const deleteJob = (id) => {
    return (dispatch) => {
        dispatch(deleteJobRequst());
        fetch(`${BASE_URL}api/job/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Job Deleted Successfully', 'success');
                dispatch(getJobs());
                dispatch(deleteJobSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deleteJobFailure(err));
                console.log('err', err);
            });
    };
};

export function deleteMediaRequst() {
    return {
        type: 'DELETE_MEDIA_REQUEST'
    }
}

export function deleteMediaSuccess(payload) {
    return {
        type: 'DELETE_MEDIA_SUCCESS',
        payload
    }
}

export function deleteMediaFailure(error) {
    return {
        type: 'DELETE_MEDIA_FAILURE',
        error
    }
}

export const deleteMedia = (id) => {
    return (dispatch) => {
        dispatch(deleteMediaRequst());
        fetch(`${BASE_URL}api/media/deleteMedia/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Media Deleted Successfully', 'success');
                dispatch(getJobs());
                dispatch(deleteMediaSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deleteMediaFailure(err));
                console.log('err', err);
            });
    };
};

export function getSeekerProfileRequst() {
    return {
        type: 'GET_SEEKER_DATA_REQUEST'
    }
}

export function getSeekerProfileSuccess(payload) {
    return {
        type: 'GET_SEEKER_DATA_SUCCESS',
        payload
    }
}

export function getSeekerProfileFailure(error) {
    return {
        type: 'GET_SEEKER_DATA_FAILURE',
        error
    }
}

export const getSeekerProfile = (id, token) => {
    const url = id ? `user/getJobSeeker/${id}` : 'user/getMyProfile';

    return (dispatch) => {
        dispatch(getSeekerProfileRequst());
        Promise.all([fetch(`${BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()),
        fetch(`${BASE_URL}api/schedule/getMySchedules`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json())])
            .then((response) => {
                const seekerData = response[0];
                const scheduleDates = response[1];
                dispatch(getSeekerProfileSuccess({ seekerData, scheduleDates }))
                return ({ seekerData, scheduleDates });
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getSeekerProfileFailure(err));
                console.log('err', err);
            });
    };
};


export function saveSeekerProfileRequst() {
    return {
        type: 'SAVE_SEEKER_REQUEST'
    }
}

export function saveSeekerProfileSuccess(payload) {
    return {
        type: 'SAVE_SEEKER_SUCCESS',
        payload
    }
}

export function saveSeekerProfileFailure(error) {
    return {
        type: 'SAVE_SEEKER_FAILURE',
        error
    }
}
export const saveSeekerProfile = (requestBody) => {
    return (dispatch) => {
        dispatch(saveSeekerProfileRequst());
        fetch(`${BASE_URL}user/updateJobSeeker`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else {
                    requestBody.detailedCareerInformation && requestBody.detailedCareerInformation.map(data => {
                        if (data.refEmail)
                            dispatch(sendRecommendEmail({ name: data.refName, email: data.refEmail }, false));
                    })
                    Toaster(`Profile Saved Successfully And Email Sent To References`, 'success');
                }
                dispatch(saveSeekerProfileSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveSeekerProfileFailure(err));
                console.log('err', err);
            });
    };
};


export function makeSuperRequst() {
    return {
        type: 'MAKE_SUPER_REQUEST'
    }
}

export function makeSuperSuccess(payload) {
    return {
        type: 'MAKE_SUPER_SUCCESS',
        payload
    }
}

export function makeSuperFailure(error) {
    return {
        type: 'MAKE_SUPER_FAILURE',
        error
    }
}
export const makeSuper = (requestBody, id, isSuper) => {
    return (dispatch) => {
        dispatch(makeSuperRequst());
        fetch(`${BASE_URL}api/team/teamPermission/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else {
                    if (isSuper)
                        Toaster(`Editing has now been revoked`, 'success');
                    else
                        Toaster(`Team member is now an editor`, 'success');
                }
                dispatch(makeSuperSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(makeSuperFailure(err));
                console.log('err', err);
            });
    };
};

export function sendRecommendEmailRequst() {
    return {
        type: 'SEND_RECOMMEND_EMAIL_REQUEST'
    }
}

export function sendRecommendEmailSuccess(payload) {
    return {
        type: 'SEND_RECOMMEND_EMAIL_SUCCESS',
        payload
    }
}

export function sendRecommendEmailFailure(error) {
    return {
        type: 'SEND_RECOMMEND_EMAIL_FAILURE',
        error
    }
}
export const sendRecommendEmail = (requestBody, flag) => {
    return (dispatch) => {
        dispatch(sendRecommendEmailRequst());
        fetch(`${BASE_URL}api/recommendation`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (flag) {
                    if (data.error)
                        Toaster(data.message, 'error');
                    else
                        Toaster(`Recommendation Request Sent To ${requestBody.email}`, 'success');
                }
                dispatch(sendRecommendEmailSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(sendRecommendEmailFailure(err));
                console.log('err', err);
            });
    };
};

export function referenceFeedbackRequst() {
    return {
        type: 'REFERENCE_FEEDBACK_REQUEST'
    }
}

export function referenceFeedbackSuccess(payload) {
    return {
        type: 'REFERENCE_FEEDBACK_SUCCESS',
        payload
    }
}

export function referenceFeedbackFailure(error) {
    return {
        type: 'REFERENCE_FEEDBACK_FAILURE',
        error
    }
}
export const referenceFeedbackMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(referenceFeedbackRequst());
        fetch(`${BASE_URL}api/recommendation/save`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Response has been submitted succesfully`, 'success');
                dispatch(referenceFeedbackSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(referenceFeedbackFailure(err));
                console.log('err', err);
            });
    };
};

export function updateProfileRequst() {
    return {
        type: 'UPDATE_PROFILE_REQUEST'
    }
}

export function updateProfileSuccess(payload) {
    return {
        type: 'UPDATE_PROFILE_SUCCESS',
        payload
    }
}

export function updateProfileFailure(error) {
    return {
        type: 'UPDATE_PROFILE_FAILURE',
        error
    }
}
export const updateProfileMethod = (requestBody) => {
    return (dispatch) => {
        dispatch(updateProfileRequst());
        fetch(`${BASE_URL}user/updateMyProfile`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Profile updated succesfully`, 'success');
                dispatch(updateProfileSuccess(data))
                dispatch(getSeekerProfile());
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(updateProfileFailure(err));
                console.log('err', err);
            });
    };
};


export function applyJobRequst() {
    return {
        type: 'APPLY_JOB_REQUEST'
    }
}

export function applyJobSuccess(payload) {
    return {
        type: 'APPLY_JOB_SUCCESS',
        payload
    }
}

export function applyJobFailure(error) {
    return {
        type: 'APPLY_JOB_FAILURE',
        error
    }
}
export const applyJob = (id) => {
    return (dispatch) => {
        dispatch(applyJobRequst());
        fetch(`${BASE_URL}api/job/apply/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Job applied succesfully`, 'success');
                dispatch(applyJobSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(applyJobFailure(err));
                console.log('err', err);
            });
    };
};

export const deactivateAccount = () => {
    return (dispatch) => {
        // dispatch(applyJobRequst());
        fetch(`${BASE_URL}user/deactivateMyAccount`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Account de-activated succesfully`, 'success');
                dispatch(logOutMethod())
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                // dispatch(applyJobFailure(err));
                console.log('err', err);
            });
    };
};

export const deleteAccount = () => {
    return (dispatch) => {
        dispatch(applyJobRequst());
        fetch(`${BASE_URL}user/deleteMyAccount`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else {
                    Toaster(`Account deleted succesfully`, 'success');
                    localStorage.clear();
                    dispatch(clearDataMethod());
                    dispatch(logOutMethod())
                }
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                // dispatch(applyJobFailure(err));
                console.log('err', err);
            });
    };
};


export function appliedCandidateRequst() {
    return {
        type: 'GET_APPLIED_CANDIDATE_REQUEST'
    }
}

export function appliedCandidateSuccess(payload) {
    return {
        type: 'GET_APPLIED_CANDIDATE_SUCCESS',
        payload
    }
}

export function appliedCandidateFailure(error) {
    return {
        type: 'GET_APPLIED_CANDIDATE_FAILURE',
        error
    }
}
export const appliedCandidateList = (id) => {
    return (dispatch) => {
        dispatch(appliedCandidateRequst());
        fetch(`${BASE_URL}api/job/applicants/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                // if (data.error)
                //     Toaster(data.message, 'error');
                // else
                //     Toaster(`Job applied succesfully`, 'success');
                dispatch(appliedCandidateSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(appliedCandidateFailure(err));
                console.log('err', err);
            });
    };
};


export function mediaChatListRequst() {
    return {
        type: 'GET_MEDIA_CHAT_REQUEST'
    }
}

export function mediaChatListSuccess(payload) {
    return {
        type: 'GET_MEDIA_CHAT_SUCCESS',
        payload
    }
}

export function mediaChatListFailure(error) {
    return {
        type: 'GET_MEDIA_CHAT_FAILURE',
        error
    }
}
export const mediaChatList = (id) => {
    return (dispatch) => {
        dispatch(mediaChatListRequst());
        fetch(`${BASE_URL}api/media/getChatUsers/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(mediaChatListSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(mediaChatListFailure(err));
                console.log('err', err);
            });
    };
}


//////////////// dashboard APIs ////////////////


export function getDashboardDataRequst() {
    return {
        type: 'GET_DASHBOARD_DATA_REQUEST'
    }
}

export function getDashboardDataSuccess(payload) {
    return {
        type: 'GET_DASHBOARD_DATA_SUCCESS',
        payload
    }
}

export function getDashboardDataFailure(error) {
    return {
        type: 'GET_DASHBOARD_DATA_FAILURE',
        error
    }
}
export const getDashboardData = () => {
    return (dispatch) => {
        dispatch(getDashboardDataRequst());
        dispatch(getSeekerProfile());
        Promise.all([fetch(`${BASE_URL}api/recruiterDashboard/getMetadata`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()),
        fetch(`${BASE_URL}api/job/myJobs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()),
        fetch(`${BASE_URL}api/chat/getChatUsers`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()),
        fetch(`${BASE_URL}api/schedule/getMySchedules`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json())])
            .then((response) => {
                const dashboardData = response[0];
                const jobPosts = response[1];
                const chatUsersPeoples = response[2];
                const scheduleDates = response[3];
                dispatch(getDashboardDataSuccess({ dashboardData, jobPosts, chatUsersPeoples, scheduleDates }))
                return ({ dashboardData, jobPosts, chatUsersPeoples, scheduleDates });
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getDashboardDataFailure(err));
                console.log('err', err);
            });
    };
};

export function getPublicFeedDataRequst() {
    return {
        type: 'GET_FEED_REQUEST'
    }
}

export function getPublicFeedDataSuccess(payload) {
    return {
        type: 'GET_FEED_SUCCESS',
        payload
    }
}

export function getPublicFeedDataFailure(error) {
    return {
        type: 'GET_FEED_FAILURE',
        error
    }
}
export const getPublicFeedData = (pageSize) => {
    return (dispatch, getState) => {
        dispatch(getPublicFeedDataRequst());
        fetch(`${BASE_URL}api/feed/getPublicFeeds`, {
            // ?page=${pageSize?pageSize:1}
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        }).then(response => response.json()).then((data) => {
            dispatch(getPublicFeedDataSuccess({ feedData: data, hasMore: data.data.length > 0 ? true : false, pageSize: pageSize ? pageSize : 1 }))
            return (data);
        }).catch((err) => {
            Toaster('Oops, Something went wrong', 'error');
            dispatch(getPublicFeedDataFailure(err));
            console.log('err', err);
        });
    };
}

export function onShareRequst() {
    return {
        type: 'SHARE_REQUEST'
    }
}

export function onShareSuccess(payload) {
    return {
        type: 'SHARE_SUCCESS',
        payload
    }
}

export function onShareFailure(error) {
    return {
        type: 'SHARE_FAILURE',
        error
    }
}
export const onShare = (requestBody, id) => {
    const url = id ? `editMyFeed/${id}` : 'addMyFeed';
    return (dispatch) => {
        dispatch(onShareRequst());
        fetch(`${BASE_URL}api/feed/${url}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Post ${id ? 'Edited' : 'Created'} succesfully`, 'success');
                dispatch(onShareSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(onShareFailure(err));
                console.log('err', err);
            });
    };
};

export function onShareFeedRequst() {
    return {
        type: 'SHARE_FEED_REQUEST'
    }
}

export function onShareFeedSuccess(payload) {
    return {
        type: 'SHARE_FEED_SUCCESS',
        payload
    }
}

export function onShareFeedFailure(error) {
    return {
        type: 'SHARE_FEED_FAILURE',
        error
    }
}
export const onShareFeed = (requestBody, id) => {
    return (dispatch) => {
        dispatch(onShareFeedRequst());
        fetch(`${BASE_URL}api/feed/shareFeed/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Post Shared succesfully`, 'success');
                dispatch(onShareFeedSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(onShareFeedFailure(err));
                console.log('err', err);
            });
    };
};

export function onCommentRequst() {
    return {
        type: 'COMMENT_REQUEST'
    }
}

export function onCommentSuccess(payload) {
    return {
        type: 'COMMENT_SUCCESS',
        payload
    }
}

export function onCommentFailure(error) {
    return {
        type: 'COMMENT_FAILURE',
        error
    }
}
export const onComment = (requestBody, id) => {
    const url = id ? `editComment/${id}` : 'addComment';
    return (dispatch) => {
        dispatch(onCommentRequst());
        fetch(`${BASE_URL}api/comment/${url}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster(`Comment Posted succesfully`, 'success');
                dispatch(onCommentSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(onCommentFailure(err));
                console.log('err', err);
            });
    };
};

export function onLikeRequst() {
    return {
        type: 'ON_LIKE_REQUEST'
    }
}

export function onLikeSuccess(payload) {
    return {
        type: 'ON_LIKE_SUCCESS',
        payload
    }
}

export function onLikeFailure(error) {
    return {
        type: 'ON_LIKE_FAILURE',
        error
    }
}
export const onLike = (id, request) => {
    return (dispatch) => {
        dispatch(onLikeRequst());
        fetch(`${BASE_URL}api/like/likeFeed/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(request),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                // else
                //     Toaster(`Profile updated succesfully`, 'success');
                dispatch(onLikeSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(onLikeFailure(err));
                console.log('err', err);
            });
    };
};

export function onDislikeRequst() {
    return {
        type: 'ON_DISLIKE_REQUEST'
    }
}

export function onDislikeSuccess(payload) {
    return {
        type: 'ON_DISLIKE_SUCCESS',
        payload
    }
}

export function onDislikeFailure(error) {
    return {
        type: 'ON_DISLIKE_FAILURE',
        error
    }
}
export const onDislike = (id) => {
    return (dispatch) => {
        dispatch(onDislikeRequst());
        fetch(`${BASE_URL}api/like/dislikeFeed/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                // else
                //     Toaster(`Profile updated succesfully`, 'success');
                dispatch(onDislikeSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(onDislikeFailure(err));
                console.log('err', err);
            });
    };
};

export function deleteCommentRequst() {
    return {
        type: 'DELETE_COMMENT_REQUEST'
    }
}

export function deleteCommentSuccess(payload) {
    return {
        type: 'DELETE_COMMENT_SUCCESS',
        payload
    }
}

export function deleteCommentFailure(error) {
    return {
        type: 'DELETE_COMMENT_FAILURE',
        error
    }
}

export const deleteComment = (id) => {
    return (dispatch) => {
        dispatch(deleteCommentRequst());
        fetch(`${BASE_URL}api/comment/deleteComment/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Comment Deleted Successfully', 'success');
                dispatch(deleteCommentSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deleteCommentFailure(err));
                console.log('err', err);
            });
    };
};

export function deletePostRequst() {
    return {
        type: 'DELETE_POST_REQUEST'
    }
}

export function deletePostSuccess(payload) {
    return {
        type: 'DELETE_POST_SUCCESS',
        payload
    }
}

export function deletePostFailure(error) {
    return {
        type: 'DELETE_POST_FAILURE',
        error
    }
}

export const deletePost = (id) => {
    return (dispatch) => {
        dispatch(deletePostRequst());
        fetch(`${BASE_URL}api/feed/deleteMyFeed/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Post Deleted Successfully', 'success');
                dispatch(deletePostSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deletePostFailure(err));
                console.log('err', err);
            });
    };
};

export function getFeedDataRequst() {
    return {
        type: 'GET_FEED_DATA_REQUEST'
    }
}

export function getFeedDataSuccess(payload) {
    return {
        type: 'GET_FEED_DATA_SUCCESS',
        payload
    }
}

export function getFeedDataFailure(error) {
    return {
        type: 'GET_FEED_DATA_FAILURE',
        error
    }
}
export const getFeedData = () => {
    return (dispatch) => {
        dispatch(getFeedDataRequst());
        fetch(`${BASE_URL}api/feed/getMyFeeds`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                // if (data.error)
                //     Toaster(data.message, 'error');
                // else
                //     Toaster(`Job applied succesfully`, 'success');
                dispatch(getFeedDataSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getFeedDataFailure(err));
                console.log('err', err);
            });
    };
};

export function getChatUsersRequst() {
    return {
        type: 'GET_CHAT_USERS_REQUEST'
    }
}

export function getChatUsersSuccess(payload) {
    return {
        type: 'GET_CHAT_USERS_SUCCESS',
        payload
    }
}

export function getChatUsersFailure(error) {
    return {
        type: 'GET_CHAT_USERS_FAILURE',
        error
    }
}
export const getChatUsers = () => {
    return (dispatch) => {
        dispatch(getChatUsersRequst());
        fetch(`${BASE_URL}user/getAllUsers`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getChatUsersSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getChatUsersFailure(err));
                console.log('err', err);
            });
    };
};

export function getChatIdRequst() {
    return {
        type: 'CHAT_ID_REQUEST'
    }
}

export function getChatIdSuccess(payload) {
    return {
        type: 'CHAT_ID_SUCCESS',
        payload
    }
}

export function getChatIdFailure(error) {
    return {
        type: 'CHAT_ID_FAILURE',
        error
    }
}
export const getChatId = (requestBody) => {
    return (dispatch) => {
        dispatch(getChatIdRequst());
        fetch(`${BASE_URL}api/chat/getChatId`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                dispatch(getChatIdSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getChatIdFailure(err));
                console.log('err', err);
            });
    };
};


export function getNotificationsRequst() {
    return {
        type: 'GET_NOTIFICATIONS_REQUEST'
    }
}

export function getNotificationsSuccess(payload) {
    return {
        type: 'GET_NOTIFICATIONS_SUCCESS',
        payload
    }
}

export function getNotificationsFailure(error) {
    return {
        type: 'GET_NOTIFICATIONS_FAILURE',
        error
    }
}
export const getNotifications = () => {
    return (dispatch) => {
        dispatch(getNotificationsRequst());
        fetch(`${BASE_URL}api/notification/getNotification`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getNotificationsSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getNotificationsFailure(err));
                console.log('err', err);
            });
    };
};

export function getTeamDataRequst() {
    return {
        type: 'GET_TEAM_DATA_REQUEST'
    }
}

export function getTeamDataSuccess(payload) {
    return {
        type: 'GET_TEAM_DATA_SUCCESS',
        payload
    }
}

export function getTeamDataFailure(error) {
    return {
        type: 'GET_TEAM_DATA_FAILURE',
        error
    }
}
export const getTeamData = () => {
    return (dispatch) => {
        dispatch(getTeamDataRequst());
        fetch(`${BASE_URL}api/team/getTeamMembers`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getTeamDataSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getTeamDataFailure(err));
                console.log('err', err);
            });
    };
};


export function getShortlistedRequst() {
    return {
        type: 'GET_SHORTLISTED_REQUEST'
    }
}

export function getShortlistedSuccess(payload) {
    return {
        type: 'GET_SHORTLISTED_SUCCESS',
        payload
    }
}

export function getShortlistedFailure(error) {
    return {
        type: 'GET_SHORTLISTED_FAILURE',
        error
    }
}
export const getShortlisted = (id, token) => {
    return (dispatch) => {
        dispatch(getShortlistedRequst());
        fetch(`${BASE_URL}api/job/getShortlistedApplicants/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token ? token : getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getShortlistedSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getShortlistedFailure(err));
                console.log('err', err);
            });
    };
};

export function getShortlistModalDataRequst() {
    return {
        type: 'GET_SHORTLIS_MODAL_DATA_REQUEST'
    }
}

export function getShortlistModalDataSuccess(payload) {
    return {
        type: 'GET_SHORTLIS_MODAL_DATA_SUCCESS',
        payload
    }
}

export function getShortlistModalDataFailure(error) {
    return {
        type: 'GET_SHORTLIS_MODAL_DATA_FAILURE',
        error
    }
}
export const getShortlistModalData = (jobId, seekerId, token) => {
    return (dispatch) => {
        dispatch(getShortlistModalDataRequst());
        fetch(`${BASE_URL}api/schedule/getSchedulesForJob/${jobId}/${seekerId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token ? token : getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getShortlistModalDataSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getShortlistModalDataFailure(err));
                console.log('err', err);
            });
    };
};

export function saveTeamMemberRequst() {
    return {
        type: 'SAVE_TEAM_DATA_REQUEST'
    }
}

export function saveTeamMemberSuccess(payload) {
    return {
        type: 'SAVE_TEAM_DATA_SUCCESS',
        payload
    }
}

export function saveTeamMemberFailure(error) {
    return {
        type: 'SAVE_TEAM_DATA_FAILURE',
        error
    }
}
export const addEditTeamMember = (requestBody, id) => {
    return (dispatch) => {
        let url = id ? `/team/editTeamMember/${id}` : '/team/addTeamMember';
        dispatch(saveTeamMemberRequst());
        fetch(`${BASE_URL}api${url}`, {
            method: id ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`TeamMember ${id ? 'Updated' : 'Saved'} Successfully`, 'success');
                dispatch(saveTeamMemberSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveTeamMemberFailure(err));
                console.log('err', err);
            });
    };
};


export function scheduleInterviewRequst() {
    return {
        type: 'SCHEDULE_INTERVIEW_REQUEST'
    }
}

export function scheduleInterviewSuccess(payload) {
    return {
        type: 'SCHEDULE_INTERVIEW_SUCCESS',
        payload
    }
}

export function scheduleInterviewFailure(error) {
    return {
        type: 'SCHEDULE_INTERVIEW_FAILURE',
        error
    }
}
export const scheduleInterview = (token, requestBody, id) => {
    return (dispatch) => {
        dispatch(scheduleInterviewRequst());
        const method = id ? 'PUT' : 'POST';
        const url = id ? `api/schedule/updateScheduleDates/${id}` : 'api/schedule/addPossibleDates';
        fetch(`${BASE_URL}${url}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token ? token : getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Interview ${data.message}`, 'success');
                dispatch(scheduleInterviewSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(scheduleInterviewFailure(err));
                console.log('err', err);
            });
    };
};

export function deleteTeamMemberRequst() {
    return {
        type: 'DELETE_TEAM_REQUEST'
    }
}

export function deleteTeamMemberSuccess(payload) {
    return {
        type: 'DELETE_TEAM_SUCCESS',
        payload
    }
}

export function deleteTeamMemberFailure(error) {
    return {
        type: 'DELETE_TEAM_FAILURE',
        error
    }
}

export const deleteTeamMember = (id) => {
    return (dispatch) => {
        dispatch(deleteTeamMemberRequst());
        fetch(`${BASE_URL}api/team/deleteMember/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('TeamMember Deleted Successfully', 'success');
                dispatch(deleteTeamMemberSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deleteTeamMemberFailure(err));
                console.log('err', err);
            });
    };
};

export function disableTeamMemberRequst() {
    return {
        type: 'DISABLE_TEAM_MEMBER_REQUEST'
    }
}

export function disableTeamMemberSuccess(payload) {
    return {
        type: 'DISABLE_TEAM_MEMBER_SUCCESS',
        payload
    }
}

export function disableTeamMemberFailure(error) {
    return {
        type: 'DISABLE_TEAM_MEMBER_FAILURE',
        error
    }
}
export const disableTeamMember = (id) => {
    return (dispatch) => {
        dispatch(disableTeamMemberRequst());
        fetch(`${BASE_URL}api/team/disableMember/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else {
                    Toaster(`Team Member Disabled Successfully`, 'success');
                }
                dispatch(disableTeamMemberSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(disableTeamMemberFailure(err));
                console.log('err', err);
            });
    };
};

export function sendToThirdPartyRequst() {
    return {
        type: 'SEND_THIRD_PARTY_REQUEST'
    }
}

export function sendToThirdPartySuccess(payload) {
    return {
        type: 'SEND_THIRD_PARTY_SUCCESS',
        payload
    }
}

export function sendToThirdPartyFailure(error) {
    return {
        type: 'SEND_THIRD_PARTY_FAILURE',
        error
    }
}
export const sendToThirdParty = (requestBody) => {
    return (dispatch) => {
        dispatch(sendToThirdPartyRequst());
        fetch(`${BASE_URL}api/schedule/sendMailToThirdParty`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.message, 'error');
                else
                    Toaster('Jobs sent to third party succesfully', 'success');
                dispatch(sendToThirdPartySuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(sendToThirdPartyFailure(err));
                console.log('err', err);
            });
    };
};

export function sendCandidatesListRequst() {
    return {
        type: 'SEND_CANDIDATES_REQUEST'
    }
}

export function sendCandidatesListSuccess(payload) {
    return {
        type: 'SEND_CANDIDATES_SUCCESS',
        payload
    }
}

export function sendCandidatesListFailure(error) {
    return {
        type: 'SEND_CANDIDATES_FAILURE',
        error
    }
}
export const sendCandidatesList = (token, requestBody, jobId) => {
    return (dispatch) => {
        dispatch(sendCandidatesListRequst());
        const method = 'POST';
        fetch(`${BASE_URL}api/schedule/selectCandidates/${jobId}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token ? token : getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Shrtlisted Candidates Sent Successfully`, 'success');
                dispatch(sendCandidatesListSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(sendCandidatesListFailure(err));
                console.log('err', err);
            });
    };
};

export function saveFeedbackRequst() {
    return {
        type: 'SAVE_FEEDBACK_REQUEST'
    }
}

export function saveFeedbackSuccess(payload) {
    return {
        type: 'SAVE_FEEDBACK_SUCCESS',
        payload
    }
}

export function saveFeedbackFailure(error) {
    return {
        type: 'SAVE_FEEDBACK_FAILURE',
        error
    }
}
export const saveFeedback = (requestBody, isContact) => {
    return (dispatch) => {
        dispatch(saveFeedbackRequst());
        const method = 'POST';
        fetch(`${BASE_URL}api/feedback/sendFeedback${isContact ? '?type=contact' : ''}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`${isContact ? 'Message Recorded Successfully' : 'Feedback Sent Successfully'}`, 'success');
                dispatch(saveFeedbackSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveFeedbackFailure(err));
                console.log('err', err);
            });
    };
}

export function reportPostRequst() {
    return {
        type: 'REPORT_POST_REQUEST'
    }
}

export function reportPostSuccess(payload) {
    return {
        type: 'REPORT_POST_SUCCESS',
        payload
    }
}

export function reportPostFailure(error) {
    return {
        type: 'REPORT_POST_FAILURE',
        error
    }
}
export const reportPost = (id,isPost) => {
    return (dispatch) => {
        dispatch(reportPostRequst());
        const method = 'POST';
        fetch(`${BASE_URL}api/flag/addMyFlag/${id}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`${isPost ? `Post ${data.message}` : `Comment ${data.message}`}`, 'success');
                dispatch(reportPostSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(reportPostFailure(err));
                console.log('err', err);
            });
    };
}

export function checkIsPageOpenedRequst() {
    return {
        type: 'CHECK_URL_OPENED_REQUEST'
    }
}

export function checkIsPageOpenedSuccess(payload) {
    return {
        type: 'CHECK_URL_OPENED_SUCCESS',
        payload
    }
}

export function checkIsPageOpenedFailure(error) {
    return {
        type: 'CHECK_URL_OPENED_FAILURE',
        error
    }
}
export const checkIsPageOpened = (code, token) => {
    return (dispatch) => {
        dispatch(checkIsPageOpenedRequst());
        fetch(`${BASE_URL}api/schedule/checkUrlAlreadyOpened/${code}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token ? token : getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(checkIsPageOpenedSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(checkIsPageOpenedFailure(err));
                console.log('err', err);
            });
    };
};

export function getDraftDataRequst() {
    return {
        type: 'GET_DRAFT_REQUEST'
    }
}

export function getDraftDataSuccess(payload) {
    return {
        type: 'GET_DRAFT_SUCCESS',
        payload
    }
}

export function getDraftDataFailure(error) {
    return {
        type: 'GET_DRAFT_FAILURE',
        error
    }
}
export const getDraftData = () => {
    return (dispatch) => {
        dispatch(getDraftDataRequst());
        fetch(`${BASE_URL}api/note/getNote`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getDraftDataSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getDraftDataFailure(err));
                console.log('err', err);
            });
    };
};

export function saveDraftRequst() {
    return {
        type: 'SAVE_DRAFT_REQUEST'
    }
}

export function saveDraftSuccess(payload) {
    return {
        type: 'SAVE_DRAFT_SUCCESS',
        payload
    }
}

export function saveDraftFailure(error) {
    return {
        type: 'SAVE_DRAFT_FAILURE',
        error
    }
}
export const saveDraft = (requestBody, isEdit) => {
    const url = isEdit ? 'updateNote' : 'addNote';
    return (dispatch) => {
        dispatch(saveDraftRequst());
        const method = isEdit ? 'PUT' : 'POST';
        fetch(`${BASE_URL}api/note/${url}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Question/Answers Saved Successfully`, 'success');
                dispatch(saveDraftSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(saveDraftFailure(err));
                console.log('err', err);
            });
    };
}

export function deleteDraftRequst() {
    return {
        type: 'DELETE_DRAFT_REQUEST'
    }
}

export function deleteDraftSuccess(payload) {
    return {
        type: 'DELETE_DRAFT_SUCCESS',
        payload
    }
}

export function deleteDraftFailure(error) {
    return {
        type: 'DELETE_DRAFT_FAILURE',
        error
    }
}

export const deleteDraft = (id) => {
    return (dispatch) => {
        dispatch(deleteDraftRequst());
        fetch(`${BASE_URL}api/note/deleteNote`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Data Deleted Successfully', 'success');
                dispatch(getJobs());
                dispatch(deleteDraftSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(deleteDraftFailure(err));
                console.log('err', err);
            });
    };
};

export function getFriendRequestRequst() {
    return {
        type: 'GET_FRIEND_REQUEST'
    }
}

export function getFriendRequestSuccess(payload) {
    return {
        type: 'GET_FRIEND_SUCCESS',
        payload
    }
}

export function getFriendRequestFailure(error) {
    return {
        type: 'GET_FRIEND_FAILURE',
        error
    }
}
export const getFriendRequest = () => {
    return (dispatch) => {
        dispatch(getFriendRequestRequst());
        fetch(`${BASE_URL}api/friend/getRequestList`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getFriendRequestSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getFriendRequestFailure(err));
                console.log('err', err);
            });
    };
};

export function getCustomApiKeyRequst() {
    return {
        type: 'GET_CUSTOM_API_KEY_REQUEST'
    }
}

export function getCustomApiKeySuccess(payload) {
    return {
        type: 'GET_CUSTOM_API_KEY_SUCCESS',
        payload
    }
}

export function getCustomApiKeyFailure(error) {
    return {
        type: 'GET_CUSTOM_API_KEY_FAILURE',
        error
    }
}
export const getCustomApiKey = () => {
    return (dispatch) => {
        dispatch(getCustomApiKeyRequst());
        fetch(`${BASE_URL}api/public/getPublicApiKey`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                dispatch(getCustomApiKeySuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(getCustomApiKeyFailure(err));
                console.log('err', err);
            });
    };
};

export function acceptRequestRequst() {
    return {
        type: 'ACCEPT_FRIEND_REQUEST'
    }
}

export function acceptRequestSuccess(payload) {
    return {
        type: 'ACCEPT_FRIEND_SUCCESS',
        payload
    }
}

export function acceptRequestFailure(error) {
    return {
        type: 'ACCEPT_FRIEND_FAILURE',
        error
    }
}
export const acceptRequest = (id) => {
    return (dispatch) => {
        dispatch(acceptRequestRequst());
        fetch(`${BASE_URL}api/friend/acceptRequest/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            },
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster(`Request accepted Successfully`, 'success');
                dispatch(acceptRequestSuccess(data))
                return (data);
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(acceptRequestFailure(err));
                console.log('err', err);
            });
    };
}


export function rejectRequestRequst() {
    return {
        type: 'REJECT_REQUEST_REQUEST'
    }
}

export function rejectRequestSuccess(payload) {
    return {
        type: 'REJECT_REQUEST_SUCCESS',
        payload
    }
}

export function rejectRequestFailure(error) {
    return {
        type: 'REJECT_REQUEST_FAILURE',
        error
    }
}

export const rejectRequest = (id) => {
    return (dispatch) => {
        dispatch(rejectRequestRequst());
        fetch(`${BASE_URL}api/friend/removeRequest/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': getAccessToken()
            }
        })
            .then(response => response.json()).then((data) => {
                if (data.error)
                    Toaster(data.error.message, 'error');
                else
                    Toaster('Request Rejected Successfully', 'success');
                dispatch(rejectRequestSuccess(data));
            }).catch((err) => {
                Toaster('Oops, Something went wrong', 'error');
                dispatch(rejectRequestFailure(err));
                console.log('err', err);
            });
    };
};