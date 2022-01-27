// import moment from "moment";
// import React, { Component } from 'react';
// import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, localeMoment } from 'react-big-scheduler';
// import 'react-big-scheduler/lib/css/style.css'
// import {Redirect} from 'react-router-dom';
// import { getUserType } from '../common-methods';
// import withDragDropContext from './withDndContext';

// let resources = [
//     {
//         id: 'r1',
//         name: 'Interviews'
//     }
// ];

// let schedularData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
// class CalendarComp extends Component {
//     constructor(props) {
//         super(props);
//         const userType = getUserType();
//         moment.locale('en_GB');
//         schedularData.setLocaleMoment(moment);
//         schedularData.localeMoment.locale('en_GB');
//         let screenSize = window.screen.availWidth;
//         schedularData.config.schedulerWidth='45%';
        
//         if (screenSize > 500 && screenSize < 1500) {
//             schedularData.config.schedulerWidth = '50%';
//         } else if (screenSize > 500 && screenSize < 1300) {
//             schedularData.config.schedulerWidth = '55%';
//         } else if(screenSize <= 500){
//             schedularData.config.schedulerWidth = '90%';
//         }
//         //  s
//         //  schedularData.config.agendaMaxEventWidth = 200;
//         // schedularData.config.dayCellWidth = 200;
//         schedularData.setResources(resources);
//         schedularData.config.views=[{"viewName":"Day","viewType":0,"showAgenda":false,"isEventPerspective":false},{"viewName":"Week","viewType":1,"showAgenda":false,"isEventPerspective":false},{"viewName":"Month","viewType":2,"showAgenda":false,"isEventPerspective":false},{"viewName":"Year","viewType":4,"showAgenda":false,"isEventPerspective":false}];
//         // {"viewName":"Quarter","viewType":3,"showAgenda":false,"isEventPerspective":false}
//         this.state = {
//             viewModel: schedularData, events: []
//         }
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.scheduleDates && nextProps.scheduleDates !== this.props.scheduleDates) {
//             let events = [];
//             const userType = getUserType();
//             nextProps.scheduleDates && nextProps.scheduleDates.data && nextProps.scheduleDates.data.map((data, index) => {
//                 let formattedDate = data.selectedDate ? data.selectedDate.split('To') : [];
//                 if (formattedDate.length && formattedDate.length >= 2) {
//                     let eventObj = {};
//                     eventObj.id = index;
//                     eventObj.start = formattedDate[0];
//                     eventObj.end = formattedDate[1];
//                     eventObj.resourceId = 'r1';
//                     eventObj.title = userType === 'recruiter' ? (data.jobSeekerId ? `Interview with ${data.jobSeekerId.name+'('+data.jobId+')'}` : `Interview for ${data.jobId}`) : (data.recruiterId ? `Interview with ${data.recruiterId.name+'('+data.jobId+')'}` : `Interview for ${data.jobId}`);
//                     eventObj.bgColor = '#f759ab';
//                     eventObj.movable = false;
//                     events.push(eventObj);
//                 }
//                 this.setState({ events: events });
//             });
//             schedularData.setEvents(events);
//         }
//     }

//     prevClick = (schedulerData) => {
//         schedulerData.prev();
//         schedulerData.setEvents(this.state.events);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     nextClick = (schedulerData) => {
//         schedulerData.next();
//         schedulerData.setEvents(this.state.events);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     onViewChange = (schedulerData, view) => {
//         schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
//         schedulerData.setEvents(this.state.events);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     onSelectDate = (schedulerData, date) => {
//         schedulerData.setDate(date);
//         schedulerData.setEvents(this.state.events);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     eventClicked = (schedulerData, event) => {
//         const data=this.props.scheduleDates && this.props.scheduleDates.data && this.props.scheduleDates.data[event.id];
//         this.setState({jobId:data.jobId});
//         // alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
//     };

//     ops1 = (schedulerData, event) => {
//         alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
//     };

//     ops2 = (schedulerData, event) => {
//         alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
//     };

//     newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {

//         let newFreshId = 0;
//         schedulerData.this.state.events.forEach((item) => {
//             if (item.id >= newFreshId)
//                 newFreshId = item.id + 1;
//         });

//         let newEvent = {
//             id: newFreshId,
//             title: 'New event you just created',
//             start: start,
//             end: end,
//             resourceId: slotId,
//             bgColor: 'purple'
//         }
//         schedulerData.addEvent(newEvent);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     updateEventStart = (schedulerData, event, newStart) => {
//         schedulerData.updateEventStart(event, newStart);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     updateEventEnd = (schedulerData, event, newEnd) => {
//         schedulerData.updateEventEnd(event, newEnd);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
//         schedulerData.moveEvent(event, slotId, slotName, start, end);
//         this.setState({
//             viewModel: schedulerData
//         })
//     }

//     onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
//         if (schedulerData.ViewTypes === ViewTypes.Day) {
//             schedulerData.next();
//             schedulerData.setEvents(this.state.events);
//             this.setState({
//                 viewModel: schedulerData
//             });

//             schedulerContent.scrollLeft = maxScrollLeft - 10;
//         }
//     }

//     onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
//         if (schedulerData.ViewTypes === ViewTypes.Day) {
//             schedulerData.prev();
//             schedulerData.setEvents(this.state.events);
//             this.setState({
//                 viewModel: schedulerData
//             });

//             schedulerContent.scrollLeft = 10;
//         }
//     }

//     onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
//         console.log('onScrollTop');
//     }

//     onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
//         console.log('onScrollBottom');
//     }

//     toggleExpandFunc = (schedulerData, slotId) => {
//         schedulerData.toggleExpandStatus(slotId);
//         this.setState({
//             viewModel: schedulerData
//         });
//     }

//     render() {
//         const { viewModel } = this.state;
//         if (this.state.jobId) {
//             return <Redirect to={`/job-posts?jobId=${this.state.jobId}`} />
//         }
//         return (
//             <Scheduler schedulerData={viewModel}
//                 prevClick={this.prevClick}
//                 nextClick={this.nextClick}
//                 onSelectDate={this.onSelectDate}
//                 onViewChange={this.onViewChange}
//                  eventItemClick={this.eventClicked}
//                 //  viewEventClick={this.ops1}
//                 //  viewEventText="Ops 1"
//                 //  viewEvent2Text="Ops 2"
//                 //  viewEvent2Click={this.ops2}
//                 //  updateEventStart={this.updateEventStart}
//                 //  updateEventEnd={this.updateEventEnd}
//                 moveEvent={this.moveEvent}
//                 //  newEvent={this.newEvent}
//                 onScrollLeft={this.onScrollLeft}
//                 onScrollRight={this.onScrollRight}
//                 onScrollTop={this.onScrollTop}
//                 onScrollBottom={this.onScrollBottom}
//                 toggleExpandFunc={this.toggleExpandFunc}
//             />
//         )
//     }
// }

// export default withDragDropContext(CalendarComp);