import React from 'react';
import Modal from 'react-modal';
import MaterialUIPickers from './DatePicker';
import { Icon } from '@material-ui/core';
import { Button } from 'shards-react';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


export default class ModalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: props.open,
            selectedDate: [],
            scheduleArray: [],
            isEdit: true
        };
    }

    //   openModal() {
    //     this.setState({modalIsOpen: true});
    //   }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalData && nextProps.modalData && nextProps.modalData !== this.props.modalData) {
            if (nextProps.modalData.selectedDate) {
                this.setState({ isEdit: false });
            }
            else {
                nextProps.modalData.forEach(element => {
                    let scheduleArray = this.state.scheduleArray;
                    scheduleArray.push(scheduleArray.length);
                    this.setState({ scheduleArray });
                });
                this.setState({ selectedDate: nextProps.modalData });
            }
        }
    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalIsOpen: false });
    }

    setDate = (date, index) => {
        let selectedDate = this.state.selectedDate;
        selectedDate[index] = date;
        this.setState({ selectedDate });
    }

    onAddDates = () => {
        let scheduleArray = this.state.scheduleArray;
        scheduleArray.push(scheduleArray.length);
        let selectedDate=this.state.selectedDate;
        const newDate=new Date()+'To'+new Date();
        selectedDate[scheduleArray.length] = newDate;
        this.setState({ scheduleArray, selectedDate });
    }

    onRemoveDates = (index) => {
        let scheduleArray = this.state.scheduleArray;
        let selectedDate = this.state.selectedDate;
        scheduleArray.splice(index, 1);
        selectedDate.splice(index, 1);
        this.setState({ scheduleArray, selectedDate });
    }

    render() {
        const noDataStyle = { padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB', marginTop: 10 };
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Schedule Interview"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>Schedule Interview Dates
                        <Icon style={{ color: '#00af50', cursor: 'pointer' }} onClick={this.onAddDates}>add_circle_outline</Icon>
                        {/* {this.state.scheduleArray && this.state.scheduleArray.length ? <Icon style={{ color: '#00af50', cursor: 'pointer' }} onClick={this.onRemoveDates} disabled={!this.state.scheduleArray.length}>remove_circle_outline</Icon> : ''}</div> */}
                    </div>
                    {this.state.scheduleArray.map((data, index) => (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialUIPickers setDate={(date) => this.setDate(date, index)} key={index} selectedDate={this.state.selectedDate[index]} />
                            <Icon style={{ color: '#00af50', cursor: 'pointer', marginLeft: 5 }} onClick={() => this.onRemoveDates(index)} disabled={!this.state.scheduleArray.length}>remove_circle_outline</Icon></div>
                    ))}
                    {!this.state.isEdit && <p style={noDataStyle}>Seeker has selected the date, So can't change now</p>}
                    {this.props.modalData && this.props.modalData.selectedDate && <p style={noDataStyle}>Date Choosen For Interview By Seeker Is {this.props.modalData.selectedDate}</p>}
                    <Button color="danger" style={{ backgroundColor: '#cd201f', borderColor: '#cd201f', color: 'white' }} onClick={this.closeModal}>Cancel</Button>
                    <Button disabled={!this.state.isEdit || !this.state.selectedDate.length} style={{ backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={() => this.props.scheduleInterview(this.state.selectedDate)}>Shedule</Button>
                </Modal>
            </div>
        );
    }
}