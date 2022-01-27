import React from 'react';
import { connect } from 'react-redux';
import { resetPasswordMethod } from '../redux/Actions';

import {
   Grid,
    Card,
    List,
    Alert,
    Button,
    Form
} from "tabler-react";
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Redirect from 'react-router-dom/Redirect';
import Footer from '../Footer';

class ResetPassword extends React.Component {

    state = { email: '', password: '', password2: '', passwordMatchError: false, passwordError: false, resetCode: '' };

    componentWillMount() {
        let otp = window.location.pathname
        otp = otp && otp.split('/');
        otp = otp.length && otp[2];
        this.setState({ resetCode: otp, email: localStorage.getItem('email') });
    }

    setNewPassword = () => {
        this.setState({ passwordMatchError: false, passwordError: false, codeError: false });
        if (!this.state.password) {
            this.setState({ passwordError: true });
            return null;
        }
        if (!this.state.password2) {
            this.setState({ passwordError: true });
            return null;
        }
        if (this.state.password !== this.state.password2) {
            this.setState({ passwordMatchError: true });
            return null;
        }
        if (!this.state.resetCode) {
            this.setState({ codeError: true });
            return null;
        }
        let request = {
            "email": this.state.email,
            "resetCode": this.state.resetCode,
            "password": this.state.password
        }
        this.props.resetPassword(request);
    }

    render() {
        const { resetPasswordResponse } = this.props;
        
        if (resetPasswordResponse && !resetPasswordResponse.error)
            return <Redirect to="/login" />

        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div>
                    <Grid.Col md="12" style={{ textAlign: '-webkit-center' }}>
                        <div style={{ margin:'0 auto', width: '50%' }}>

                            <List.Group flush>
                                <List.GroupItem className="p-3">
                                    <img
                                        className="d-inline-block align-top mr-1"
                                        style={{ maxWidth: "25px" }}
                                        src={require("../assets/images/logo.png")}
                                        alt="Ketoadle"
                                    />
                                    <label style={{ color: '#00af50', fontSize: 17, fontWeight: 'bold' }}>Ketoadle</label>
                                    <div>
                                        <Grid.Col style={{ height: '100%' }}>
                                            <Card small className="mb-4">
                                                <div className="border-bottom" style={{display:'flex',flexDirection:'column'}}>
                                                    {this.props.resetPasswordResponse && this.props.resetPasswordResponse.error && <Alert className="alert alert-danger">
                                                        <i class="fas fa-exclamation-triangle"></i> {this.props.resetPasswordResponse.message}
                                                    </Alert>}
                                                    {this.state.passwordError && <Alert className="alert alert-warning">
                                                        <i class="fas fa-exclamation-triangle"></i>
                                                        Password is required
      </Alert>}
                                                    {this.state.passwordMatchError && <Alert className="alert alert-warning">
                                                        <i class="fas fa-exclamation-triangle"></i>
                                                        Password should match
      </Alert>}
                                                    {this.state.codeError && <Alert className="alert alert-warning">
                                                        <i class="fas fa-exclamation-triangle"></i>
                                                        Code is required
      </Alert>}
                                                    <Grid.Col md="12" className="form-group">
                                                        <label>Email</label>
                                                        <Form.Input
                                                            type="email"
                                                            placeholder="Enter your registered email"
                                                            value={this.state.email}
                                                            disabled={true}
                                                            onChange={(e) => this.setState({ email: e.target.value })}
                                                        />
                                                    </Grid.Col>
                                                    <Grid.Col md="12" className="form-group">
                                                        <label>Reset Code</label>
                                                        <Form.Input
                                                            type="text"
                                                            placeholder="Reser"
                                                            value={this.state.resetCode}
                                                            disabled={true}
                                                            onChange={(e) => this.setState({ resetCode: e.target.value })}
                                                        />
                                                    </Grid.Col>
                                                    <Grid.Col md="12" className="form-group">
                                                        <label>Password</label>
                                                        <Form.Input
                                                            type="password"
                                                            placeholder="Password"
                                                            value={this.state.password}
                                                            onChange={(e) => this.setState({ password: e.target.value })}
                                                        />
                                                    </Grid.Col>
                                                    <Grid.Col md="12" className="form-group">
                                                        <label>Confirm Password</label>
                                                        <Form.Input
                                                            type="password"
                                                            placeholder="Confirm password"
                                                            value={this.state.password2}
                                                            onChange={(e) => this.setState({ password2: e.target.value })}
                                                        />
                                                    </Grid.Col>
                                                </div>
                                                <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <Button type="button" onClick={() => this.setNewPassword()} color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}>Reset</Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Grid.Col>
                                    </div>
                                </List.GroupItem>
                            </List.Group>
                        </div>
                    </Grid.Col>
                </div>
                <Loader loader={this.props.loading} />
                <Footer noHeader={true} 
 isMobile={window.screen.width> 500?false:true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    resetPasswordResponse: state.reducerMethod.resetPasswordResponse,
    error: state.reducerMethod.error
});

const mapDispatchToProps = {
    resetPassword: resetPasswordMethod
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
