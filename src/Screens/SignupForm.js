import React from "react";
import {
  List,
  Grid,
  Form,
  FormInput,
  Alert,
  Container
} from "tabler-react";
import { Button } from "shards-react";
import { Link } from 'react-router-dom';
import { signUpMethod, clearDataMethod } from '../redux/Actions';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/Redirect";
import Loader from '../Loader';
import Toaster from '../redux/Toaster';
import SocialLoginDesign from './SocialLoginDesign';

let that;
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isError: false,
      isCookieNotAccepted: false
    }
    that = this;
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword = () => {
    var p = this.state.password,
      errors = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      // alert(errors.join("\n"));
      return false;
    }
    return true;
  }

  checkFields = () => {
    let isErrorItem = 0;
    if (!this.state.email || !this.validateEmail(this.state.email)) {
      isErrorItem++;
      this.setState({ isError: true });
    }
    if (!this.state.password || !this.validatePassword()) {
      isErrorItem++;
      this.setState({ isError: true });
    }

    if (!isErrorItem)
      return false;
    else
      return true;
  }

  getType = () => {
    if (this.props.selectedTab)
      return 'jobSeeker';
    else
      return 'recruiter';
  }

  handleSubmit = () => {
    this.setState({ isError: false, isCookieNotAccepted: false });
    if (this.checkFields())
      return;
    if (!this.state.isCookieAccepted) {
      this.setState({ isCookieNotAccepted: true })
      return;
    }

    let request = {
      "email": this.state.email,
      "password": this.state.password,
      "userType": this.getType()
    }

    this.props.signUp(request);
  }

  componentDidMount() {
    this.props.clearDataMethod && this.props.clearDataMethod();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.currentTarget.getElementById('signup')) {
      this.handleSubmit();
    }
  }

  render() {
    if (this.props.signupResponse && !this.props.signupResponse.error) {
      return <Redirect to="/verify-account" />
    }
    const isNotMobile = window.screen.width > 500 ? true : false;

    return (
      <div className="p-3" id="signup">
        <Container fluid className="px-0">
          {this.state.isError && <Alert className="alert alert-danger">
            <i className="fa fa-exclamation-triangle mx-2"></i> Email or Password is not valid!
      </Alert>}
          {this.state.isCookieNotAccepted && <Alert className="alert alert-danger">
            <i className="fa fa-exclamation-triangle mx-2"></i> Please accept cookies/policy
      </Alert>}
          {this.props.signupResponse && this.props.signupResponse.error &&
            <Alert className="alert alert-danger">
              <i className="fa fa-exclamation-triangle mx-2"></i> {this.props.signupResponse.message}
            </Alert>}
        </Container>
        <div style={{ fontSize: 14 }}>Account Setup</div>
        <div style={{ fontSize: 12, color: 'grey' }}>Get to manage your jobs and access profile application</div>
        <div className="form-group">
          {isNotMobile && <label>Email</label>}
          <Form.Input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div>
          {isNotMobile && <label>Password</label>}
          <Form.Input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', margin: 15 }}><input type="checkbox" onClick={() => this.setState({ isCookieAccepted: !this.state.isCookieAccepted })} />
          <label style={{ marginLeft: 5 }} for="vehicle1">Terms - * I have read and agree to Ketoadle's <a href="https://www.iubenda.com/terms-and-conditions/85889597" target="_blank">terms of use</a>, <a href="https://www.iubenda.com/privacy-policy/85889597" target="_blank">privacy policy</a> and <a href="https://www.iubenda.com/privacy-policy/85889597/cookie-policy" target="_blank">use of cookies.</a></label></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Button title={!this.state.isCookieAccepted ? "Accept cookies to continue" : ''} disabled={!this.state.isCookieAccepted} type="button" onClick={() => this.handleSubmit()} style={{ backgroundColor: '#00af50', borderColor: '#00af50', width: '100%' }}><i class="fa fa-lock" aria-hidden="true"></i> Create Account</Button>
          {/* disabled={!this.state.isCookieAccepted} */}
        </div>
        {this.props.selectedTab ? <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>Register & Create Your Account Using</div>
          <SocialLoginDesign userType={this.getType()} isCookieAccept={this.state.isCookieAccepted} />
        </div> : ''}
        <Loader loader={this.props.loading} />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  signupResponse: state.reducerMethod.signupResponse,
  error: state.reducerMethod.error,
});

const mapDispatchToProps = {
  signUp: signUpMethod,
  clearDataMethod: clearDataMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
