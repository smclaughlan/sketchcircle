import React from 'react';
import { connect } from 'react-redux';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Container, Paper } from '@material-ui/core';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const InsideSketchbook = (props) => {
  const [displayedPosts, setDisplayedPosts] = React.useState();
  const sketchbookId = window.location.href.split('/')[4];

  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, [])

  React.useEffect(() => {
    if (props.posts) {
      const sortPosts = [];
      props.posts.forEach(post => {
        if (post.sketchbook_id === Number(sketchbookId)) {
          sortPosts.push(post);
        }
      })
      setDisplayedPosts(sortPosts);
    }
  }, [props.posts])

  return (
    <>
      <h1>Inside of a sketchbook</h1>
      <Container>
        {displayedPosts ?
          displayedPosts.map(post => {
            if (post.avatar) {
              return (
                <Container key={post.id}>
                  <Paper style={{ margin: '50px' }} >
                    <img alt={`${post.username}'s avatar`} src={post.avatar} />
                    <h3>{post.username}</h3>
                    <ReactMarkdown source={post.body} />
                    <p>{post.timestamp}</p>
                  </Paper>
                </Container>
              )
            } else {
              return (
                <Container key={post.id}>
                  <Paper style={{ margin: '50px' }} >
                    <h3>{post.username}</h3>
                    <ReactMarkdown source={post.body} />
                    <p>{post.timestamp}</p>
                  </Paper>
                </Container>
              )
            }
          })
          :
          <h2>No posts found.</h2>
        }
      </Container>
      <MDE sketchbook_id={sketchbookId} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    posts: state.sketchbook.posts,
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
