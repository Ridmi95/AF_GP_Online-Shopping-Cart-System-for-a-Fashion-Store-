import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/CallToActionIntro.css';
import UserSignIn from "./UserLogin";
import UserSignUp from "./UserSignUp";
import Landing from "./UserLanding";
import UserProfile from "./UserProfile";
import UserLogout from "./UserLogout";

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
              <Route exact path = '/logout' component={UserLogout}/>
            </Switch>

          </main>

        </Router>

    );
  }


}
export default MainComponent;