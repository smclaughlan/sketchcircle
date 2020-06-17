import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getSketchbooksReq } from '../redux/sketchbook';

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
  })

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <NavLink to="/">
            <p color="inherit">Sketchcircle sketchbook</p>
          </NavLink>
        </Grid>
        <Grid item xs={3}>
          <NavLink to="/">
            <p color="inherit">Sketchcircle sketchbook</p>
          </NavLink>
        </Grid>
        <Grid item xs={3}>
          <NavLink to="/">
            <p color="inherit">Sketchcircle sketchbook</p>
          </NavLink>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    // currentUserId: state.user.currentUserId,
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
