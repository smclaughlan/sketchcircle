import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Button } from '@material-ui/core';
import history from '../utils/history';
import { addFollowReq, deleteFollowReq } from '../redux/sketchbook';

const FollowBtn = (props) => {
  const [isFollowed, setFollowed] = React.useState(Object.keys(props.follows).includes(props.sketchbook_id.toString()));
  const [redirect, setRedirect] = React.useState(false);
  const { token, sketchbook_id, addFollowReq, deleteFollowReq } = props;


  const createFollow = () => {
    addFollowReq(token, sketchbook_id);
    setFollowed(true);
    console.log(history);
    // history.push('/');
  }

  const removeFollow = () => {
    deleteFollowReq(token, sketchbook_id);
    setFollowed(false);
    console.log(history);
    // history.push('/');
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (isFollowed ?
    <Button color="primary" onClick={removeFollow}>Unstar</Button>
    :
    <Button color="primary" onClick={createFollow}>Star</Button>
  )
}


const mapStateToProps = state => {
  return {
    token: state.user.token,
    follows: state.sketchbook.follows,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFollowReq: (...args) => dispatch(addFollowReq(...args)),
    deleteFollowReq: (...args) => dispatch(deleteFollowReq(...args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
)
