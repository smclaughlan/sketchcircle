import React from 'react';
import { connect } from 'react-redux';
import MDE from './MDE';
import { getPostsReq } from '../redux/sketchbook';

const InsideSketchbook = (props) => {
  const sketchbookId = window.location.href.split('/')[4];

  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, [])

  return (
    <>
      <h1>Inside of a sketchbook</h1>
      <MDE sketchbook_id={sketchbookId} />
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
    getPostsReq: (...args) => dispatch(getPostsReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  InsideSketchbook
);
