import React from "react";
import PropTypes from "prop-types";
import {
    Grid,
    Button,
    Form,
    Avatar
} from "tabler-react";
import Icon from '@material-ui/core/Icon';
import DropzoneContainer from '../components/DropzoneContainer';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        let data = props.UserAccountDetails ? props.UserAccountDetails : null;
        this.state = { files: data && data.image ? [{ 'preview': data.image }] : [], address: data ? data.location : '', firstName: data && data.name && data.name.split(' ') ? data.name.split(' ')[0] : '', lastName: data && data.name && data.name.split(' ') ? data.name.split(' ')[1] : '' };
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
        this.setState({ [key]: e.target.value });
    }

    onSave = () => {
        let request = {
            "name": this.state.firstName + ' ' + this.state.lastName,
            "image": this.state.files && this.state.files.length ? this.state.files[0].preview : '',
            "location": this.state.address
        }

        this.props.onSave(request);
    }

    render() {
        const { UserAccountDetails } = this.props;
        return (
            <div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    {/* <Grid.Col auto>
                        <Avatar size="xl" imageURL={UserAccountDetails && UserAccountDetails.image ? UserAccountDetails.image : "demo/faces/female/user.png"} />
                    </Grid.Col> */}
                    <Grid.Col auto>
                        {/* <Form.Group> */}
                        {/* <Button color="primary" size="sm" icon="camera">Change</Button> */}
                        <DropzoneContainer files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} isMultiple={false} />
                        {/* </Form.Group> */}
                    </Grid.Col>
                </div>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Input id="feFirstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={(e) => this.onChangeMethod('firstName', e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Input id="feLastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={(e) => this.onChangeMethod('lastName', e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Input id="feAddress"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={(e) => this.onChangeMethod('address', e)} />
                </Form.Group>
                <Form.Footer>
                    <Button color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} block onClick={this.onSave}>
                        Update
      </Button>
      <Button color="danger" block onClick={this.props.onCancel}>
                        Cancel
      </Button>
                </Form.Footer>
            </div>




            //   <Card small className="mb-4">
            //     <CardHeader className="border-bottom">
            //       <h6 className="m-0">{title}</h6>
            //     </CardHeader>
            //     <ListGroup flush>
            //       <ListGroupItem className="p-3">
            //         <Row>
            //           <Col>
            //             <Row form>
            //               {/* First Name */}
            //               <Col md="6" className="form-group">
            //                 <label htmlFor="feFirstName">First Name</label>
            //                 <FormInput
            //                   id="feFirstName"
            //                   placeholder="First Name"
            //                   value={this.state.firstName}
            //                   onChange={(e) => this.onChangeMethod('firstName', e)}
            //                 />
            //               </Col>
            //               {/* Last Name */}
            //               <Col md="6" className="form-group">
            //                 <label htmlFor="feLastName">Last Name</label>
            //                 <FormInput
            //                   id="feLastName"
            //                   placeholder="Last Name"
            //                   value={this.state.lastName}
            //                   onChange={(e) => this.onChangeMethod('lastName', e)}
            //                 />
            //               </Col>
            //             </Row>
            //             <Row>
            //               <Col lg="12" sm="12" className="mb-4">
            //                 <Card className="card-post card-post--aside card-post--1">
            //                   <CardBody style={{ border: '1px dashed', borderColor: '#4267b2' }}>
            //                     <DropzoneContainer files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} />
            //                   </CardBody>
            //                 </Card>
            //               </Col>
            //             </Row>
            //             <FormGroup>
            //               <div style={{ display: 'flex' }}><label htmlFor="feAddress">Address</label>
            //                 <a href="https://www.google.com/maps" target="_blank"><Icon style={{ paddingTop: 1, fontSize: 18 }} title="Click here to select your location and paste in input">info</Icon></a>
            //               </div><FormInput
            //                 id="feAddress"
            //                 placeholder="Address"
            //                 value={this.state.address}
            //                 onChange={(e) => this.onChangeMethod('address', e)}
            //               />
            //             </FormGroup>
            // <Row form>
            //     <Col md="6" className="form-group">
            //       <label htmlFor="feCity">City</label>
            //       <FormInput
            //         id="feCity"
            //         placeholder="City"
            //         onChange={() => {}}
            //       />
            //     </Col>
            //     <Col md="4" className="form-group">
            //       <label htmlFor="feInputState">State</label>
            //       <FormSelect id="feInputState">
            //         <option>Choose...</option>
            //         <option>...</option>
            //       </FormSelect>
            //     </Col>
            //     <Col md="2" className="form-group">
            //       <label htmlFor="feZipCode">Zip</label>
            //       <FormInput
            //         id="feZipCode"
            //         placeholder="Zip"
            //         onChange={() => {}}
            //       />
            //     </Col>
            //   </Row>
            //      <Row form>
            //     <Col md="12" className="form-group">
            //       <label htmlFor="feDescription">Description</label>
            //       <FormTextarea id="feDescription" rows="5" />
            //     </Col>
            //   </Row> 
            //             <Button theme="accent" onClick={this.onSave}>Update Profile</Button>
            //           </Col>
            //         </Row>
            //       </ListGroupItem>
            //     </ListGroup>
            //   </Card>
        );
    }
}

export default EditProfile;
