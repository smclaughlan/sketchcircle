import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { addFollowReq } from '../redux/sketchbook';

const FollowBtn = (props) => {

  const createFollow = () => {
    props.addFollowReq(props.token, props.sketchbook_id);
  }

  return (Object.keys(props.follows).includes(props.sketchbook_id.toString()) ?
    <Button color="primary" onClick={createFollow}>Unstar</Button>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
)
