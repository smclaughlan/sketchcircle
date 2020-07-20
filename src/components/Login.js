import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { sendLoginReq } from '../redux/user';

const Login = (props) => {
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

  return (props.token && props.currentUserId ?
    <Redirect to="/" />
    :
    <Container>
      <Paper>
        <Container>
          <h1>Login:</h1>
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
              <Button color="primary" type="submit">Login</Button>
            </div>
          </form>
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
