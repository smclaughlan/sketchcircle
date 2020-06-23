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
  root: {
    flexGrow: 1,
    backgroundImage: theme.gradientBackground,
    marginBottom: 64
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    marginLeft: 100,
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
          <Button color="inherit">Sketchcircle</Button>
        </NavLink>
        {/* <NavLink style={{ color: 'white' }} to={`/profile/${props.currentUserId}`}>
          <Button color="inherit">My Sketchbook</Button>
        </NavLink> */}
        <NavLink style={{ color: 'white' }} to="/">
          <Button color="inherit" onClick={logOut}>Logout</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/update">
          <Button color="inherit">Edit Account</Button>
        </NavLink>
      </Grid>
    </Grid >
  ) : (
      <>
        <NavLink style={{ color: 'white' }} to="/">
          <Button color="inherit">Sketchcircle</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/register">
          <Button color="inherit">Register</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/login">
          <Button color="inherit">Login</Button>
        </NavLink>
      </>
    )


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
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
