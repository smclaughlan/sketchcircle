import React from 'react';
import { connect } from 'react-redux';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq, sendNewGoalReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Button, Container, TextField, Paper } from '@material-ui/core';
import LineGraph from './LineGraph';
import AddData from './AddData';

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
  const [displayedGoals, setDisplayedGoals] = React.useState();

  const sketchbookId = window.location.href.split('/')[4];

  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, [])

  React.useEffect(() => {
    if (props.posts && props.posts[sketchbookId]) {
      setDisplayedPosts(props.posts[sketchbookId]);
    }
  }, [props.posts])

  React.useEffect(() => {
    if (props.goals && props.goals[sketchbookId]) {
      setDisplayedGoals(props.goals[sketchbookId]);
    }
  }, [props.goals])

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

  console.log(displayedGoals);
  console.log(displayedPosts);
  return (
    <>
      <Container>
        {displayedGoals ?
          Object.keys(displayedGoals).map(k => {
            return (
              <div key={displayedGoals[k].id}>
                <Paper style={{ margin: "20px" }}>
                  <LineGraph
                    id={displayedGoals[k].id}
                    title={displayedGoals[k].title}
                    owner_id={displayedGoals[k].owner_id}
                    sketchbook_id={displayedGoals[k].sketchbook_id}
                    target={displayedGoals[k].target}
                    targetDate={displayedGoals[k].targetdate}
                    timestamp={displayedGoals[k].timestamp} />
                  {sketchbookId === props.currentUserId ?
                    <AddData
                      id={displayedGoals[k].id}
                    />
                    :
                    <> </>
                  }
                </Paper>
              </div>
            )
          })
          :
          <h2>No goals found.</h2>
        }
      </Container>
      {sketchbookId === props.currentUserId ?
        <Container>
          <Paper style={{ margin: "20px" }}>
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
                <TextField label="Target Date" type="date" InputLabelProps={{ shrink: true }} onChange={targetDateChange} />
              </div>
              <div>
                <Button color="primary" type="submit">Create new goal</Button>
              </div>
            </form>
          </Paper>
        </Container>
        :
        <>
        </>
      }
      <Container>
        {displayedPosts ?
          Object.keys(displayedPosts).map(k => {
            if (displayedPosts[k].avatar) {
              return (
                <Container key={displayedPosts[k].id}>
                  <Paper style={{ margin: '50px' }} >
                    <img alt={`${displayedPosts[k].username}'s avatar`} src={displayedPosts[k].avatar} />
                    <h3>{displayedPosts[k].username}</h3>
                    <ReactMarkdown source={displayedPosts[k].body} />
                    <p>{displayedPosts[k].timestamp}</p>
                  </Paper>
                </Container>
              )
            } else {
              return (
                <Container key={displayedPosts[k].id}>
                  <Paper style={{ margin: '50px' }} >
                    <h3>{displayedPosts[k].username}</h3>
                    <ReactMarkdown source={displayedPosts[k].body} />
                    <p>{displayedPosts[k].timestamp}</p>
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
    goals: state.sketchbook.goals,
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
