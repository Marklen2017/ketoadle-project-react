import React from 'react';
import Modal from 'react-modal';
import {
    Page,
    Grid,
    Card,
    Button,
    Form,
} from "tabler-react";
import DropzoneContainer from '../components/DropzoneContainer';

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


export default class EditTeamModal extends React.Component {
    constructor(props) {
        super(props);
        const data = props.data;
        this.state = {
            modalIsOpen: props.open,
            name: data && data.name,
            email: data && data.email,
            contact: data && data.contact,
            files: data && data.image ? [{ 'preview': data.image }] : []
        };
        this.props.onChnageData(this.state); 
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalIsOpen: false });
    }


    onThumbnailChange = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            let files = this.state.files ? this.state.files : [];
            files.push({ name: file.name, preview: event.target.result });
            this.setState({
                files: files
            });
        };
    }

    onThumbnailRemove = (files) => {
        this.setState({ files });
    }

    onChangeMethod = (key, e) => {
        this.setState({ [key]: e.target.value },this.props.onChnageData(this.state));
    }

    render() {
        // const noDataStyle = { padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB', marginTop: 10 };
        const { isModal } = this.props;
        return (
            <div>
                <Modal
                    isOpen={isModal}
                    // onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Schedule Interview"
                >
                    <Grid.Row>
                        <Grid.Col lg="4">
                            <DropzoneContainer files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} isMultiple={false} />
                        </Grid.Col>
                        <Grid.Col lg="8">
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Input id="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={(e) => this.onChangeMethod('name', e)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Input id="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    disabled={true}
                                    onChange={(e) => this.onChangeMethod('email', e)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact</Form.Label>
                                <Form.Input id="contact"
                                    placeholder="Contact"
                                    value={this.state.contact}
                                    onChange={(e) => this.onChangeMethod('contact', e)} />
                            </Form.Group>
                            <Button.List className="mt-4" align="right">
                                <Button color="danger" onClick={this.closeModal}>
                                    Cancel
      </Button>
                                <Button color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} onClick={() => this.props.onEditSave(this.state)}>
                                    Update
      </Button>
                            </Button.List>
                        </Grid.Col>
                    </Grid.Row>
                </Modal>
            </div>
        );
    }
}