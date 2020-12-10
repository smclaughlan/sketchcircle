import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.primaryColor,
    position: 'relative',
    top: '20px',
    bottom: 0,
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
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <Typography color="white">Copyright 2020</Typography>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <a style={{ color: 'white' }} href="https://github.com/smclaughlan/sketchcircle">
          <Typography color="inherit">Github</Typography>
        </a>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <a style={{ color: 'white' }} href="https://smclaughlan.github.io/#four">
          <Typography color="inherit">Contact</Typography>
        </a>
      </Grid>
    </Grid >

  return (
    <>
      <div style={{ minHeight: "50vh" }}>
      </div>
      <div>
        <AppBar className={classes.footer}>
          <Toolbar>
            {navigation}
          </Toolbar>
        </AppBar>
      </div >
    </>
  );
}

export default Footer;
