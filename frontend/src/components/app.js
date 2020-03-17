import React from 'react';
import { AuthRoute } from '../util/route_util';
// , ProtectedRoute ^ pop in above import when needed
import { Switch, Route } from 'react-router-dom';

import '../styles/theme.scss'
import NavBarContainer from './nav/navbar_container';
import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={MainPageContainer} />
    </Switch>
  </div>

);

export default App;