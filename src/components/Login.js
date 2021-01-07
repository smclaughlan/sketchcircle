import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Container, Paper, TextField, Typography } from '@material-ui/core';
import { sendLoginReq } from '../redux/user';

function Login(props) {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const passwordChange = (event) => {
    setLoginData({
      ...loginData,
      password: event.target.value,
    });
  }

  const emailChange = (event) => {
    setLoginData({
      ...loginData,
      email: event.target.value,
    });
  }

  const loginUser = (event) => {
    event.preventDefault();
    props.sendLoginReq(loginData);
  }

  const guestData = () => {
    props.sendLoginReq({
      email: 'Guest@email.com',
      password: 'pass'
    });
  }

  return (props.token && props.currentUserId ?
    <Redirect to="/" />
    :
    <Container style={{ marginTop: '100px' }}>
      <Paper>
        <Container>
          <Typography variant="h6">Login:</Typography>
        </Container>
        <Container>
          {props.errorMsg ?
            <p>{props.errorMsg}</p>
            :
            <></>
          }
          <form onSubmit={loginUser}>
            <div>
              <TextField label="Email" onChange={emailChange} />
            </div>
            <div>
              <TextField label="Password" type="password" onChange={passwordChange} />
            </div>
            <div>
              <Button variant="outlined" style={{ marginTop: "10px", marginRight: "10px" }} type="submit">Login</Button>
            </div>
          </form>
          <div>
            <Button variant="outlined" color="primary" style={{ marginTop: "10px", marginRight: "10px", marginBottom: "10px" }} onClick={guestData}>Guest Login</Button>
          </div>
        </Container>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    errorMsg: state.user.loginError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendLoginReq: (...args) => dispatch(sendLoginReq(...args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Login
)
