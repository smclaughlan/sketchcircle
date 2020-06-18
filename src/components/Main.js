import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getSketchbooksReq } from '../redux/sketchbook';
import Sketchbook from './Sketchbook';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: theme.gradientBackground,
    marginBottom: 64
  },
}));

const Main = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getSketchbooksReq();
  }, [])

  console.log(props.sketchbooks);
  return props.sketchbooks ?
    <Grid container spacing={3}>
      {Object.keys(props.sketchbooks).map(k => {
        return (
          <Grid key={k} item xs={3}>
            <Sketchbook
              sketchbook_id={k}
              owner_id={props.sketchbooks[k].owner_id}
              title={props.sketchbooks[k].title}
              timestamp={props.sketchbooks[k].timestamp} />
          </Grid>
        )
      })}
    </Grid >
    :
    (<h1>Loading...</h1>)

}

const mapStateToProps = state => {
  return {
    // currentUserId: state.user.currentUserId,
    sketchbooks: state.sketchbook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSketchbooksReq: () => dispatch(getSketchbooksReq()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Main
);
