import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MDE from './MDE';
import * as Showdown from "showdown";
import { getPostsReq, sendNewGoalReq, sendDeletePostReq } from '../redux/sketchbook';
import ReactMarkdown from 'react-markdown';
import { Button, Container, Divider, TextField, Typography, Paper, Grid } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';
import LineGraph from './LineGraph';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const InsideSketchbook = (props) => {
  const displayedPosts = [];
  let justPosted = window.localStorage.getItem("justPosted");
  let scrollID = window.localStorage.getItem("focusID");
  console.log("scrollID", scrollID);

  const [newGoalData, setNewGoalData] = React.useState({
    title: '',
    description: '',
    target: 1,
    targetDate: '',
  })
  const [displayedGoals, setDisplayedGoals] = React.useState();

  const pageButtons = React.useRef(null);
  const pageBottom = React.useRef(null);

  const [pageNum, setPageNum] = React.useState(1);
  const postsPerPage = 5;
  let totalPages = 0;

  let sketchbookId = window.location.href.split('/')[4];

  if (props.posts && props.posts[sketchbookId]) {
    let skbPosts = props.posts[sketchbookId];
    totalPages = Math.ceil(Object.keys(skbPosts).length / postsPerPage);
    if (totalPages < 1) {
      totalPages = 1;
    }
    const postKeys = Object.keys(skbPosts);
    for (let i = pageNum * postsPerPage - postsPerPage; i < pageNum * postsPerPage; i++) {
      if (skbPosts[postKeys[i]]) {
        displayedPosts.push(skbPosts[postKeys[i]]);
      }
    }
  }

  let refs = displayedPosts.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {})


  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, [])

  React.useEffect(() => {

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
      console.log('Goal target must be number');
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

  const deletePost = async (postId) => {
    await props.sendDeletePostReq(props.token, postId);
    await props.getPostsReq(sketchbookId);
  }

  const scrollToPageButtons = () => {
    pageButtons.current.scrollIntoView();
  }

  const scrollToPageBottom = () => {
    pageBottom.current.scrollIntoView();
  }

  const saveFocusID = (id) => {
    window.localStorage.setItem("focusID", id);
  }

  const clearFocusID = () => {
    window.localStorage.setItem("focusID", null);
    scrollID = null;
  }

  const firstPage = () => {
    setPageNum(1);
    scrollToPageButtons();
  }

  const prevPage = () => {
    setPageNum(pageNum - 1);
    scrollToPageButtons();
  }

  const nextPage = () => {
    setPageNum(pageNum + 1);
    scrollToPageButtons();
  }

  const lastPage = () => {
    setPageNum(totalPages);
    scrollToPageButtons();
  }

  const lastPageBottom = () => {
    setPageNum(totalPages);
    scrollToPageBottom();
  }

  const scrollToPostRef = (refID) => {
    console.log(refs);
    refs[refID].current.scrollIntoView();
  }

  if (justPosted === "true") {
    justPosted = "false";
    window.localStorage.setItem("justPosted", false);
    lastPageBottom();
    clearFocusID();
  }

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
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
          <>
          </>
        }
      </Container>
      {sketchbookId === props.currentUserId ?
        <Container style={{ marginTop: "10px" }}>
          <Paper style={{ margin: "20px", padding: "15px" }}>
            <form onSubmit={newGoal}>
              <Typography variant="h5">New Goal</Typography>
              <Typography>Create a new goal with a title, description, target value to reach, and a target date.
              For example, a title might be "Draw 5 portrait sketches in 7 days", which would have a target value of 5,
              and a target date 7 days from now.
              </Typography>
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
                <Button variant="contained" type="submit" style={{ marginTop: "10px" }}>Create new goal</Button>
              </div>
            </form>
          </Paper>
        </Container>
        :
        <>
        </>
      }
      <Container ref={pageButtons}>
        <Container>
          {displayedPosts.length > 0 ?
            <Button variant="contained" href={`/sketchbook/${sketchbookId}/timeline`}>View Timeline</Button>
            :
            <></>}
        </Container>
        <Container style={{ marginTop: '30px' }}>
          {pageNum > 1 ?
            <Button variant="outlined" style={{ marginTop: "10px", marginRight: "10px" }} onClick={firstPage}>First</Button>
            :
            <>
            </>
          }
          {pageNum > 1 ?
            <Button variant="outlined" style={{ marginTop: "10px", marginRight: "10px" }} onClick={prevPage}>Prev</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button variant="outlined" style={{ marginTop: "10px", marginRight: "10px" }} onClick={nextPage}>Next</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button variant="outlined" style={{ marginTop: "10px", marginRight: "10px" }} onClick={lastPage}>Last</Button>
            :
            <>
            </>
          }
        </Container>
        {displayedPosts.length > 0 ?
          Object.keys(displayedPosts).map(k => {
            return (
              <Paper ref={refs[displayedPosts[k].id]} style={{ margin: '50px' }} key={displayedPosts[k].id} >
                <Container style={{ margin: '10px', padding: '10px' }} >
                  <Grid container>
                    <Grid item xs={11}>
                      <NavLink
                        style={{ color: "#d33232" }}
                        onClick={() => {
                          props.getPostsReq(displayedPosts[k].user_id);
                          firstPage();
                        }}
                        to={`/sketchbook/${displayedPosts[k].user_id}`}>
                        {displayedPosts[k].avatar ?
                          <img className="postAvatar" alt={`${displayedPosts[k].username}'s avatar`} src={displayedPosts[k].avatar} />
                          :
                          <></>
                        }
                        <Typography>{displayedPosts[k].username}</Typography>
                      </NavLink>
                    </Grid>
                    <Grid item xs={1}>
                      {displayedPosts[k].user_id === parseInt(props.currentUserId) ?
                        <DeleteForever className="deleteButton" color="primary" onClick={() => { deletePost(displayedPosts[k].id) }} />
                        :
                        <>
                        </>
                      }
                    </Grid>
                  </Grid>
                  <Divider variant="middle"></Divider>
                  <ReactMarkdown source={displayedPosts[k].body} />
                  <Divider variant="middle"></Divider>
                  <p>{displayedPosts[k].timestamp}</p>
                  {displayedPosts[k].user_id === parseInt(props.currentUserId) ?
                    <>
                      <NavLink to={`/sketchbook/${sketchbookId}/post/${displayedPosts[k].id}/edit`}>
                        <Edit color="primary" onClick={() => { saveFocusID(displayedPosts[k].id) }} />
                      </NavLink>
                    </>
                    :
                    <>
                    </>
                  }
                </Container>
              </Paper>
            )
          })
          :
          <></>
        }
        {displayedPosts.length === 0 && props.token ?
          <Typography style={{ marginTop: "100px", marginBottom: "10px" }}>No posts found. Introduce yourself or welcome the new user!</Typography>
          :
          <>
          </>
        }
        {displayedPosts.length === 0 && !props.token ?
          <Typography style={{ marginTop: "100px", marginBottom: "10px" }}>No posts found. Register/sign in to post!</Typography>
          :
          <>
          </>
        }
        <Container ref={pageBottom}>
          {pageNum > 1 ?
            <Button variant="outlined" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={firstPage}>First</Button>
            :
            <>
            </>
          }
          {pageNum > 1 ?
            <Button variant="outlined" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={prevPage}>Prev</Button>
            :
            <>
            </>
          }
          {pageNum < totalPages ?
            <Button variant="outlined" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={nextPage}>Next</Button>
            :
            <>
            </>
          }
          {
            pageNum < totalPages ?
              <Button variant="outlined" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={lastPage}>Last</Button>
              :
              <>
              </>
          }
        </Container >
      </Container >
      <Container>
        {props.token ?
          <MDE lastPage={lastPage} sketchbook_id={sketchbookId} />
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
    sendDeletePostReq: (...args) => dispatch(sendDeletePostReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  InsideSketchbook
);
