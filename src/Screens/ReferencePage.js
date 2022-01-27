import React from 'react';
import { connect } from 'react-redux';
import { referenceFeedbackMethod } from '../redux/Actions';

import {
    Grid,
    Card,
    List,
    Alert,
    Button
} from "tabler-react";
import Loader from '../Loader';
import { Redirect } from 'react-router-dom';
// import Unauthorised from '../components/Unauthorised';
import Footer from '../Footer';

class ReferenceFeedback extends React.Component {
    state = { email: null, error: false, user: null };

    componentWillMount() {
        let recommendedBy = null;
        let user = null;
        if (window.location.search) {
            var parameters = new URLSearchParams(window.location.search);
            recommendedBy = parameters.get('recommendedBy');
            user = parameters.get('user');
        }
        this.setState({ email: recommendedBy, user });
    }


    submitResponse = () => {
        this.setState({ error: false });
        if (!this.state.feedback) {
            this.setState({ error: true });
            return null;
        }
        let request = {
            "userId": this.state.user,
            "email": this.state.email,
            "message": this.state.feedback
        }
        this.props.referenceFeedback(request);
    }

    render() {
        const { referenceFeedbackResponse } = this.props;
        const { email, user, feedback } = this.state;
        let userToken = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).token;
        // if (!userToken)
        //     return <Redirect to="/401" />
        // else {
            if (referenceFeedbackResponse && !referenceFeedbackResponse.error)
                return <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ height: '100vh' }}>
                        <div style={{ textAlign: '-webkit-center' }}>
                            <div style={{ paddingTop: 75, width: '70%' }}>
                                <div className="p-3">
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
                                                <div className="border-bottom">
                                                    {referenceFeedbackResponse && referenceFeedbackResponse.message && <Alert type="success" icon="check">
                                                        {referenceFeedbackResponse.message}
                                                    </Alert>}
                                                </div>
                                            </Card>
                                        </Grid.Col>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer noHeader={true} 
 isMobile={window.screen.width> 500?false:true}/>
                </div>
            else if (!email || !user)
                return <Redirect to="/" />
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ height: '100vh', backgroundColor: '#fff' }}>
                        <div style={{ textAlign: '-webkit-center' }}>
                            <div style={{ paddingTop: 75, width: '50%' }}>
                                <div className="p-3">
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
                                                <div className="border-bottom">
                                                    {referenceFeedbackResponse && referenceFeedbackResponse.error && <Alert type="danger" icon="alert-triangle">
                                                        {referenceFeedbackResponse.message}
                                                    </Alert>}
                                                    {this.state.error &&
                                                        <Alert type="warning" icon="bell">
                                                            Feedback is required
      </Alert>}
                                                    <Grid.Col md="12" className="form-group">
                                                        <label>Welcome {email}, Please Submit Your Response</label>
                                                        <textarea type="text" rows={5} value={feedback} className="form-control" onChange={(e) => this.setState({ feedback: e.target.value })} />
                                                    </Grid.Col>
                                                </div>
                                                <div style={{ display: 'flex', marginBottom: 20, marginTop: 20 }}>
                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <Button icon="upload" type="button" onClick={() => this.submitResponse()} color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}}>Submit</Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Grid.Col>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    referenceFeedbackResponse: state.reducerMethod.referenceFeedbackResponse,
    error: state.reducerMethod.error
});

const mapDispatchToProps = {
    referenceFeedback: referenceFeedbackMethod
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceFeedback);
