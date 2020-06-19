import React from 'react';
import { connect } from 'react-redux';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq, sendNewGoalReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Button, Container, TextField, Paper } from '@material-ui/core';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const InsideSketchbook = (props) => {
  const [displayedPosts, setDisplayedPosts] = React.useState();
  const [newGoalData, setNewGoalData] = React.useState({
    title: '',
    description: '',
    target: 1,
    targetDate: '',
  })
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

  const titleChange = event => {
    setNewGoalData({
      ...newGoalData,
      title: event.target.value
    })
  }

  const descriptionChange = event => {
    setNewGoalData({
      ...newGoalData,
      description: event.target.value
    })
  }

  const targetChange = event => {
    try {
      const num = Number(event.target.value);
      setNewGoalData({
        ...newGoalData,
        target: num
      })
    } catch {
      console.log('Not a number');
    }
  }

  const targetDateChange = event => {
    setNewGoalData({
      ...newGoalData,
      targetDate: event.target.value
    })
  }

  const newGoal = (e) => {
    e.preventDefault();
    props.sendNewGoalReq(props.token, newGoalData);
  }

  return (
    <>
      <h1>Inside of a sketchbook</h1>
      <Container>
        <form onSubmit={newGoal}>
          <div>
            <TextField label="Title" onChange={titleChange} />
          </div>
          <div>
            <TextField label="Description" multiline onChange={descriptionChange} />
          </div>
          <div>
            <TextField label="Target Value" onChange={targetChange} />
          </div>
          <div>
            <TextField label="Target Date" type="date" onChange={targetDateChange} />
          </div>
          <div>
            <Button color="primary" type="submit">Create new goal</Button>
          </div>
        </form>
      </Container>
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
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    posts: state.sketchbook.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostsReq: (...args) => dispatch(getPostsReq(...args)),
    sendNewGoalReq: (...args) => dispatch(sendNewGoalReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  InsideSketchbook
);
