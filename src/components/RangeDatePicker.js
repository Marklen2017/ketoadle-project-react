import React from "react";
import classNames from "classnames";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import "../range-date-picker.css";

class RangeDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      startDisable: [],
      endDisable: []
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.startDate && nextProps.startDate!==this.props.startDate){
      this.setState({startDate:nextProps.startDate})
    }
    if(nextProps.endDate && nextProps.endDate!==this.props.endDate){
      this.setState({endDate:nextProps.endDate})
    }
  }

  handleStartDateChange(value) {
    this.props.onStartDateChange && this.props.onStartDateChange(value);
    this.setState({
      ...this.state,
      ...{ startDate: new Date(value) },
      endDate: undefined
    });
  }

  handleEndDateChange(value) {
    this.props.onEndDateChange && this.props.onEndDateChange(value);
    this.setState({
      ...this.state,
      ...{ endDate: new Date(value) }
    });
  }

  render() {
    const { className,isJob } = this.props;
    const classes = classNames(className, "d-flex", "my-auto", "date-range");
    let date=this.state.startDate?(new Date(this.state.startDate)):(new Date());
    let endD=isJob?new Date(date.setDate(date.getDate() + 30)):new Date();
    return (
      <div className={classes}>
        <DatePicker
          size="sm"
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
          placeholderText="Start Date"
          dropdownMode="select"
          className="text-center"
          minDate={isJob?new Date():new Date(1970, 1, 1)}
          disabled={this.props.isDetail}
          popperPlacement="top-start"
        />
        <DatePicker
          size="sm"
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
          placeholderText="End Date"
          dropdownMode="select"
          className="text-center"
          minDate={isJob?endD:new Date(1970, 1, 1)}
          disabled={this.props.isDetail}
          popperPlacement="top-start"
        />
      </div>
    );
  }
}

export default RangeDatePicker;
