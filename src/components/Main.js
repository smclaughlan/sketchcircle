import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid } from '@material-ui/core';
import { getSketchbooksReq, getSketchbooks } from '../redux/sketchbook';
import Sketchbook from './Sketchbook';
import MDE from './MDE';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: theme.gradientBackground,
    marginBottom: 64
  },
}));

const Main = (props) => {
  const classes = useStyles();

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
    console.log(followedSketchbooks);
  }

  React.useEffect(() => {
    const userId = props.currentUserId;
    props.getSketchbooksReq(userId);
  }, [props.currentUserId])

  if (followedSketchbooks.length > 0 && props.sketchbooks) {
    return (
      <>
        <Container>
          <MDE />
          <Paper>
            <h3>Starred sketchbooks</h3>
            <Grid container spacing={3}>
              {followedSketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          {...props}
                          sketchbook_id={book[k].sketchbook_id}
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
          <Paper>
            <Grid container spacing={3}>
              {props.sketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          sketchbook_id={k}
                          owner_id={book[k].owner_id}
                          title={book[k].title}
                          timestamp={book[k].timestamp} />
                      </Grid>
                    )
                  })
                )
              })}
            </Grid>
          </Paper>
        </Container>
      </>
    )
  }

  if (props.sketchbooks) {
    return (
      <>
        <Container>
          <Paper>
            <Grid container spacing={3}>
              {props.sketchbooks.map(book => {
                return (
                  Object.keys(book).map(k => {
                    return (
                      <Grid key={k} item xs={3}>
                        <Sketchbook
                          sketchbook_id={k}
                          owner_id={book[k].owner_id}
                          title={book[k].title}
                          timestamp={book[k].timestamp} />
                      </Grid>
                    )
                  })
                )
              })}
            </Grid>
          </Paper>
        </Container>
      </>
    )
  }

  return <h1>Loading...</h1>

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
