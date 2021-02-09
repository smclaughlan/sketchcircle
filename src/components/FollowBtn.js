import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addFollowReq, deleteFollowReq, getSketchbooksReq } from '../redux/sketchbook';
import { Star, StarBorder } from '@material-ui/icons';

function FollowBtn(props) {
  const [isFollowed, setFollowed] = React.useState(props.follows[props.sketchbook_id.toString()]);
  const { token, sketchbook_id, addFollowReq, deleteFollowReq } = props;

  function createFollow() {
    (async () => {
      await addFollowReq(token, sketchbook_id);
      setFollowed(true);
      const userId = props.currentUserId;
      await props.getSketchbooksReq(userId);
    })();
  }

  function removeFollow() {
    (async () => {
      await deleteFollowReq(token, sketchbook_id);
      setFollowed(false);
      const userId = props.currentUserId;
      await props.getSketchbooksReq(userId);
    })();
  }

  React.useEffect(() => {
    if (props.follows[props.sketchbook_id.toString()]) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [props.follows, props.sketchbook_id]);

  return (isFollowed ?
    <Star color="primary" style={{ cursor: "pointer" }} onClick={removeFollow} />
    :
    <StarBorder color="primary" style={{ cursor: "pointer" }} onClick={createFollow} />
  )
}


const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    token: state.user.token,
    follows: state.sketchbook.follows,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFollowReq: (...args) => dispatch(addFollowReq(...args)),
    deleteFollowReq: (...args) => dispatch(deleteFollowReq(...args)),
    getSketchbooksReq: (...args) => dispatch(getSketchbooksReq(...args)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
))
