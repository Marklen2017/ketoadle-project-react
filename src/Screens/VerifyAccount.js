import React from 'react';
import { connect } from 'react-redux';
import { resendLinkMethod, clearDataMethod } from '../redux/Actions';

import {
    Grid,
    Card,
    List,
    Alert,
    Button
} from "tabler-react";
import { Link, Redirect } from 'react-router-dom';
import Loader from '../Loader';
import Footer from '../Footer';

class VerifyAccount extends React.Component {

    resendLink = () => {
        let request = {
            "email": localStorage.getItem('email')
        }
        this.props.resendLink(request);
    }

    componentWillMount() {
        this.props.clearDataMethod();
    }

    render() {
        let userToken = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).token;
        // if (!userToken)
        //     return <Redirect to="/401" />
        // else {
        return (
            <div style={{ width: '100%', textAlign: 'center' }}>
                <div>
                    <Grid.Col md="12">
                        <div style={{ paddingTop: 75 }}>

                            <div>
                                <div>
                                    <Grid.Col style={{ height: '100%' }}>
                                        <Card small className="mb-4">
                                            <div className="border-bottom">
                                                {this.props.loading ? <Alert type="warning" icon="bell">
                                                    Processing...
      </Alert> : (this.props.resendLinkResponse && this.props.resendLinkResponse.error ? <Alert type="danger" icon="alert-triangle">
                                                        {this.props.resendLinkResponse.message}
                                                    </Alert> : <Alert type="success" icon="check">
                                                            {`An email verification code has been ${this.props.resendLinkResponse && !this.props.resendLinkResponse.error ? 'Re-' : ''}sent to your email ${localStorage.getItem('email')}. Please check and verify your email to continue with login.`}
                                                        </Alert>)}
                                            </div>
                                            <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                                <div style={{ width: '45%', textAlign: 'center' }}>
                                                    <Button loading={this.props.loading} type="button" onClick={() => this.resendLink()} color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} icon="book">Resend</Button>
                                                </div>
                                                <div style={{ width: '45%', textAlign: 'center' }}>
                                                    <Link to="/login"><Button loading={this.props.loading} type="button" color="primary" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }} icon="arrow-right">Continue to login</Button></Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </Grid.Col>
                                </div>
                            </div>
                        </div>
                    </Grid.Col>
                </div>
                <Loader loader={this.props.loading} />
                <Footer noHeader={true}
                    isMobile={window.screen.width > 500 ? false : true} />
            </div>
        );
    }
}
// }

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    verifyAccountResponse: state.reducerMethod.verifyAccountResponse,
    signupResponse: state.reducerMethod.signupResponse,
    error: state.reducerMethod.error,
    resendLinkResponse: state.reducerMethod.resendLinkResponse
});

const mapDispatchToProps = {
    resendLink: resendLinkMethod,
    clearDataMethod: clearDataMethod
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyAccount);
