import React from 'react';
import { connect } from 'react-redux';
import MDE from './MDE';

const InsideSketchbook = (props) => {

  const sketchbookId = window.location.href.split('/')[4];
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

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  InsideSketchbook
);
