import React from 'react';
import CreateEditJob from './CreateEditJob';

export default class JobDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={id:this.props.match && this.props.match.params && this.props.match.params.id}
    }

    render() {
        return (
            <CreateEditJob isDetails={true} jobId={this.state.id} />
        )
    }
}