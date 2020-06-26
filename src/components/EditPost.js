import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import { NavLink } from 'react-router-dom';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq, sendNewGoalReq, sendDeletePostReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Button, Container, TextField, Paper } from '@material-ui/core';


const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const EditPost = (props) => {

  const sketchbookId = window.location.href.split('/')[4];
  const editPost = window.location.href.split('/')[6];
  console.log(editPost);

  return (
    <>
      <Container style={{ marginTop: "5%" }}>
        <MDE sketchbookId={sketchbookId} editPost={editPost} />
      </Container>
    </>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    posts: state.sketchbook.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getPostsReq: (...args) => dispatch(getPostsReq(...args)),
    // sendNewGoalReq: (...args) => dispatch(sendNewGoalReq(...args)),
    // sendDeletePostReq: (...args) => dispatch(sendDeletePostReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  EditPost
);
