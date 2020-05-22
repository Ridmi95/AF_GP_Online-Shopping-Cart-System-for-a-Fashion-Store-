import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBFormInline,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBIcon
} from 'mdbreact';
import './css/CallToActionIntro.css';
import Navbar from './Navbar';
import UserSignIn from "./UserLogin";
import UserSignUp from "./UserSignUp";
import Landing from "./UserLanding";
import UserProfile from "./UserProfile";

class MainComponent extends React.Component {
  render() {
    return (
        <Router>

          <Route exact path='/' component={Landing}/>
          <main className="container-fluid">
            <Switch>
              <Route exact path='/login' component={UserSignIn}/>
              <Route exact path='/register' component={UserSignUp}/>
              <Route exact path='/userprofile' component={UserProfile}/>
            </Switch>

          </main>

        </Router>

    );
  }


}
export default MainComponent;