import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { sendLogoutReq } from '../redux/user';

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.primaryColor,
  },
  barButton: {
    '&:hover': {
      backgroundColor: '#990000',
    }
  }
}));

const NavBar = (props) => {
  const classes = useStyles();

  const logOut = () => {
    props.sendLogoutReq();
  }

  const navigation = props.currentUserId ? (
    <Grid container spacing={3}>
      <Grid item xs={10}>
        <NavLink style={{ color: 'white' }} to="/">
          <Button className={classes.barButton} color="inherit">Sketchcircle</Button>
        </NavLink>
      </Grid>
      <Grid item xs={2}>
        <NavLink style={{ color: 'white' }} to="/">
          <Button className={classes.barButton} color="inherit" onClick={logOut}>Logout</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/update">
          <Button className={classes.barButton} color="inherit">Edit Account</Button>
        </NavLink>
      </Grid>
    </Grid >
  ) : (
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <NavLink style={{ color: 'white' }} to="/">
            <Button className={classes.barButton} color="inherit">Sketchcircle</Button>
          </NavLink>
        </Grid>
        <Grid item xs={2}>
          <NavLink style={{ color: 'white' }} to="/register">
            <Button className={classes.barButton} color="inherit">Register</Button>
          </NavLink>
          <NavLink style={{ color: 'white' }} to="/login">
            <Button className={classes.barButton} color="inherit">Login</Button>
          </NavLink>
        </Grid>
      </Grid >
    )


  return (
    <div >
      <AppBar className={classes.bar} position="fixed">
        <Toolbar>
          {navigation}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLogoutReq: () => dispatch(sendLogoutReq()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  NavBar
);
