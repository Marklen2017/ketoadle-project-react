import React from 'react';
import Dropzone from 'react-dropzone'
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";
import {Button} from 'tabler-react';

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


export default class DropzoneContainer extends React.Component {
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
        const { files } = this.state;
        const { onCancelClick, onSubmit,onReaction,isShared } = this.props;
        return (
            <Dropzone accept="image/*" onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple={this.props.isMultiple}>
                {({ getRootProps, getInputProps }) => (
                    <section style={{ textAlign: 'center' }}>

                        <aside style={thumbsContainer}>
                            {files ? files.map((file, index) => {
                                return <div style={thumb} key={file.name}>
                                    <div style={thumbInner}>
                                        <img
                                            src={file.preview}
                                            style={img}
                                        />
                                        <span style={deleteButton}><Icon style={{ color: '#ff0000', cursor: 'pointer' }} onClick={() => this.onRemove(index)}>highlight_off</Icon></span>
                                    </div>
                                </div>
                            }) : null}
                        </aside>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
                                {!isShared && <div {...getRootProps({ className: 'dropzone' })}>
                                    <Icon style={{ color: '#4267b2', cursor: 'pointer' }} tite="Share Pictures">panorama</Icon>
                                    <input {...getInputProps()} />
                                </div>}
                                <Icon style={{ cursor: 'pointer',color:'#f0f0f1' }} tite="Emojis" onClick={onReaction}>emoji_emotions</Icon>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                                
                                {/* <Icon style={{ color: '#4267b2', marginRight: 5, cursor: 'pointer' }} onClick={onSubmit} tite="Share">send</Icon>
                                <Icon style={{ color: '#ff0000', marginRight: 5, cursor: 'pointer' }} onClick={onCancelClick} tite="Cancel">delete</Icon> */}
                                <Button outline color="danger" size="sm" onClick={onCancelClick}>Cancel</Button>
                                <Button outline color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} size="sm" onClick={onSubmit}>Post</Button>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}

DropzoneContainer.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.bool
};

DropzoneContainer.defaultProps = {
    isMultiple: false
};
