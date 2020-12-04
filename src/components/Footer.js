import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

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

const Footer = (props) => {
  const classes = useStyles();


  const navigation =
    <Grid container spacing={3}>
      <Grid item xs={10}>
        <NavLink style={{ color: 'white' }} to="/">
          <Button className={classes.barButton} color="inherit">Sketchcircle</Button>
        </NavLink>
      </Grid>
      <Grid item xs={2}>
        <NavLink style={{ color: 'white' }} to="/">
          <Button className={classes.barButton} color="inherit">Logout</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/update">
          <Button className={classes.barButton} color="inherit">Edit Account</Button>
        </NavLink>
      </Grid>
    </Grid >

  return (
    <div >
      <AppBar className={classes.bar} position="relative">
        <Toolbar>
          {navigation}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
