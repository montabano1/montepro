import React from 'react';
import GreetingContainer from './greetings/greeting_container';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import StartContainer from './start/start_container';
import SignupOptionsContainer from './options/signup_options_container';
import CourtSheetContainer from './courts/court_sheet_container';
import CourtSetupContainer from './courts/court_setup_container';
import EventFormContainer from './events/event_form_container';
import CreateAvailabilityFormContainer from './availabilities/create_availability_form_container';
import ProOptions from './options/pro_options';
import MemberOptions from './options/member_options';
import { Route, Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';

const App = () => (
  <div>
    <Modal className='modal'/>
    <header>
      <Link to='/' >
        <h1 className='logo'>MontePro</h1>
      </Link>
      <GreetingContainer />
    </header>
    <AuthRoute exact path="/" component={StartContainer} />
    <ProtectedRoute exact path="/options" component={SignupOptionsContainer} />
    <ProtectedRoute exact path="/options/pro" component={ProOptions} />
    <ProtectedRoute exact path="/options/member" component={MemberOptions} />
    <ProtectedRoute path="/options/pro/courtsetup" component={CourtSetupContainer} />
    <ProtectedRoute path="/court" component={CourtSheetContainer} />
    <ProtectedRoute path="/Availabilities" component={CreateAvailabilityFormContainer} />
    <ProtectedRoute exact path="/clinic" component={EventFormContainer} />
  </div>
);

export default App;
