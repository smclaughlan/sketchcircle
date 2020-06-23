import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FollowBtn from './FollowBtn';
import { Card, CardContent } from '@material-ui/core';

const Sketchbook = props => {
  const timestampDate = new Date(props.timestamp);

  return (
    <Card style={{ margin: "5px" }} variant="outlined">
      <CardContent>
        < NavLink to={`/sketchbook/${props.sketchbook_id}`}>
          <h1>{props.title}</h1>
          {props.avatar ?
            <img className="sketchbookCover" alt="Sketchbook cover" src={props.avatar} />
            :
            <>
            </>
          }
        </NavLink>
        <div>
          <FollowBtn
            {...props}
            sketchbook_id={props.sketchbook_id}
          />
        </div>
        <div>
          Last updated: {timestampDate.toLocaleString()}
        </div>
      </CardContent >
    </Card >
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
