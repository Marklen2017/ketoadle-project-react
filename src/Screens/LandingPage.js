import React from 'react';
import NewLogin from './NewLogin';
import Features from './Features';
import DrawerMethod from '../DrawerMethod';
// img
import LandingImg from "../assets/images/landing.png"
import Landinglogo from "../assets/images/landinglogo.png"

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        let isSignupState = false;
        if (props.match.path.includes('signup')) {
            isSignupState = true;
        }
        this.state = { selectedTab: null, isModalOpen: false, isSignup: isSignupState, urlValues: props.location }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.node && !this.node.contains(event.target)) {
            this.state.isModalOpen && this.setState({ isModalOpen: false });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match && nextProps.match !== this.props.match) {
            if (nextProps.match.path.includes('signup')) {
                this.setState({ isSignup: true });
            }
            else {
                this.setState({ isSignup: false });
            }
        }
        if (nextProps.location && nextProps.location.hash === "#features") {
            this.setState({ isHash: !this.state.isHash });
        }
    }

    render() {
        const screenWidth = window.screen.width;
        const { isHash } = this.state;
        return (
            <div>
                
                {this.state.isModalOpen && <div className="modalClass" ref={node => this.node = node}><NewLogin isSignup={this.state.isSignup} styles={screenWidth > 500 ? { position: 'fixed', top: 333, width: '25%', right: '11%', zIndex: 1000, backgroundColor: 'white' } : { position: 'fixed', top: 50, width: '90%', right: '5%', zIndex: 1000, backgroundColor: 'white' }} seletedUser={this.state.selectedTab} /></div>}
                {screenWidth > 500 ?
                <div className="test">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0 0'  }}>
                        <img className="landinglogo" src={Landinglogo}  />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                        <img className='imgland' src={LandingImg}/>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#515151', fontSize: 20, fontWeight: 'bold', marginBottom: '465px' }}>
                            <span style={{ margin: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 1, isModalOpen: !this.state.isModalOpen })}>JobSeekers & Freelancers</span> 
                            <span style={{ margin: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 0, isModalOpen: !this.state.isModalOpen })}>Employers & Recruiters</span> 
                            <DrawerMethod isName={false} userType={null} />
                        </div>
                    </div>
                    <div style={{}}>
                </div> 
                    
                        {/* <div style={{ zIndex: 100, position: 'fixed', height: 64, backgroundColor: "#000", top: 0, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div onClick={() => this.setState({ isFeaturesOpen: !this.state.isFeaturesOpen })}>
                                <a style={{ textDecoration: 'none', color: 'white' }}  href="/" disabled={isHash?false:true}>
                                    <img
                                        className="d-inline-block align-top mr-1"
                                        style={{ width: 100 }}
                                        src={require("../assets/images/Ketoadle_logo_white.png")}
                                        alt="Ketoadle"
                                    />
                                </a>
                            </div> */}
                            
                            {/* <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: 18 }}><span style={{ margin: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 1, isModalOpen: !this.state.isModalOpen })}>Job Seekers</span> | <span style={{ margin: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 0, isModalOpen: !this.state.isModalOpen })}>Employers, Recruiters</span> | <DrawerMethod isName={false} userType={null} /></div> */}
                        {/* </div> */}
                    

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* <div style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Your Social Recruitment Platform For The Future</div> */}
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 16, fontWeight: 'bold', color: '#495057' }}>
                            T&C’s, Cookies, Privacy
                                {/* <div style={{ backgroundColor: '#00af50', padding: 5, textAlign: 'center', borderRadius: 5, fontSize: 24 }} onClick={() => this.setState({ isFeaturesOpen: !this.state.isFeaturesOpen })}><a style={{ textDecoration: 'none', color: 'white' }} href={isHash ? "/" : "#features"}>Features</a></div> */}
                                {/* <Button style={{ backgroundColor:'#00af50',borderColor:'#00af50', fontSize: 16 }} onClick={() => this.setState({ isFeaturesOpen: !this.state.isFeaturesOpen })}><a style={{ textDecoration: 'none', color: 'white' }} href={isHash ? "/" : "#features"}>Features</a></Button> */}
                            </div>
                        </div>
                        {/* <div style={{ zIndex: 100, position: 'fixed', height: 50, backgroundColor: "#000", bottom: 0, width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', color: '#fff' }}>Copyright © 2020 Ketoadle</div> */}
                    </div> :
                    <div>
                        <div style={{ zIndex: 100, position: 'fixed', height: 50, backgroundColor: "#000", top: 0, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div>
                                <img
                                    className="d-inline-block align-top mr-1"
                                    style={{ width: 100 }}
                                    src={require("../assets/images/Ketoadle_logo_white.png")}
                                    alt="Ketoadle"
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: 18 }}><DrawerMethod isName={false} userType={null} /></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 65, marginBottom: 65, alignItems: 'center', height: '100vh' }}>
                            <div style={{ fontSize: 24, fontWeight: 'bold', borderBottom: '1px solid #e2e2e2', width: '100%', textAlign: 'center' }}><span style={{ cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 1, isModalOpen: !this.state.isModalOpen })}>Job Seekers</span></div>
                            <div style={{ fontSize: 24, fontWeight: 'bold', borderBottom: '1px solid #e2e2e2', width: '100%', textAlign: 'center' }}><span style={{ margin: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.setState({ selectedTab: 0, isModalOpen: !this.state.isModalOpen })}>Employers, Recruiters</span></div>
                            <div>
                                <img
                                    className="d-inline-block align-top mr-1"
                                    src={require("../assets/images/landing.png")}
                                    height={200}
                                    alt="Ketoadle"
                                />
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', paddingRight: 20, paddingLeft: 20 }}>Your Social Recruitment Platform For The Future</div>
                            <div style={{ backgroundColor: '#fff', padding: 20, width: '100%', textAlign: 'center' }}>
                                <img
                                    className="d-inline-block align-top mr-1"
                                    src={require("../assets/images/Mobile_bottom_image.png")}
                                    height={100}
                                    alt="Ketoadle"
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 24, fontWeight: 'bold' }}>
                            T&C’s, Cookies, Privacy
                                <div style={{ backgroundColor: '#00af50', padding: 5, textAlign: 'center', borderRadius: 5, fontSize: 24 }} onClick={() => this.setState({ isFeaturesOpen: !this.state.isFeaturesOpen })}><a style={{ textDecoration: 'none', color: 'white' }} href={isHash ? "/" : "#features"}>Features</a></div>
                                {/* <Button style={{ backgroundColor:'#00af50',borderColor:'#00af50', fontSize: 18 }} onClick={() => this.setState({ isFeaturesOpen: !this.state.isFeaturesOpen })}><a style={{ textDecoration: 'none', color: 'white' }} href={isHash ? "/" : "#features"}>Features</a></Button> */}
                            </div>
                        </div>
                        {/* <div style={{ zIndex: 100, position: 'fixed', height: 50, backgroundColor: "#000", bottom: 0, width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', color: '#fff' }}>Copyright © 2020 Ketoadle</div> */}
                    </div>}
                <div id="features" style={screenWidth > 500 ? { width: '75%', margin: '0 auto' } : { width: '90%', margin: '0 auto' }}>{this.state.isFeaturesOpen && <Features />}</div>
            </div>
        );
    }
}