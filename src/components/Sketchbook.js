import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FollowBtn from './FollowBtn';

const Sketchbook = props => {
  const timestampDate = new Date(props.timestamp);

  return (
    <>
      <div>
        <NavLink to={`/sketchbook/${props.sketchbook_id}`}>
          <h1>{props.title}</h1>
          <img className="sketchbookCover" alt="Sketchbook cover" src={props.avatar} />
        </NavLink>
      </div>
      <div>
        <FollowBtn
          {...props}
          sketchbook_id={props.sketchbook_id}
        />
      </div>
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
