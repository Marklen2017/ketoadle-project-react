import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  Empty,
  Email,
  ProfilePage,
} from "./pages";

import HomePage from "./HomePage.react";
import FormElementsPage from "./FormElementsPage.react";
import PricingCardsPage from "./interface/PricingCardsPage.react";
import CardsDesignPage from "./interface/CardsDesignPage.react";
import StoreCardsPage from "./components/StoreCardsPage.react.js";
import IconPage from "./components/IconPage.react.js";
import ChartsPage from "./interface/ChartsPage.react";
import GalleryPage from "./GalleryPage.react";
import MapCardsPage from "./components/MapCardsPage.react";
import BlogPage from "./components/BlogPage.react";
import VerticalTabsWrapper from './Screens/Login';
import Signup from './Screens/Signup';
import ResetPassword from './Screens/ResetPassword';
import ForgotPassword from './Screens/ForgotPassword';
import VerifyAccount from './Screens/VerifyAccount';
import AccountActivation from './Screens/AccountActivation';
import ReferenceFeedback from './Screens/ReferencePage';
import Jobs from './Screens/Jobs';
import CreateEditJob from './Screens/CreateEditJob';
import SeekerDetail from './Screens/SeekerDetail';
import SeekerCreateEdit from './Screens/SeekerCreateEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "tabler-react/dist/Tabler.css";
import AppliedJobs from './Screens/AppliedJobs';
import JobDetail from './Screens/JobDetail';
import ManageTeam from './Screens/ManageTeam';
import Converter from './Screens/Converter';
import { getAccessToken } from './common-methods';
import LandingPage from './Screens/LandingPage';
import ShortListed from './Screens/ShortListed';
import ThirdPartyShortListed from './Screens/ThirdPartyShortlisted';
import MediaMarketList from './Screens/MediaMarketList';
import CreateEditMediaMarket from './Screens/CreateEditMediaMarket';
import CookiesScreen from './components/CookieModal';
// import { useDispatch, useSelector } from 'react-redux';
// import { getChatUsers } from './redux/Actions';

type Props = {||};

toast.configure();
function App(props: Props): React.Node {
  // https://ketoadle.com/thirdparty/5e3ea90c95628422c19236cb?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTNlYTdiZDk1NjI4NDIyYzE5MjM2YzciLCJpYXQiOjE1ODEzMjM5OTN9.ZzdSriDzGAYlfTILXipI_gfoEYCr5XkPpAgHVi9e4uo&code=fNXt8Zq2e2
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={VerticalTabsWrapper} /> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/info" component={CookiesScreen} />
          <Route exact path="/shortlisted/:id?" component={ShortListed} />
          <Route exact path="/media-market/:id?" component={CreateEditMediaMarket} />
          <Route exact path="/media-market-list" component={MediaMarketList} />
          <Route exact path="/thirdparty/:id" component={ThirdPartyShortListed} />
          <Route exact path="/signup" component={LandingPage} />
          <Route exact path="/reset-password/:code?" component={ResetPassword} />
          <Route exact path="/verify-account" component={VerifyAccount} />
          <Route exact path="/account-activation/:id/:email?" component={AccountActivation} />
          <Route exact path="/recommendation" component={ReferenceFeedback} />
          <Route exact path="/manage-team" component={ManageTeam} />
          <Route exact path="/job-posts" component={Jobs} />
          <Route exact path="/job/:id?" component={CreateEditJob} />
          <Route exact path="/seeker-detail" component={SeekerDetail} />
          <Route exact path="/update-profile/:id?" component={SeekerCreateEdit} />
          <Route exact path="/job-detail/:id?" component={JobDetail} />
          <Route exact path="/applied-jobs" component={AppliedJobs} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/400" component={Error400} />
          <Route exact path="/401" component={Error401} />
          <Route exact path="/403" component={Error403} />
          <Route exact path="/404" component={Error404} />
          <Route exact path="/500" component={Error500} />
          <Route exact path="/503" component={Error503} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/cards" component={CardsDesignPage} />
          <Route exact path="/charts" component={ChartsPage} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/empty-page" component={Empty} />
          <Route exact path="/form-elements" component={FormElementsPage} />
          {/* <Route exact path="/forgot-password" component={ForgotPasswordPage} /> */}
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route exact path="/icons" component={IconPage} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/maps" component={MapCardsPage} />
          <Route exact path="/pricing-cards" component={PricingCardsPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/store" component={StoreCardsPage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
