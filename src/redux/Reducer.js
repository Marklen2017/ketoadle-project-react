const initialState = {
    loading: false,
    error: false,
    signupResponse: null,
    verifyAccountResponse: null,
    loginResponse: null,
    resendLinkResponse: null,
    forgetPasswordResponse: null,
    resetPasswordResponse: null,
    skills: null,
    saveJobResponse: null,
    jobPosts: null,
    jobData: null,
    jobDeleteResponse: null,
    seekerProfileData: null,
    saveSeekerProfileResponse: null,
    recommendeEmailSentResponse: null,
    referenceFeedbackResponse: null,
    updateProfileResponse: null,
    applyJobResponse: null,
    appliedJobData: null,
    appliedCandidateData: null,
    dashboardData: null,
    feedData: null,
    myFeedData: null,
    shareFeedResponse: null,
    chatUsers: null,
    chatId: null,
    chatUsersPeoples: null,
    notifications: null,
    isChatShow: false,
    teamData: null,
    addEditTeamResponse: null,
    deleteTeamResponse: null,
    shortlistedData: null,
    saveInterviewDatesResponse: null,
    shortlistModalData: null,
    disableTeamMemberResponse: null,
    makeSuperResponse: null,
    sendThirdPartyResponse: null,
    isOpenUrlResponse: null,
    scheduleDates: null,
    commentFeedResponse: null,
    likeResponse: null,
    dislikeResponse: null,
    deleteCommentResponse: null,
    deletePostResponse: null,
    skillsData: {},
    sendCandidatesListResponse: null,
    shareFeedPostResponse: null,
    saveMediaMarketResponse: null,
    mediaListData: null,
    mediaDeleteResponse: null,
    mediaEditData: null,
    mediaChatData: null,
    feedbackResponse: null,
    draftData: null,
    draftResponse: null,
    draftDeleteResponse: null,
    friendRequests: null,
    acceptFriendRequestResponse: null,
    rejectFriendRequestResponse: null,
    hasMoreData: false,
    pageSize: null,
    customApiKey: null
};

