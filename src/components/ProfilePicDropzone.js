import React from 'react';
import Dropzone from 'react-dropzone'
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";
import { Button } from 'tabler-react';

export default class ProfilePicDropzone extends React.Component {
    constructor(props) {
        super(props)
        this.state = { files: props.files };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.files && nextProps.files !== this.props.files) {
            this.setState({ files: nextProps.files })
        }
    }

    onDrop = (acceptedFiles) => {
        acceptedFiles.map(file => this.props.onPicThumbnailChange(file));
    }

    render() {
        return (
            <Dropzone accept="image/*" onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple={this.props.isMultiple}>
                {({ getRootProps, getInputProps }) => (
                    <section style={{ textAlign: 'center' }} className="dropzoneSection">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <Icon style={{ color: '#4267b2', cursor: 'pointer' }} tite="Share Pictures">camera_alt</Icon>
                            <input {...getInputProps()} />
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}

ProfilePicDropzone.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.bool
};

ProfilePicDropzone.defaultProps = {
    isMultiple: false
};
