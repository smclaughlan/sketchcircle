import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Theme from './Theme';
import Nav from './components/Nav';
// import Login from './components/Login';
// import Register from './components/Register';

import { ProtectedRoute, AuthRoute } from './authRoutes';

function App(props) {
  return (
    <BrowserRouter>
      <Nav>
        <Switch path="/">
          <h1>Hello world!</h1>
        </Switch>
      </Nav>
    </BrowserRouter>
  );
}

// export default App;

const mapStateToProps = state => {
  return {
    // currentUserId: state.user.currentUserId,
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
