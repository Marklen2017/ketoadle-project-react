// @flow

import * as React from "react";

import {
    Page,
    Grid,
    Card,
    Form,
    Avatar,
    Table
} from "tabler-react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTeamData, addEditTeamMember, deleteTeamMember, disableTeamMember, makeSuper } from '../redux/Actions';
import Loader from '../Loader';
import { getUserData, getAccessToken } from '../common-methods';
import DropzoneContainer from '../components/DropzoneContainer';
import Icon from '@material-ui/core/Icon';
import { authCheckToaster } from '../redux/AuthCheckToaster';
import EditTeamModal from './EditTeamModal';
import { Button } from "shards-react";

import SiteWrapper from "../SiteWrapper.react";

class ManageTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memberdata: [], isAddMember: false, files: [] }
    }

    componentWillMount() {
        this.props.getTeamData();
    }

    onShare = (requestData) => {
        this.props.onShare(requestData);
    }

    resetState = () => {
        this.setState({ memberdata: [], isAddMember: false, files: [], name: '', email: '', contact: '', isModal: false }, () => this.props.getTeamData());
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.addEditTeamResponse && nextProps.addEditTeamResponse !== this.props.addEditTeamResponse) {
            this.resetState();
        }
        if (nextProps.deleteTeamResponse && nextProps.deleteTeamResponse !== this.props.deleteTeamResponse) {
            this.resetState();
        }
        if (nextProps.disableTeamMemberResponse && nextProps.disableTeamMemberResponse !== this.props.disableTeamMemberResponse) {
            this.resetState();
        }
        if (nextProps.makeSuperResponse && nextProps.makeSuperResponse !== this.props.makeSuperResponse) {
            this.resetState();
        }
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

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.currentTarget.getElementById('manageTeam')) {
            if (this.state.isModal && this.state.editData) {
                this.onEditSave(this.state.editData);
            } else if (this.state.isAddMember) {
                this.onSave();
            }
        }
    }

    onSave = () => {
        const { name, contact, email, files } = this.state;
        let request = {
            "name": name,
            "image": files && files.length ? files[0].preview : '',
            "contact": contact,
            "email": email,

        }
        this.props.addEditTeamMember(request);
    }

    viewJobs = (id) => {
        debugger
    }

    onEditClick = (data) => {
        this.setState({ isModal: true, data: data });
    }

    onClose = () => {
        this.setState({ isModal: false });
    }

    onEditSave = (data) => {
        let request = {
            "name": data.name,
            "image": data.files && data.files.length ? data.files[0].preview : '',
            "contact": data.contact
        }
        if (this.state.data && this.state.data._id)
            this.props.addEditTeamMember(request, this.state.data._id);
    }

    makeSuperUser = (id, isSuper) => {
        if (isSuper) {
            this.props.makeSuper({ "teamPermission": ['add'] }, id, isSuper);
        }
        else {
            this.props.makeSuper({ "teamPermission": ['add', 'edit', 'delete'] }, id);
        }
    }

    render() {
        let userToken = getAccessToken();
        const screenSize = window.screen.width;
        if (!userToken)
            return <Redirect to="/" />
        else {
            const { teamData } = this.props;
            const userData = teamData && teamData.admin ? teamData.admin : getUserData();
            return (
                <SiteWrapper>
                    {this.state.isModal && <EditTeamModal onChnageData={(data) => this.setState({ editData: data })} data={this.state.data} onClose={this.onClose} isModal={this.state.isModal} onEditSave={this.onEditSave} />}
                    <Page.Content>
                        <div id="manageTeam">
                            <Grid.Row cards={true}>
                                <Card>
                                    <Card.Body>
                                        {
                                            screenSize > 500 ?
                                                <Table>
                                                    <Table.Body><Table.Row>
                                                        <Table.Col>
                                                            <div style={{width:50}}>
                                                                <Button theme="accent" style={{ backgroundColor: '#00af50', borderColor: '#00af50', color: 'white' }} size="sm">
                                                                    Admin
        </Button>
                                                            </div>
                                                        </Table.Col>
                                                        <Table.Col>
                                                            <div style={{ display: 'flex' }}>
                                                                <Avatar size={screenSize > 500 ? "xxl" : "xl"} imageURL={userData && userData.image ? userData.image : require('../assets/user.png')} />
                                                                {/* <img width="20%" height="70%" src={userData && userData.image ? userData.image : "demo/faces/female/user.png"} alt="User Image" /> */}
                                                                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                                                                    <div><span style={{ color: '#00af50' }}>Name:</span> {userData && userData.name ? userData.name : '-'}</div>
                                                                    <div><span style={{ color: '#00af50' }}>Email:</span> {userData && userData.email ? userData.email : '-'}</div>
                                                                    <div><span style={{ color: '#00af50' }}>Contact:</span> {userData && userData.contact ? userData.contact : '-'}</div>
                                                                </div>
                                                            </div>
                                                        </Table.Col>
                                                        <Table.Col>
                                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignSelf: 'flex-end' }}>
                                                                <Button theme="accent" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} size="sm" onClick={() => this.onEditClick(userData)}>
                                                                    Edit
        </Button>
                                                            </div>
                                                        </Table.Col>
                                                    </Table.Row>
                                                    </Table.Body>
                                                </Table> :
                                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cccccc', padding: '20px 0 20px 0', flexWrap: 'wrap' }}>
                                                    <div><Button theme="accent" style={{ backgroundColor: '#00af50', borderColor: '#00af50', color: 'white' }} size="sm">
                                                        Admin
        </Button></div>
                                                    <div style={{ display: 'flex' }}>
                                                        <Avatar size={screenSize > 500 ? "xxl" : "xl"} imageURL={userData && userData.image ? userData.image : require('../assets/user.png')} />
                                                        {/* <img width="20%" height="70%" src={userData && userData.image ? userData.image : "demo/faces/female/user.png"} alt="User Image" /> */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                                                            <div><span style={{ color: '#00af50' }}>Name:</span> {userData && userData.name ? userData.name : '-'}</div>
                                                            <div><span style={{ color: '#00af50' }}>Email:</span> {userData && userData.email ? userData.email : '-'}</div>
                                                            <div><span style={{ color: '#00af50' }}>Contact:</span> {userData && userData.contact ? userData.contact : '-'}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignSelf: 'flex-end' }}>
                                                        <Button theme="accent" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} size="sm" onClick={() => this.onEditClick(userData)}>
                                                            Edit
        </Button>
                                                    </div>
                                                </div>}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cccccc', padding: '20px 0 20px 0', paddingLeft:'0.75rem', paddingRight:'0.75rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                Create and add a new team member
                                        </div>
                                            <div style={{ alignSelf: 'flex-end' }}><Button theme="accent" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} size="sm" onClick={() => this.setState({ isAddMember: true })}>
                                                Add member
        </Button></div>
                                        </div>
                                        {this.state.isAddMember && <div style={{ borderBottom: '1px solid #cccccc', padding: '20px 0 20px 0',paddingLeft:'0.75rem', paddingRight:'0.75rem' }}>
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
                                                            onChange={(e) => this.onChangeMethod('email', e)} />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Contact</Form.Label>
                                                        <Form.Input id="contact"
                                                            placeholder="Contact"
                                                            value={this.state.contact}
                                                            onChange={(e) => this.onChangeMethod('contact', e)} />
                                                    </Form.Group>
                                                    <div className="mt-4" align="right">
                                                        <Button color="danger" style={{ backgroundColor: '#cd201f', borderColor: '#cd201f', color: 'white' }} onClick={() => this.setState({ isAddMember: false })}>
                                                            Cancel
      </Button>
                                                        <Button style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} onClick={this.onSave}>
                                                            Add
      </Button>
                                                    </div>
                                                </Grid.Col>
                                            </Grid.Row>
                                        </div>
                                        }
                                        {
                                            screenSize > 500 ?
                                                <Table>
                                                    <Table.Body>
                                                        {teamData && teamData.data && teamData.data.length ? teamData.data.map((data, index) => {
                                                            return <Table.Row>
                                                                <Table.Col>
                                                                    <div style={{ width: 80 }}>
                                                                        <Button theme="accent" color={data.teamPermission.indexOf("delete") !== -1 ? "danger" : "success"} style={{ backgroundColor: '#00af50', borderColor: '#00af50', color: 'white' }} size="sm" onClick={() => this.makeSuperUser(data._id, data.teamPermission.indexOf("delete") !== -1 ? true : false)}>
                                                                            {data.teamPermission.indexOf("delete") !== -1 ? "Revoke Editor" : 'Make Editor'}
                                                                        </Button>
                                                                    </div>
                                                                </Table.Col>
                                                                <Table.Col>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Avatar size={"xl"} imageURL={data.image ? data.image : require('../assets/user.png')} />
                                                                        {/* <img width="25%" height="100%" src={data.image ? data.image : "demo/faces/female/user.png"} alt="User Image" /> */}
                                                                        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                                                                            <div><span style={{ color: '#00af50' }}>Name:</span> {data.name}</div>
                                                                            <div><span style={{ color: '#00af50' }}>Email:</span> {data.email}</div>
                                                                            <div><span style={{ color: '#00af50' }}>Contact:</span> {data.contact}</div>
                                                                        </div>
                                                                    </div>
                                                                </Table.Col>
                                                                <Table.Col>
                                                                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: screenSize > 500 ? 0 : 30 }}>
                                                                        <div style={{ display: 'flex', flexDirection: screenSize > 500 ? 'column' : 'row' }}>
                                                                            <div style={{ marginBottom: 10 }}>
                                                                                <Button block theme="accent" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} size="sm" onClick={() => this.onEditClick(data)} disabled={data.status === 'active' ? false : true}>
                                                                                    Edit User
</Button>
                                                                            </div>
                                                                            <div style={screenSize > 500 ? {} : { marginLeft: 10 }}>
                                                                                <Button block theme="accent" color="danger" size="sm" style={{ backgroundColor: '#cd201f', borderColor: '#cd201f', color: '#fff' }} onClick={() => this.props.disableTeamMember(data._id)}>
                                                                                    {data.status === 'active' ? 'Disable Account' : 'Activate Account'}
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                        <Icon style={screenSize > 500 ? { marginLeft: 30, cursor: 'pointer' } : { marginLeft: 30, cursor: 'pointer', alignSelf: 'baseline' }} title="Delete Member" onClick={() => this.props.deleteTeamMember(data._id)}>delete_forever</Icon>
                                                                    </div>
                                                                </Table.Col>
                                                            </Table.Row>
                                                        })
                                                            : <div style={{ padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB' }}>No member found</div>}
                                                    </Table.Body>
                                                </Table> :
                                                teamData && teamData.data && teamData.data.length ? teamData.data.map((data, index) => {
                                                    return <div key={1} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cccccc', padding: '20px 0 20px 0', alignItems: 'center', flexWrap: 'wrap' }}>
                                                        <div style={{ width: 80 }}>
                                                            <Button theme="accent" color={data.teamPermission.indexOf("delete") !== -1 ? "danger" : "success"} style={{ backgroundColor: '#00af50', borderColor: '#00af50', color: 'white' }} size="sm" onClick={() => this.makeSuperUser(data._id, data.teamPermission.indexOf("delete") !== -1 ? true : false)}>
                                                                {data.teamPermission.indexOf("delete") !== -1 ? "Revoke Editor" : 'Make Editor'}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <Avatar size={"xl"} imageURL={data.image ? data.image : require('../assets/user.png')} />
                                                            {/* <img width="25%" height="100%" src={data.image ? data.image : "demo/faces/female/user.png"} alt="User Image" /> */}
                                                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10, color: '#00af50' }}>
                                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 150, whiteSpace: 'nowrap' }}>Name: {data.name}</div>
                                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 150, whiteSpace: 'nowrap' }}>Email: {data.email}</div>
                                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 150, whiteSpace: 'nowrap' }}>Contact: {data.contact}</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', marginTop: screenSize > 500 ? 0 : 30 }}>
                                                            {/* <div style={{ textAlign: 'center',marginRight:20 }} title="View Memeber Current Job"> */}
                                                            {/* <Icon style={{ cursor: 'pointer', marginRight: 20 }} title="View Memeber Current Job" onClick={() => this.viewJobs(data.id)}>visibility</Icon> */}
                                                            {/* <div style={{ width: '84%' }}>View Memeber Current Job</div> */}
                                                            {/* </div> */}
                                                            <div style={{ display: 'flex', flexDirection: screenSize > 500 ? 'column' : 'row' }}>
                                                                <div style={{ marginBottom: 10 }}>
                                                                    <Button block theme="accent" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2', color: 'white' }} size="sm" onClick={() => this.onEditClick(data)} disabled={data.status === 'active' ? false : true}>
                                                                        Edit User
        </Button>
                                                                </div>
                                                                <div style={screenSize > 500 ? {} : { marginLeft: 10 }}>
                                                                    <Button block theme="accent" color="danger" size="sm" style={{ backgroundColor: '#cd201f', borderColor: '#cd201f', color: '#fff' }} onClick={() => this.props.disableTeamMember(data._id)}>
                                                                        {data.status === 'active' ? 'Disable Account' : 'Activate Account'}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <Icon style={screenSize > 500 ? { marginLeft: 30, cursor: 'pointer' } : { marginLeft: 30, cursor: 'pointer', alignSelf: 'baseline' }} title="Delete Member" onClick={() => this.props.deleteTeamMember(data._id)}>delete_forever</Icon>
                                                        </div>
                                                    </div>
                                                })
                                                    : <div style={{ padding: 10, textAlign: 'center', backgroundColor: '#F5F7FB' }}>No member found</div>}
                                    </Card.Body>
                                </Card>
                            </Grid.Row>
                            <Loader loader={this.props.loading} />
                        </div>
                    </Page.Content >
                </SiteWrapper >
            );
        }
    }
}


const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    error: state.reducerMethod.error,
    teamData: state.reducerMethod.teamData,
    addEditTeamResponse: state.reducerMethod.addEditTeamResponse,
    deleteTeamResponse: state.reducerMethod.deleteTeamResponse,
    disableTeamMemberResponse: state.reducerMethod.disableTeamMemberResponse,
    makeSuperResponse: state.reducerMethod.makeSuperResponse
});

const mapDispatchToProps = {
    getTeamData: getTeamData,
    addEditTeamMember: addEditTeamMember,
    deleteTeamMember: deleteTeamMember,
    disableTeamMember: disableTeamMember,
    makeSuper: makeSuper
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);
