import React from 'react';
import Dropzone from 'react-dropzone'
import { Button } from "tabler-react";
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent:'center'
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
        return (
            <Dropzone accept="image/*" onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple={this.props.isMultiple}>
                {({ getRootProps, getInputProps }) => (
                    <section style={{ textAlign: 'center' }}>
                        <Icon style={{ color: '#4267b2' }}>cloud_upload</Icon>
                        <div {...getRootProps({ className: 'dropzone' })} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <input {...getInputProps()} />
                            Drag and drop images here to upload
          <Button theme="accent" color="primary" className="mt-3" style={{ margin: 10,width:'50%' }}>
                                Or Click to Select
                                  </Button>
                        </div>
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
                            }):null}
                        </aside>
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
    isMultiple: true
  };
