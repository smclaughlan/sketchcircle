import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sketchbook = props => {


  const timestampDate = new Date(props.timestamp);

  return ( // TODO: Add user's avatar to display as their sketchbook image
    <>
      <NavLink to={`/sketchbook/${props.sketchbook_id}`}>
        <h1>{props.title}</h1>
      </NavLink>
      <div>Updated: {timestampDate.toLocaleString()}</div>
    </>
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
