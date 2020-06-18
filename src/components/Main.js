import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getSketchbooksReq, getSketchbooks } from '../redux/sketchbook';
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
    const userId = props.currentUserId;
    props.getSketchbooksReq(userId);
  }, [props.currentUserId])

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
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    sketchbooks: state.sketchbook.sketchbooks,
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
