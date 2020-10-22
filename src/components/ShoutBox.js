import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';

const ShoutBox = props => {

  return (
    <Card>
      <ul id="chatMessages">
        <li>Message</li>
        <li>Message 2</li>
      </ul>
      <form action="">
        <input autoComplete="off" />
        <button>Send</button>
      </form>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
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
  ShoutBox
);