const reducerMethod = (state = {}, action) => {
    switch (action.type) {
        case 'SIGNUP_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                loading: false,
                signupResponse: action.payload,
                error: false
            };
        case 'SIGNUP_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'RESEND_LINK_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'RESEND_LINK_SUCCESS':
            return {
                ...state,
                loading: false,
                resendLinkResponse: action.payload,
                error: false
            };
        case 'RESEND_LINK_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                loginResponse: action.payload,
                error: false
            };
        case 'LOGIN_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'VERIFY_ACCOUNT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'VERIFY_ACCOUNT_SUCCESS':
            return {
                ...state,
                loading: false,
                verifyAccountResponse: action.payload,
                error: false
            };
        case 'VERIFY_ACCOUNT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'FORGOT_PASSWORD_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                loading: false,
                forgetPasswordResponse: action.payload,
                error: false
            };
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'RESET_PASSWORD_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                loading: false,
                resetPasswordResponse: action.payload,
                error: false
            };
        case 'RESET_PASSWORD_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_SKILLS_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_SKILLS_SUCCESS':
            return {
                ...state,
                loading: false,
                skills: action.payload,
                error: false
            };
        case 'GET_SKILLS_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_JOB_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_JOB_SUCCESS':
            return {
                ...state,
                loading: false,
                saveJobResponse: action.payload,
                error: false
            };
        case 'SAVE_JOB_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_MEDIA_MARKET_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_MEDIA_MARKET_SUCCESS':
            return {
                ...state,
                loading: false,
                saveMediaMarketResponse: action.payload,
                error: false
            };
        case 'SAVE_MEDIA_MARKET_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_JOBS_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_JOBS_SUCCESS':
            return {
                ...state,
                loading: false,
                jobPosts: action.payload.jobPosts,
                appliedJobData: action.payload.appliedJobData,
                error: false,
                jobDeleteResponse: null,
                saveJobResponse: null
            };
        case 'GET_JOBS_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_JOB_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_JOB_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                jobData: action.payload,
                error: false
            };
        case 'GET_JOB_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_SEEKER_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_SEEKER_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                seekerProfileData: action.payload.seekerData,
                scheduleDates: action.payload.scheduleDates,
                error: false
            };
        case 'GET_SEEKER_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_SEEKER_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_SEEKER_SUCCESS':
            return {
                ...state,
                loading: false,
                saveSeekerProfileResponse: action.payload,
                error: false
            };
        case 'SAVE_SEEKER_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_JOB_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_JOB_SUCCESS':
            return {
                ...state,
                loading: false,
                jobDeleteResponse: action.payload,
                error: false
            };
        case 'DELETE_JOB_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SEND_RECOMMEND_EMAIL_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SEND_RECOMMEND_EMAIL_SUCCESS':
            return {
                ...state,
                loading: false,
                recommendeEmailSentResponse: action.payload,
                error: false
            };
        case 'SEND_RECOMMEND_EMAIL_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'REFERENCE_FEEDBACK_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'REFERENCE_FEEDBACK_SUCCESS':
            return {
                ...state,
                loading: false,
                referenceFeedbackResponse: action.payload,
                error: false
            };
        case 'REFERENCE_FEEDBACK_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'UPDATE_PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                updateProfileResponse: action.payload,
                error: false
            };
        case 'UPDATE_PROFILE_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'APPLY_JOB_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'APPLY_JOB_SUCCESS':
            return {
                ...state,
                loading: false,
                applyJobResponse: action.payload,
                error: false
            };
        case 'APPLY_JOB_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_APPLIED_JOBS_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_APPLIED_JOBS_SUCCESS':
            return {
                ...state,
                loading: false,
                appliedJobData: action.payload,
                error: false
            };
        case 'GET_APPLIED_JOBS_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_APPLIED_CANDIDATE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_APPLIED_CANDIDATE_SUCCESS':
            return {
                ...state,
                loading: false,
                appliedCandidateData: action.payload,
                error: false
            };
        case 'GET_APPLIED_CANDIDATE_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };

        /////// Dashboard Data Reducer /////

        case 'GET_DASHBOARD_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_DASHBOARD_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                dashboardData: action.payload.dashboardData,
                jobPosts: action.payload.jobPosts,
                chatUsersPeoples: action.payload.chatUsersPeoples,
                scheduleDates: action.payload.scheduleDates,
                error: false,
                shareFeedResponse: null,
                commentFeedResponse: null
            };
        case 'GET_DASHBOARD_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_FEED_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_FEED_SUCCESS':
            return {
                ...state,
                loading: false,
                feedData: action.payload.feedData,
                hasMoreData: action.payload.hasMore,
                pageSize: action.payload.pageSize,
                error: false
            };
        case 'GET_FEED_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_FEED_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_FEED_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                myFeedData: action.payload,
                error: false
            };
        case 'GET_FEED_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SHARE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SHARE_SUCCESS':
            return {
                ...state,
                loading: false,
                shareFeedResponse: action.payload,
                error: false
            };
        case 'SHARE_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_CHAT_USERS_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_CHAT_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                chatUsers: action.payload,
                error: false
            };
        case 'GET_CHAT_USERS_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'CHAT_ID_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'CHAT_ID_SUCCESS':
            return {
                ...state,
                loading: false,
                chatId: action.payload,
                error: false
            };
        case 'CHAT_ID_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_NOTIFICATIONS_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_NOTIFICATIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                notifications: action.payload,
                error: false
            };
        case 'GET_NOTIFICATIONS_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_TEAM_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_TEAM_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                teamData: action.payload,
                error: false
            };
        case 'GET_TEAM_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };

        case 'GET_SHORTLIS_MODAL_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_SHORTLIS_MODAL_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                shortlistModalData: action.payload,
                error: false
            };
        case 'GET_SHORTLIS_MODAL_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };


        case 'SAVE_TEAM_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_TEAM_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                addEditTeamResponse: action.payload,
                error: false
            };
        case 'SAVE_TEAM_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_TEAM_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_TEAM_SUCCESS':
            return {
                ...state,
                loading: false,
                deleteTeamResponse: action.payload,
                error: false
            };
        case 'DELETE_TEAM_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SET_CHAT':
            return {
                isChatShow: action.payload,
                ...state,
            };
        case 'GET_SHORTLISTED_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_SHORTLISTED_SUCCESS':
            return {
                ...state,
                loading: false,
                shortlistedData: action.payload,
                error: false
            };
        case 'GET_SHORTLISTED_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SCHEDULE_INTERVIEW_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SCHEDULE_INTERVIEW_SUCCESS':
            return {
                ...state,
                loading: false,
                saveInterviewDatesResponse: action.payload,
                error: false
            };
        case 'SCHEDULE_INTERVIEW_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DISABLE_TEAM_MEMBER_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DISABLE_TEAM_MEMBER_SUCCESS':
            return {
                ...state,
                loading: false,
                disableTeamMemberResponse: action.payload,
                error: false
            };
        case 'DISABLE_TEAM_MEMBER_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'MAKE_SUPER_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'MAKE_SUPER_SUCCESS':
            return {
                ...state,
                loading: false,
                makeSuperResponse: action.payload,
                error: false
            };
        case 'MAKE_SUPER_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SEND_THIRD_PARTY_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SEND_THIRD_PARTY_SUCCESS':
            return {
                ...state,
                loading: false,
                sendThirdPartyResponse: action.payload,
                error: false
            };
        case 'SEND_THIRD_PARTY_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'CHECK_URL_OPENED_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'CHECK_URL_OPENED_SUCCESS':
            return {
                ...state,
                loading: false,
                isOpenUrlResponse: action.payload,
                error: false
            };
        case 'CHECK_URL_OPENED_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'COMMENT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'COMMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                commentFeedResponse: action.payload,
                error: false
            };
        case 'COMMENT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'ON_LIKE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'ON_LIKE_SUCCESS':
            return {
                ...state,
                loading: false,
                likeResponse: action.payload,
                error: false
            };
        case 'ON_LIKE_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'ON_DISLIKE_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'ON_DISLIKE_SUCCESS':
            return {
                ...state,
                loading: false,
                dislikeResponse: action.payload,
                error: false
            };
        case 'ON_DISLIKE_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_COMMENT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_COMMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                deleteCommentResponse: action.payload,
                error: false
            };
        case 'DELETE_COMMENT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_POST_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                loading: false,
                deletePostResponse: action.payload,
                error: false
            };
        case 'DELETE_POST_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_SKILLS':
            return {
                ...state,
                loading: false,
                skillsData: action.payload,
                error: false
            };
        case 'SEND_CANDIDATES_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SEND_CANDIDATES_SUCCESS':
            return {
                ...state,
                loading: false,
                sendCandidatesListResponse: action.payload,
                error: false
            };
        case 'SEND_CANDIDATES_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SHARE_FEED_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SHARE_FEED_SUCCESS':
            return {
                ...state,
                loading: false,
                shareFeedPostResponse: action.payload,
                error: false
            };
        case 'SHARE_FEED_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_MEDIA_LIST_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_MEDIA_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                mediaListData: action.payload,
                saveMediaMarketResponse: null,
                error: false
            };
        case 'GET_MEDIA_LIST_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_MEDIA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_MEDIA_SUCCESS':
            return {
                ...state,
                loading: false,
                mediaDeleteResponse: action.payload,
                error: false
            };
        case 'DELETE_MEDIA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_MEDIA_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_MEDIA_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                mediaEditData: action.payload,
                error: false
            };
        case 'GET_MEDIA_DATA_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_MEDIA_CHAT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_MEDIA_CHAT_SUCCESS':
            return {
                ...state,
                loading: false,
                mediaChatData: action.payload,
                error: false
            };
        case 'GET_MEDIA_CHAT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_FEEDBACK_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_FEEDBACK_SUCCESS':
            return {
                ...state,
                loading: false,
                feedbackResponse: action.payload,
                error: false
            };
        case 'SAVE_FEEDBACK_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_DRAFT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_DRAFT_SUCCESS':
            return {
                ...state,
                loading: false,
                draftData: action.payload,
                error: false
            };
        case 'GET_DRAFT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'SAVE_DRAFT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SAVE_DRAFT_SUCCESS':
            return {
                ...state,
                loading: false,
                draftResponse: action.payload,
                error: false
            };
        case 'SAVE_DRAFT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'DELETE_DRAFT_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'DELETE_DRAFT_SUCCESS':
            return {
                ...state,
                loading: false,
                draftDeleteResponse: action.payload,
                error: false
            };
        case 'DELETE_DRAFT_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_FRIEND_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_FRIEND_SUCCESS':
            return {
                ...state,
                loading: false,
                friendRequests: action.payload,
                error: false
            };
        case 'GET_FRIEND_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'ACCEPT_FRIEND_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'ACCEPT_FRIEND_SUCCESS':
            return {
                ...state,
                loading: false,
                acceptFriendRequestResponse: action.payload,
                error: false
            };
        case 'ACCEPT_FRIEND_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'REJECT_REQUEST_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'REJECT_REQUEST_SUCCESS':
            return {
                ...state,
                loading: false,
                rejectFriendRequestResponse: action.payload,
                error: false
            };
        case 'REJECT_REQUEST_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        case 'GET_CUSTOM_API_KEY_REQUEST':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'GET_CUSTOM_API_KEY_SUCCESS':
            return {
                ...state,
                loading: false,
                customApiKey: action.payload,
                error: false
            };
        case 'GET_CUSTOM_API_KEY_FAILURE':
            return {
                loading: false,
                error: true,
                ...state,
            };
        default:
            return state;
    }
};

export default reducerMethod;