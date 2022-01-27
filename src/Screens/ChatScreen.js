import React, { useEffect, useState, useRef } from 'react';
import { parseJwt, getAccessToken, getUserType, getUserName } from '../common-methods';
import axios from 'axios';
import { BASE_URL } from '../redux/Constants';
import { Button, Form, Card } from 'tabler-react';
import MaterialIcon from '@material/react-material-icon';
import Icon from '@material-ui/core/Icon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import { suscribeToSocket, getNotifications } from '../redux/Actions';
import Badge from '@material-ui/core/Badge';
import Toaster from '../redux/Toaster';

export const Chat = (props) => {
	const [chatMessage, setChatMessage] = useState('');
	const [chatHistory, setChatHistory] = useState([]);
	const [chatId, setChatId] = useState('');
	const [yourId, setYourId] = useState(parseJwt(JSON.parse(localStorage.getItem('userData')).token)._id);
	const [selectedIcon, setSelectedIcon] = useState('chat');
	const [chatRecruiterImage, setRecruiterchatImage] = React.useState(props.chatRecruiterImage);
	const [chatSeekerImage, setSeekerchatImage] = React.useState(props.chatSeekerImage);
	const [chatStatus, setChatStatus] = useState(props.chatStatus);
	const [selectedTab, setSelectedTab] = useState('chat');
	const [question, setQuestions] = useState([]);
	const [questionsData, setQuestionsData] = useState([]);
	const [jobDetails, setJobDetails] = useState({});
	const [isAdd, setIsAdd] = useState(true);
	const [jobId, setJobId] = useState(props.postId);
	const [notifications, setNotifications] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isShortListed, setIsShortListed] = useState(false);
	const [interviewDates, setInterviewDates] = useState([]);
	const [selectedDate, setSeletedDate] = useState(null);

	// check if logged in user is recruiter of jobSeeker
	const userType = getUserType();

	const chatIdRequestBody = {};

	if (userType === 'recruiter') {
		// chatIdRequestBody.recruiterId = parseJwt(JSON.parse(localStorage.getItem('userData')).token)._id;
		chatIdRequestBody.chatWith = props.chatId;
		chatIdRequestBody.jobId = jobId;
	} else {
		// chatIdRequestBody.jobSeekerId = parseJwt(JSON.parse(localStorage.getItem('userData')).token)._id;
		chatIdRequestBody.chatWith = props.chatId;
		chatIdRequestBody.jobId = jobId;
	}
	if (props.isMedia) {
		chatIdRequestBody.chatType = 'media';
	}

	useEffect(() => {
		axios
			.post(`${BASE_URL}api/chat/getChatId`, chatIdRequestBody, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				getChatHistory(response.data.data);
				setChatId(response.data.data);
				subscribeToMessage(response.data.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
		props.notificationId && axios
			.delete(`${BASE_URL}api/notification/deleteNotification/${props.notificationId}`, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				getChatHistory(chatId);
				props.getNotifications();
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, [props]);

	const postQuestion = (type) => {
		let request = {
			"question": questionsData
		};
		axios
			.post(`${BASE_URL}api/chat/addQuestionToChat/${chatId}`, request, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				setQuestionsData([]);
				getChatHistory(chatId);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	const subscribeToMessage = (chatId) => {
		global.socket.on('chatMessage', (data) => {
			getChatHistory(chatId);
		});
	};

	useEffect(() => {
		suscribeToSocket(JSON.parse(localStorage.getItem('userData')).token);
	}, [props.chatId])

	const onSubmitMessage = () => {

		if (!chatMessage) {
			return;
		}
		global.socket.emit('message', {
			chatId,
			jobId,
			name: getUserName(),
			message: chatMessage,
			userId: parseJwt(JSON.parse(localStorage.getItem('userData')).token)._id
		});

		const tempHistory = [...chatHistory];
		tempHistory.push({
			userId: parseJwt(JSON.parse(localStorage.getItem('userData')).token)._id,
			message: chatMessage,
			time: new Date()
		});
		setChatHistory(tempHistory);
	};

	const getChatHistory = (chatId) => {
		setLoading(true);
		axios
			.post(
				`${BASE_URL}api/chat/getChatHistory`,
				{
					chatId
				},
				{
					headers: {
						token: getAccessToken()
					}
				}
			)
			.then((response) => {
				setLoading(false);
				setChatHistory(response.data.data);
				response.data.notifications && setNotifications(response.data.notifications);
				setIsShortListed(response.data.shortlisted);
				if (response.data.proposedDatesByRecruiter) {
					// let dates=[];
					// response.data.proposedDatesByRecruiter.length && response.data.proposedDatesByRecruiter.map(data=>{
					// 	let getDate = data.split('To');
					// 	if (getDate.length === 2 && getDate[0] !== 'undefined' && getDate[1] !== 'undefined') {
					// 		setSelectedStartDate(getDate[0]);
					// 		setSelectedEndDate(getDate[1]);
					// 	}
					// })
					setInterviewDates(response.data.proposedDatesByRecruiter);
					setSeletedDate(response.data.selectedDate);
				}

				if (response.data.questions && response.data.questions.length)
					setQuestions(response.data.questions);
				else
					setQuestions(response.data.job ? response.data.job.questions : []);
				setJobDetails(response.data.job);
				let box = document.getElementById("chatBoxId");
				box.scrollTop = box.scrollHeight;
			})
			.catch((error) => {
				setLoading(false);
				console.log(error.response);
			});
	};

	const keyPressed = (event) => {
		if (event.key === 'Enter') {
			if (selectedTab === 'chat') {
				onSubmitMessage();
				setChatMessage('');
			}
			// else if (selectedTab === 'help')
			// 	postQuestion();
		}
	}

	const onIconClick = (name) => {
		setSelectedIcon(name);
	}

	const messagesEndRef = useRef(null)

	// const scrollToBottom = () => {
	// 	if (messagesEndRef && messagesEndRef.scrollHeight) {
	// 		const scrollHeight = messagesEndRef.scrollHeight;
	// 		const height = messagesEndRef.clientHeight;
	// 		const maxScrollTop = scrollHeight - height;
	// 		messagesEndRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
	// 	}
	// }


	// useEffect(scrollToBottom, [chatHistory]);

	const onNotificationClick = (id) => {
		onTabChange('chat');
		onIconClick('chat');
		axios
			.delete(`${BASE_URL}api/notification/deleteNotification/${id}`, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				getChatHistory(chatId);
				props.getNotifications();
			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	const onInterviewDateSelect = (date) => {
		if (userType === 'recruiter') {
			return;
		}
		let request = {
			"selectedDate": date
		};
		axios
			.post(`${BASE_URL}api/schedule/selectDateForInterview/${jobId}`, request, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				if ((response.status === 200 && response.statusText === "OK") || (response.error === false))
					Toaster(`Interview Scheduled Successfully`, 'success');
				else
					Toaster('Something went', 'error');

			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	const onShortlist = () => {
		let request = {
			"jobId": jobId,
			"jobSeekerId": props.chatId
		};
		let url = !isShortListed ? 'shortlistUser' : 'removeFromShortlist';
		axios
			.post(`${BASE_URL}api/chat/${url}`, request, {
				headers: {
					token: getAccessToken()
				}
			})
			.then((response) => {
				if ((response.status === 200 && response.statusText === "OK") || (response.error === false))
					setIsShortListed(!isShortListed)
			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	useEffect(() => {
		let box = document.getElementById("chatBoxId");
		box.scrollTop = box.scrollHeight;
	}, [chatHistory, chatMessage])

	const onTabChange = (tab) => {
		setSelectedTab(tab);
	}

	const getFormattedDate = (date) => {
		let formattedDate = date ? date.split('To') : [];
		if (formattedDate.length && formattedDate.length >= 2) {
			let startDate = new Date(formattedDate[0]);
			let endDate = new Date(formattedDate[1]);
			let finalEndTime = null;
			let finalDate = null;
			let finalStartTime = null;
			if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
				finalDate = startDate.toLocaleDateString();
				finalStartTime = startDate.toLocaleTimeString();
				finalEndTime = endDate.toLocaleTimeString();
				return { finalDate, finalEndTime, finalStartTime };
			}
			else {
				finalDate = startDate.toUTCString();
				finalEndTime = endDate.toUTCString();
				return { finalDate, finalEndTime };
			}
		}
		return null;
	}

	const iconStyle = { paddingTop: 1, fontSize: 16, color: '#cccccc', cursor: 'pointer' };
	const selectedIconStyle = { paddingTop: 1, fontSize: 16, color: 'orange', cursor: 'pointer' }
	const noDataStyle = { padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB' };
	let image = localStorage.getItem('userImage') && localStorage.getItem('userImage') !== 'undefined' ? localStorage.getItem('userImage') : "demo/faces/female/user.png";

	let userName = localStorage.getItem('userName') && localStorage.getItem('userName') !== 'undefined' ? localStorage.getItem('userName') : 'User';
	let isRecruiter = userType === 'recruiter' ? true : false;
	return (
		<div className="card chatBox">
			<div className="card-header" style={{ color: 'orange', display: 'flex', justifyContent: 'space-around', paddingLeft: 0, paddingRight: 5 }}>
				<span>
					<img width="30" height="30" className="rounded-circle" src={chatRecruiterImage ? chatRecruiterImage : image} alt="User Image" />
					<img width="30" height="30" className="rounded-circle secondImage" src={chatSeekerImage ? chatSeekerImage : image} alt="User Image" />
				</span>
				<div style={{ display: 'flex', flexDirection: 'column', fontSize: 12 }}>
					<span><span style={{ color: 'grey' }}>{isRecruiter ? (props.mediaType ? `${props.mediaType} :` : 'Job Seeker : ') : 'Job Advert : '}</span>{props.clientName && (props.clientName.charAt(0).toUpperCase() + props.clientName.slice(1))}</span>
					<span><span style={{ color: 'grey' }}>{isRecruiter ? 'Job Advert : ' : 'Job Seeker : '}</span>{userName && (userName.charAt(0).toUpperCase() + userName.slice(1))}</span></div>
				<FiberManualRecordIcon style={chatStatus ? { color: '#00af50' } : { color: '#cccccc' }} />
				{/* <MaterialIcon   icon='fiber_manual_record_icon' style={chatStatus ? { color: '#00af50' } : { color: '#cccccc' }} /> */}
				< MaterialIcon icon='close' style={{ color: '#cccccc', cursor: 'pointer' }} onClick={props.onClose} />
			</div>
			<div style={{ overflowY: 'scroll', marginBottom: 20 }} ref={messagesEndRef} id="chatBoxId">
				{selectedTab === 'chat' && <div className="card-body" style={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 70 }}>
					{chatHistory.length === 0 && <p>No chat available</p>}
					{chatHistory.map((history) => {
						if (history.userId === yourId) {
							return (
								<div className="rightChatBox" style={{ padding: 5 }}>
									<h4 style={{ marginBottom: 0 }}>You</h4>
									<p style={{ marginBottom: 0 }}>{history.message}</p>
								</div>
							);
						}
						else {
							return <div className="leftChatBox" style={{ padding: 5 }}>
								<h4 style={{ marginBottom: 0 }}>{props.clientName ? (props.clientName.charAt(0).toUpperCase() + props.clientName.slice(1)) : 'Gaurav'}</h4>
								<p style={{ marginBottom: 0 }}>{history.message}</p>
							</div>
						}
					})}
				</div>}


				{/* save seeker/job section */}


				{selectedTab === 'save' && <div className="card-body" style={{ paddingBottom: 70, paddingLeft: 0, paddingRight: 0 }}>
					<p style={{ backgroundColor: '#F5F7FB', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
						<span style={{ backgroundColor: 'grey', padding: 10, color: '#fff' }}>{props.seekerScore}</span>
						<img
							style={{ borderRadius: '50%', margin: 5 }}
							src={chatSeekerImage ? chatSeekerImage : image}
							alt={'no image'}
							width="30"
							height="30"
						/>
						{props.clientName && (props.clientName.charAt(0).toUpperCase() + props.clientName.slice(1))}
						{isRecruiter && <Icon onClick={onShortlist} style={!isShortListed ? { color: '#00af50', cursor: 'pointer', marginLeft: 10, marginRight: 10 } : { color: '#ff0000', cursor: 'pointer', marginLeft: 10, marginRight: 10 }}>{!isShortListed ? 'add' : 'remove'}</Icon>}
						<FiberManualRecordIcon style={chatStatus ? { color: '#00af50', width: 12, height: 12 } : { color: 'grey', width: 12, height: 12 }} />
					</p></div>}



				{/* schedule calender section */}
				{selectedTab === 'date' && <div className="card-body" style={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 70 }}>
					{interviewDates.length ? interviewDates.map((data, index) => {
						let date = getFormattedDate(data);
						return date ? <p onClick={() => onInterviewDateSelect(data)} style={{ padding: 10, backgroundColor: '#F5F7FB', textAlign: 'left', cursor: 'pointer' }} key={0}>{index + 1}. {date.finalDate ? date.finalDate + (date.finalStartTime ? '' : ' - ' + date.finalEndTime) : 'data'} {date.finalStartTime ? 'From: ' + date.finalStartTime + ' To: ' + date.finalEndTime : ''})</p> : <p style={{ padding: 10, backgroundColor: '#F5F7FB', textAlign: 'left' }} key={0}>{index + 1}. No date selected</p>
					}) : <p style={noDataStyle}>No schedule dates</p>
					}
					{selectedDate && <div>Selected Date : <p style={noDataStyle}>{getFormattedDate(selectedDate).finalDate ? getFormattedDate(selectedDate).finalDate + (getFormattedDate(selectedDate).finalStartTime ? '' : ' - ' + getFormattedDate(selectedDate).finalEndTime) : 'data'} {getFormattedDate(selectedDate).finalStartTime ? 'From: ' + getFormattedDate(selectedDate).finalStartTime + ' To: ' + getFormattedDate(selectedDate).finalEndTime : ''}</p></div>}
				</div>
				}



				{/* job detail/view section */}

				{selectedTab === 'view' && <div className="card-body" style={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 70 }}>
					<div style={{ cursor: 'pointer', border: '1px solid #EAEAEA' }} >
						<div className="dashboard-card" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap', borderRadius: 0 }} title={jobDetails._id}>Job Reference : {jobDetails._id}</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontWeight: 'bold', color: '#fff' }}>
							<span style={{
								width: '49%', height: 60, backgroundColor: '#00af50', display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center'
							}}><span>Auto Matches</span><span>{jobDetails.autoApplicant ? jobDetails.autoApplicant.length : 0}</span></span>
							<span style={{
								width: '49%', height: 60, backgroundColor: '#4267b2', display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center'
							}}><span>Job Applicants</span><span>{jobDetails.manualApplicant ? jobDetails.manualApplicant.length : 0}</span></span>
						</div>
						<Card.Body className="p-3" style={{
							maxHeight: 140,
							minHeight: 140
						}}>
							<h5 className="card-title" title={jobDetails.title} style={{
								width: '100%',
								overflow: 'hidden',
								display: 'inline-block',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								marginBottom: 0
							}}>
								<a className="text-fiord-blue">
									{jobDetails.title}
								</a>
							</h5>
							<p className="card-text mb-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap' }} title={jobDetails.description}>{jobDetails.description}</p>
						</Card.Body>
						{/* <span className="text-muted p-3" style={{ borderTop: '1px solid #e1e5eb', display: 'flex' }}>Posted on: {(date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear()}</span> */}
						<div style={{ textAlign: 'center', padding: 5 }}>
							<Link to={`/job-posts?jobId=${props.postId}`} style={{ textDecoration: 'none' }}><Button color="primary" size="sm">Read More...</Button></Link>
						</div>
					</div>
				</div>}

				{/* Notification section */}


				{selectedTab === 'notification' && <div className="card-body" style={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 70 }}>
					{notifications ? notifications.map((notificationData, index) => {
						return <p style={{ padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB', display: 'flex', cursor: 'pointer' }} key={index} onClick={() => onNotificationClick(notificationData._id)}>
							<div>
								<img
									src={notificationData.image ? notificationData.image : "demo/faces/female/user.png"}
									alt="Logo"
									height="30px"
									width="30px"
								/>
							</div>
							<div>{notificationData.message}</div>
						</p>
					}) : <p style={noDataStyle}>No notification found</p>}
				</div>}



				{/* Question answer section */}
				{selectedTab === 'help' && <div className="card-body" style={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 70 }}>
					<div style={{ marginBottom: 10, width: '100%', textAlign: 'right' }}>
						{question && question.length ? question.map((data, index) => {
							return <p style={{ padding: 10, backgroundColor: '#F5F7FB', textAlign: 'left' }} key={index}>Question: {data.question ? data.question : data}</p>
						}) : <p style={{ padding: 10, backgroundColor: '#F5F7FB', textAlign: 'left' }}>No questions/answers found</p>}
					</div>
				</div>}
			</div>
			<div className="chatBottom">
				{selectedTab === 'chat' ? <Form.InputGroup>
					<Form.Input type="text" placeholder="Message" value={chatMessage} onKeyPress={keyPressed}
						onChange={(event) => {
							setChatMessage(event.target.value);
						}} />
					<Form.InputGroup append>
						<Button
							color="warning"
							icon="send"
							loading={isLoading}
							onClick={() => {
								onSubmitMessage();
								setChatMessage('');
							}}
						/>
					</Form.InputGroup>
				</Form.InputGroup> : (selectedTab === 'help' && <Form.InputGroup>
					<Form.Input type="text" placeholder='Ask Question' value={questionsData} onKeyPress={keyPressed}
						onChange={(e) => setQuestionsData(e.target.value)} />
					<Form.InputGroup append>
						{/* <Button
							color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}
							// icon="send"
							onClick={()=>postQuestion('ans')}
							loading={isLoading}
						>Post</Button> */}
						<Button
							color="warning"
							// icon="send"
							onClick={postQuestion}
							loading={isLoading}
						>{isRecruiter ? 'Send' : 'Ask'}</Button>
					</Form.InputGroup>
				</Form.InputGroup>)}
				{props.postId && !props.isMedia && props.type !== 'media' && <div style={{
					height: 40, width: 'auto', display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}>
					<span onClick={() => onTabChange('chat')}><Icon style={selectedIcon === 'chat' ? selectedIconStyle : iconStyle} title="Chat" onClick={() => onIconClick('chat')}>forum</Icon></span>
					<span onClick={() => onTabChange('save')}><Icon style={selectedIcon === 'save' ? selectedIconStyle : iconStyle} title="Shortlisted" onClick={() => onIconClick('save')}>grade</Icon></span>
					<span onClick={() => onTabChange('date')}><Icon style={selectedIcon === 'date' ? selectedIconStyle : iconStyle} title="Calender" onClick={() => onIconClick('date')}>today</Icon></span>
					{userType === 'recruiter' ? <Link to={`/seeker-detail?id=${props.chatId}`}><Icon style={selectedIcon === 'view' ? selectedIconStyle : iconStyle} title="View" >remove_red_eye</Icon></Link> : <span onClick={() => onTabChange('view')}><Icon style={selectedIcon === 'view' ? selectedIconStyle : iconStyle} title="View" onClick={() => onIconClick('view')}>remove_red_eye</Icon></span>}
					<span onClick={() => onTabChange('notification')} style={{ marginBottom: 7 }}><Badge badgeContent={notifications && notifications.length} invisible={notifications && notifications.length > 0 ? false : true} color="secondary" size="sm"><Icon style={selectedIcon === 'notification' ? selectedIconStyle : iconStyle} title="Notifications" onClick={() => onIconClick('notification')}>notifications</Icon></Badge></span>
					<span onClick={() => onTabChange('help')}><Icon style={selectedIcon === 'help' ? selectedIconStyle : iconStyle} title="Help" onClick={() => onIconClick('help')}>help</Icon></span>
				</div>}
			</div>
		</div >
	);
};
