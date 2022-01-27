import React from "react";
import {
  List,
  Grid,
  Form,
  Alert,
  Container
} from "tabler-react";
import { Link } from 'react-router-dom';
import { loginMethod, clearDataMethod, logOutMethod } from '../redux/Actions';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/Redirect";
import Loader from '../Loader';
import Toaster from '../redux/Toaster';
import { getAccessToken } from '../common-methods';
import SocialLoginDesign from './SocialLoginDesign';
import { Button } from "shards-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  getType = () => {
    if (this.props.selectedTab)
      return 'jobSeeker';
    else
      return 'recruiter';
  }

  componentDidMount() {
    this.props.clearData && this.props.clearData();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.currentTarget.getElementById('login')) {
      if (this.state.email && this.state.password)
        this.onHandleSubmit();
      else
        this.setState({isError:true});
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loginResponse!==this.props.loginResponse && !nextProps.loginResponse.error){
      this.setState({email:null,password:null});
    }
  }

  onHandleSubmit = () => {
    let request = {
      "email": this.state.email,
      "password": this.state.password,
      "userType": this.getType()
    }
    this.props.login(request);
  }

  render() {
    const { loginResponse } = this.props;
    const isNotMobile = window.screen.width>500?true:false;
    if (getAccessToken() && window.location.pathname && (window.location.pathname === '/' || window.location.pathname === '/login')) {
      return <Redirect to="/home" />
    }
    return (
      <div style={{ backgroundColor: 'white', padding: 20 }} id="login">
        <Container fluid className="px-0">
          {loginResponse && loginResponse.error &&
            <Alert className="alert alert-danger">
              <i className="fa fa-exclamation-triangle mx-2"></i> {loginResponse && loginResponse.message}
            </Alert>}
            {this.state.isError && <Alert className="alert alert-danger">
            <i className="fa fa-exclamation-triangle mx-2"></i> Email and Password is required!
      </Alert>}
        </Container>
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
        <Button type="button" onClick={() => this.onHandleSubmit()} style={{ backgroundColor: '#00af50', borderColor: '#00af50', width: '100%', marginTop: 20, marginBottom: 20 }}>Login</Button>
        {this.props.selectedTab ? <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>OR</div>
          <SocialLoginDesign userType={this.getType()} isCookieAccept={true}/>
        </div> : ''}
        <Grid.Col md="12" className="mt-2 pl-0">
          <Link to="/forgot-password" style={{ color: 'grey', fontSize: 14, textDecoration: 'none' }}>
            Forgotten Details?
                </Link>
        </Grid.Col>
        <Loader loader={this.props.loading} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  loading: state.reducerMethod.loading,
  loginResponse: state.reducerMethod.loginResponse,
  error: state.reducerMethod.error,
  data: state.reducerMethod
});

const mapDispatchToProps = {
  login: loginMethod,
  clearData: clearDataMethod,
  logOutMethod: logOutMethod
};

const LoginFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginFormWrapper;
