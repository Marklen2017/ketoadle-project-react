import React from 'react';
import { connect } from 'react-redux';
import { forgotPasswordMethod } from '../redux/Actions';

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

class ForgotPassword extends React.Component {

    state = { email: '', error: false };

    sendCode = () => {
        this.setState({ error: false });
        if (!this.state.email) {
            this.setState({ error: true });
            return null;
        }
        let request = {
            "email": this.state.email
        }
        localStorage.setItem('email', this.state.email);
        this.props.forgotPassword(request);
    }

    render() {
        const { forgetPasswordResponse } = this.props;

        if (forgetPasswordResponse && !forgetPasswordResponse.error)
            return <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ height: '100vh' }}>
                    <Grid.Col md="12" style={{ textAlign: '-webkit-center' }}>
                        <div style={{ paddingTop: 75, display: 'flex', justifyContent: 'center' }}>
                            <div className="p-3" style={{ width: '60%' }}>
                                <img
                                    className="d-inline-block align-top mr-1"
                                    style={{ maxWidth: "25px" }}
                                    src={require("../assets/images/logo.png")}
                                    alt="Ketoadle"
                                />
                                <label style={{ color: '#00af50', fontSize: 17, fontWeight: 'bold' }}>Ketoadle</label>
                                <div>
                                    <Grid.Col style={{ height: '100%' }}>
                                        {forgetPasswordResponse && forgetPasswordResponse.message && <Alert type="success" icon="check">
                                            {forgetPasswordResponse.message}
                                        </Alert>}
                                    </Grid.Col>
                                    <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                        <div style={{ width: '100%', textAlign: 'center' }}>
                                            <Link to="/login">  <Button type="button" color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} icon="arrow-right">Continue to login</Button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid.Col>
                </div>
                <Footer noHeader={true} 
 isMobile={window.screen.width> 500?false:true}/>
            </div>

        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ height: '100vh', backgroundColor: '#fff' }}>
                    <Grid.Col md="12" style={{ textAlign: '-webkit-center' }}>
                        <div style={{ paddingTop: 75, display: 'flex', justifyContent: 'center' }}>
                            <div className="p-3" style={{ width: '60%' }}>
                                <img
                                    className="d-inline-block align-top mr-1"
                                    style={{ maxWidth: "25px" }}
                                    src={require("../assets/images/logo.png")}
                                    alt="Ketoadle"
                                />
                                <label style={{ color: '#00af50', fontSize: 17, fontWeight: 'bold' }}>Ketoadle</label>
                                <div>
                                    {forgetPasswordResponse && forgetPasswordResponse.error && <Alert type="danger" icon="alert-triangle">
                                        {forgetPasswordResponse.message}
                                    </Alert>}
                                    {this.state.error && <Alert type="warning" icon="bell">Email is required</Alert>}
                                    <Grid.Col style={{ height: '100%' }}>
                                        <Card small className="mb-4">
                                            <Card.Header className="border-bottom">
                                                <Grid.Col md="12" className="form-group">
                                                    <label>Email</label>
                                                    <Form.Input
                                                        type="email"
                                                        placeholder="Enter your registered email"
                                                        value={this.state.email}
                                                        onChange={(e) => this.setState({ email: e.target.value })}
                                                    />
                                                </Grid.Col>
                                            </Card.Header>
                                            <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                                <div style={{ width: '100%', textAlign: 'center' }}>
                                                    <Button loading={this.props.loading} type="button" onClick={() => this.sendCode()} color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}>Send Code</Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Grid.Col>
                                </div>
                            </div>
                        </div>
                    </Grid.Col>
                </div>
                {/* <Loader loader={this.props.loading} /> */}
                <Footer noHeader={true} 
 isMobile={window.screen.width> 500?false:true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    forgetPasswordResponse: state.reducerMethod.forgetPasswordResponse,
    error: state.reducerMethod.error
});

const mapDispatchToProps = {
    forgotPassword: forgotPasswordMethod
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
