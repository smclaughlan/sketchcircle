import React from 'react';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Paper, Grid, Typography } from '@material-ui/core';
import { getSketchbooksReq } from '../redux/sketchbook';
import Sketchbook from './Sketchbook';
// import MDE from './MDE'; //TODO: Let admin users update a front page message?

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundImage: theme.gradientBackground,
//     marginBottom: 64
//   },
// }));

const Main = (props) => {
  // const classes = useStyles();

  const [pageNum, setPageNum] = React.useState(1);
  const skbPerPage = 12;
  let totalPages = 0;

  const followedSketchbooks = [];
  if (props.follows) {
    const followedKeys = Object.keys(props.follows);
    props.sketchbooks.forEach(book => { //check each from sketchbooks arr...
      Object.keys(book).forEach(k => { //using the key, which is the sketchbook_id
        if (followedKeys.includes(k)) { //the sketchbook_id is in followedKeys
          followedSketchbooks.push(book); //so push the book
        }
      })
    })
  }

  const displayedSketchbooks = [];
  if (props.sketchbooks) {
    totalPages = Math.ceil(props.sketchbooks.length / skbPerPage);
    if (totalPages < 1) {
      totalPages = 1;
    }
    for (let i = pageNum * skbPerPage - skbPerPage; i < pageNum * skbPerPage; i++) {
      if (props.sketchbooks[i]) {
        displayedSketchbooks.push(props.sketchbooks[i]);
      }
    }
  }

  React.useEffect(() => {
    const userId = props.currentUserId;
    props.getSketchbooksReq(userId);
  }, [props.currentUserId])

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

  if (followedSketchbooks.length > 0 && props.sketchbooks) {
    return (
      <>
        <Container style={{ marginTop: "10%" }}>
          <Typography variant="h4">SketchCircle</Typography>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          <Paper style={{ margin: "20px" }} elevation={3}>
            <Typography variant="h5" style={{ padding: "10px" }}>Starred Sketchbooks</Typography>
            <Grid container spacing={3}>
              {followedSketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          {...props}
                          sketchbook_id={book[k].sketchbook_id}
                          avatar={book[k].avatar}
                          owner_id={book[k].owner_id}
                          title={book[k].title}
                          timestamp={book[k].timestamp} />
                      </Grid>
                    )
                  }))
              })}
            </Grid>
          </Paper>
        </Container>
        <Container>
          <Paper style={{ margin: "20px" }} elevation={3}>
            <Typography variant="h5" style={{ padding: "10px" }}>All Sketchbooks</Typography>
            <Grid container spacing={3}>
              {displayedSketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          sketchbook_id={k}
                          owner_id={book[k].owner_id}
                          avatar={book[k].avatar}
                          title={book[k].title}
                          timestamp={book[k].timestamp} />
                      </Grid>
                    )
                  })
                )
              })}
            </Grid>
          </Paper>
          <Container>
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
        </Container>
      </>
    )
  }

  if (props.sketchbooks) {
    return (
      <>
        <Container style={{ marginTop: "10%" }}>
          <Typography variant="h4">SketchCircle</Typography>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          <Paper style={{ margin: "20px" }} elevation={3}>
            <Grid container spacing={3}>
              {displayedSketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          sketchbook_id={k}
                          owner_id={book[k].owner_id}
                          avatar={book[k].avatar}
                          title={book[k].title}
                          timestamp={book[k].timestamp} />
                      </Grid>
                    )
                  })
                )
              })}
            </Grid>
          </Paper>
          <Container>
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
        </Container>
      </>
    )
  }

  return <Typography>Loading...</Typography>

}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    sketchbooks: state.sketchbook.sketchbooks,
    follows: state.sketchbook.follows,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSketchbooksReq: (...args) => dispatch(getSketchbooksReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Main
);
