import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Theme from './Theme';
import Nav from './components/Nav';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import InsideSketchbook from './components/InsideSketchbook';
import SketchTimeline from './components/SketchTimeline';

import { ProtectedRoute, AuthRoute } from './authRoutes';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/register" component={Register} currentUserId={props.currentUserId} />
        <Route path="/login" component={Login} currentUserId={props.currentUserId} />
        <Route path="/sketchbook/:sketchbook_id/timeline" component={SketchTimeline} currentUserId={props.currentUserId} />
        <Route path="/sketchbook/:sketchbook_id" component={InsideSketchbook} currentUserId={props.currentUserId} />
        <Route path="/" component={Main} {...props} currentUserId={props.currentUserId} />
      </Switch>
    </BrowserRouter>
  );
}

// export default App;

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  App
);
