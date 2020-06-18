import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { addFollowReq, deleteFollowReq } from '../redux/sketchbook';

const FollowBtn = (props) => {
  const [isFollowed, setFollowed] = React.useState(Object.keys(props.follows).includes(props.sketchbook_id.toString()));
  const { addFollowReq, deleteFollowReq } = props;

  const createFollow = () => {
    addFollowReq(props.token, props.sketchbook_id);
    setFollowed(true);
  }

  const removeFollow = () => {
    deleteFollowReq(props.token, props.sketchbook_id);
    setFollowed(false);
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
