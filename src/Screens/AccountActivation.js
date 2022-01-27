import React from 'react';
import { connect } from 'react-redux';
import { varifyAccountMethod } from '../redux/Actions';

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

class AccountActivation extends React.Component {

    componentWillMount() {
        const otp = this.props.match && this.props.match.params && this.props.match.params.id ? this.props.match.params.id : null;
        const email=this.props.match && this.props.match.params && this.props.match.params.email ? this.props.match.params.email : null;
        let request = {
            "email": email,
            "activationCode": otp
        }
        this.props.varifyAccount(request);
    }
    render() {
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <div>
                        <Grid.Col md="12">
                            <div style={{ paddingTop: 75 }}>

                                <div className="p-3">
                                    <div>
                                        <Grid.Col style={{ height: '100%' }}>
                                            <Card small className="mb-4">
                                                <div className="border-bottom">
                                                    {this.props.verifyAccountResponse ? (!this.props.verifyAccountResponse.error ? <Alert type="success" icon="check">
                                                        Your account has been activated successfully.
      </Alert> : <Alert type="danger" icon="alert-triangle">
                                                            {this.props.verifyAccountResponse.message}
                                                        </Alert>) : <Alert type="warning" icon="bell">
                                                            Processing...
      </Alert>}
                                                </div>
                                                <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <Link to="/login"><Button type="button" color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} icon="arrow-right">Continue to login</Button></Link>
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
 isMobile={window.screen.width> 500?false:true}/>
                </div>
            );
        }
    }
// }

const mapStateToProps = (state) => ({
    loading: state.reducerMethod.loading,
    verifyAccountResponse: state.reducerMethod.verifyAccountResponse,
    error: state.reducerMethod.error,
    data: state.reducerMethod
});

const mapDispatchToProps = {
    varifyAccount: varifyAccountMethod
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActivation);
