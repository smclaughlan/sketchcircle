import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import { NavLink } from 'react-router-dom';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq, sendNewGoalReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Button, Container, TextField, Paper } from '@material-ui/core';
import LineGraph from './LineGraph';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const InsideSketchbook = (props) => {
  const displayedPosts = [];
  const [newGoalData, setNewGoalData] = React.useState({
    title: '',
    description: '',
    target: 1,
    targetDate: '',
  })
  const [displayedGoals, setDisplayedGoals] = React.useState();

  const [pageNum, setPageNum] = React.useState(1);
  const postsPerPage = 5;
  let totalPages = 0;

  const sketchbookId = window.location.href.split('/')[4];

  if (props.posts && props.posts[sketchbookId]) {
    let skbPosts = props.posts[sketchbookId];
    console.log(skbPosts);
    totalPages = Math.ceil(Object.keys(skbPosts).length / postsPerPage);
    console.log(totalPages);
    if (totalPages < 1) {
      totalPages = 1;
    }
    const postKeys = Object.keys(skbPosts);
    for (let i = pageNum * postsPerPage - postsPerPage; i < pageNum * postsPerPage; i++) {
      if (skbPosts[postKeys[i]]) {
        displayedPosts.push(skbPosts[postKeys[i]]);
      }
    }
    console.log(displayedPosts);
  }

  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, [])

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

  const firstPage = () => {
    setPageNum(1);
  }

  const prevPage = () => {
    setPageNum(pageNum - 1);
  }

  const nextPage = () => {
    setPageNum(pageNum + 1);
  }

  const lastPage = () => {
    setPageNum(totalPages);
  }

  return (
    <>
      <Container style={{ marginTop: "5%" }}>
        {displayedGoals ?
          Object.keys(displayedGoals).map(k => {
            return (
              <div key={displayedGoals[k].id}>
                <Paper style={{ margin: "20px" }}>
                  <LineGraph
                    id={displayedGoals[k].id}
                    title={displayedGoals[k].title}
                    description={displayedGoals[k].description}
                    owner_id={displayedGoals[k].owner_id}
                    sketchbook_id={displayedGoals[k].sketchbook_id}
                    target={displayedGoals[k].target}
                    targetDate={displayedGoals[k].targetdate}
                    timestamp={displayedGoals[k].timestamp} />
                </Paper>
              </div>
            )
          })
          :
          <h2>No goals found.</h2>
        }
      </Container>
      {sketchbookId === props.currentUserId ?
        <Container style={{ marginTop: "10px" }}>
          <Paper style={{ margin: "20px", padding: "15px" }}>
            <form onSubmit={newGoal}>
              <h2>New Goal</h2>
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
        <Container>
          <Button color="primary" href={`/sketchbook/${sketchbookId}/timeline`}>View Timeline</Button>
        </Container>
        <Container>
          {pageNum > 1 ?
            <Button color="primary" onClick={firstPage}>First</Button>
            :
            <>
            </>
          }
          {pageNum > 1 ?
            <Button color="primary" onClick={prevPage}>Prev</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button color="primary" onClick={nextPage}>Next</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button color="primary" onClick={lastPage}>Last</Button>
            :
            <>
            </>
          }
        </Container>
        {displayedPosts ?
          Object.keys(displayedPosts).map(k => {
            if (displayedPosts[k].avatar) {
              return (
                <Paper style={{ margin: '50px' }} >
                  <Container style={{ margin: '10px', padding: '10px' }} key={displayedPosts[k].id}>
                    <NavLink to={`/${displayedPosts[k].sketchbook_id}`}>
                      <img className="postAvatar" alt={`${displayedPosts[k].username}'s avatar`} src={displayedPosts[k].avatar} />
                      <h3>{displayedPosts[k].username}</h3>
                    </NavLink>
                    <ReactMarkdown source={displayedPosts[k].body} />
                    <p>{displayedPosts[k].timestamp}</p>
                  </Container>
                </Paper>
              )
            } else {
              return (
                <Paper style={{ margin: '50px' }} >
                  <Container style={{ margin: '10px', padding: '10px' }} key={displayedPosts[k].id}>
                    <h3>{displayedPosts[k].username}</h3>
                    <ReactMarkdown source={displayedPosts[k].body} />
                    <p>{displayedPosts[k].timestamp}</p>
                  </Container>
                </Paper>
              )
            }
          })
          :
          <h2>No posts found.</h2>
        }
        <Container>
          {pageNum > 1 ?
            <Button color="primary" onClick={firstPage}>First</Button>
            :
            <>
            </>
          }
          {pageNum > 1 ?
            <Button color="primary" onClick={prevPage}>Prev</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button color="primary" onClick={nextPage}>Next</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button color="primary" onClick={lastPage}>Last</Button>
            :
            <>
            </>
          }
        </Container>
      </Container>
      <Container>
        {props.token ?
          <MDE sketchbook_id={sketchbookId} />
          :
          <>
          </>
        }
      </Container>
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
