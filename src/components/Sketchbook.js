import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FollowBtn from './FollowBtn';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';

function Sketchbook(props) {
  const timestampDate = new Date(props.timestamp);

  return (
    <Card style={{ margin: "5px" }} variant="outlined">
      <CardContent>
        <NavLink style={{ color: "#d33232" }} to={`/sketchbook/${props.sketchbook_id}`}>
          <Typography variant="h6">{props.title}</Typography>
          {props.avatar ?
            <img className="sketchbookCover" alt="Sketchbook cover" src={props.avatar} />
            :
            <>
            </>
          }
        </NavLink>
        <div>
          {props.token ?
            <FollowBtn
              {...props}
              sketchbook_id={props.sketchbook_id}
            />
            :
            <>
            </>
          }
        </div>
        <Divider variant="middle"></Divider>
        <div>
          <Typography style={{ fontSize: "12px", padding: "10px" }}>Updated: {timestampDate.toLocaleString()}</Typography>
        </div>
      </CardContent >
    </Card >
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
  Sketchbook
);
