import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addFollowReq, deleteFollowReq } from '../redux/sketchbook';
import { Star, StarBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.primaryColor,
  },
}));

const FollowBtn = (props) => {
  const classes = useStyles();

  const [isFollowed, setFollowed] = React.useState(Object.keys(props.follows).includes(props.sketchbook_id.toString()));
  const { token, sketchbook_id, addFollowReq, deleteFollowReq } = props;


  const createFollow = () => {
    addFollowReq(token, sketchbook_id);
    setFollowed(true);
  }

  const removeFollow = () => {
    deleteFollowReq(token, sketchbook_id);
    setFollowed(false);
  }

  return (isFollowed ?
    <Star color="primary" onClick={removeFollow} />
    :
    <StarBorder color="primary" onClick={createFollow} />
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
))
