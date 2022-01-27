import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Grid } from 'tabler-react';
import Icon from '@material-ui/core/Icon';

export default function Features() {
    const [selectedTab, setSelectedTab] = useState(0);
    const screenWidth = window.screen.width;
    const getData = (title, subtitle, icon) => {
        return <div style={screenWidth > 500 ? { borderRadius: 5, position: 'relative', margin: '0 auto', boxShadow: '0 0 20px #E6E6E6', backgroundColor: '#fff', padding: 10, marginLeft: 20, marginRight: 20 } : { borderRadius: 5, position: 'relative', width: '100%', margin: '0 auto', boxShadow: '0 0 20px #E6E6E6', backgroundColor: '#fff', padding: 10, marginLeft: 20, marginRight: 20 }}>
            <Icon style={{ position: 'absolute', left: -20, top: -18, color: selectedTab ? '#00af50' : '#4267b2', fontSize: screenWidth > 500 ? 40 : 30 }}>{icon ? icon : 'contacts'}</Icon>
            <div style={{ fontSize: 16, fontFamily: 'bold', color: 'black' }}>{title}</div>
            <div style={{ fontSize: 14, color: 'black' }}>{subtitle}</div>
        </div>
    }

    const onTabChange = (value) => {
        setSelectedTab(value);
    }
    return (
        <div style={{ marginBottom: 50, paddingRight: 10, paddingLeft: 10, paddingBottom: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ marginBottom: 20, color: '#000', fontSize: 18 }}> Included Features & Costs</div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span onClick={() => onTabChange(0)} style={selectedTab === 0 ? { cursor: 'pointer', padding: 10, backgroundColor: '#4267b2', borderRadius: 5, fontSize: 18, color: 'white',width: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : { cursor: 'pointer', padding: 10, backgroundColor: '#fff', color: '#4267b2', fontSize: 18, borderRadius: 5, marginRight: 5,width: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Job Seekers</span>
                <span onClick={() => onTabChange(1)} style={selectedTab === 1 ? { cursor: 'pointer', padding: 10, backgroundColor: '#00af50', borderRadius: 5, fontSize: 18, color: 'white',width: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : { cursor: 'pointer', padding: 10, backgroundColor: '#fff', color: '#00af50', fontSize: 18, borderRadius: 5, marginLeft: 5,width: 50, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Employers, Recruiters</span>
            </div>
            {selectedTab === 0 ? <div>
                <Grid.Row>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Live Open Chat', 'Private conversations direct with employers and recruiters. Make connections and chat in your own space.', 'forum')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Shortlisted Status', 'View and see when your CV/portfolio or job application is shortlisted when an employer or recruiter adds you to the next stage of the job process. ', 'grade')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Automated Interview Schedules', 'Automatic interview schedules sent direct to you. Simply book your place and it will be added into your personal calendar. ', 'today')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Job Status Updates', 'Get in-depth information from a job advert with the chance to find out more, view the job status when changes happen. ', 'check_circle')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Create A Media Portfolio', 'Create a portfolio with videos and images. Showcase your works and introduce yourself with a personalised video.', 'perm_media')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Skill Sets Scoring', 'Our new skillsets scoring matches you to a job much more accurately. Apply for jobs using auto match and apply. ', 'score')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Global Community', 'Post questions, offer help to other like-minded job seekers, professionals and more in our social global community. ', 'people')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Media Market', 'Our Media Market will auto match courses, career events to aid, enhance, and guide you in your regional location/s. ', 'store')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Email Reduction', 'No spammy emails, simply put notifications are sent direct to you with anything related to your job application. ', 'email')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Finding Out More ', 'Post questions directly to the advertised job and receive answers by notification. Read other members Q&A’s ', 'question_answer')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Automated References', 'Add automated reference to your CV & Portfolio. Don’t chase about sending emails, you can now let us do the work. ', 'history')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Real-time CV Status ', 'Create and add your CV, and let Ketoadle update all other employers and recruiters when you make any changes. ', 'dynamic_feed')}
                    </Grid.Col>
                </Grid.Row>
            </div> : ''}
            {selectedTab ? <div>
                <Grid.Row>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Live Open Chat', 'Hold private conversations with Job seekers and collaborate with your team members. ', 'forum')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Shortlisted Status', 'Add Job seekers to the first stage job process quickly and efficiently with short listing your automated matches. ', 'star')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('3rd Party Clients', 'Send your clients the short listed Job seekers and get real-time updates and changes with our automated service', 'supervised_user_circle')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Automated Interview Schedules ', 'Your Shortlisted Job Seekers will be added to the interview stage with calendar schedules in real-time by your clients. ', 'today')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Job Status Updates', 'Be notified in real-time when jobs are ending, Job seekers are applied or new matches have been found and more. ', 'check_circle')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Skill Sets Scoring', 'Our new skillsets scoring matches your job advert more accurately to Job seekers and aiding in efficiency and speed.', 'score')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Global Community', 'Offer Job seekers, professionals, students and Armed Force members help and advice when questions are posted or help is needed. ', 'people')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Media Market', 'Advertise your career events, courses you may have and more while we auto match and offer to you and your team members.', 'store')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Email Reduction', 'No spammy emails, simply put notifications are sent direct to you with anything related to your job adverts and Job seekers. ', 'email')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Finding Out More ', 'Receive Job seeker questions and give answers which are associated to the job advert you have live on the platform. ', 'question_answer')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Automated References', 'Our automated referencing saves you the time and effort required to simply read past employer’s feedback of a Job seeker. ', 'history')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Real-time CV Status ', 'You will be sent updates when a Job seeker makes a change to their CV or simply removes their job application. ', 'dynamic_feed')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Build A Team', 'You can now add members to your team quickly and easily to aid your company when searching for the right candidate. ', 'supervisor_account')}
                    </Grid.Col>
                    <Grid.Col lg="4" md="6" sm="12" className="mb-6">
                        {getData('Manage And Create Jobs ', 'Create and manage job adverts with your team and schedule as required. View individual job advert status, notifications and more.', 'create')}
                    </Grid.Col>
                </Grid.Row>
            </div> : ''}
        </div>
    );
}