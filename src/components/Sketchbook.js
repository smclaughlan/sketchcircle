import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sketchbook = props => {

  return (
    <h1>{props.title}</h1>
  )
}


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
  Sketchbook
);
