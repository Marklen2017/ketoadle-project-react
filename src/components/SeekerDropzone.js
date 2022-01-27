import React from 'react';
import Dropzone from 'react-dropzone'
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";
import { Button } from 'tabler-react';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%'
};

const deleteButton = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    height: '30%'
}


export default class SeekerDropzone extends React.Component {
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
        acceptedFiles.map(file => this.props.onThumbnailChange(file));
    }

    onRemove = (index) => {
        let files = this.state.files;
        files.splice(index, 1);
        this.props.onThumbnailRemove(files);
    }

    render() {
        return (
            <Dropzone accept="image/*" onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple={this.props.isMultiple}>
                {({ getRootProps, getInputProps }) => (
                    <section style={{ textAlign: 'center' }}>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <Icon style={{ color: '#4267b2', cursor: 'pointer' }} tite="Share Pictures">panorama</Icon>
                            <input {...getInputProps()} />
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}

SeekerDropzone.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.bool
};

SeekerDropzone.defaultProps = {
    isMultiple: false
};
