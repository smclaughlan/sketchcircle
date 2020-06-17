import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { sendRegisterReq } from '../redux/user';

const Register = (props) => {
  const [registerData, setRegisterData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const userNameChange = (event) => {
    setRegisterData({
      ...registerData,
      username: event.target.value,
    });
  }

  const passwordChange = (event) => {
    setRegisterData({
      ...registerData,
      password: event.target.value,
    });
  }

  const emailChange = (event) => {
    setRegisterData({
      ...registerData,
      email: event.target.value,
    });
  }

  const registerUser = (event) => {
    event.preventDefault();
    props.sendRegisterReq(registerData);
  }

  return (
    <Container>
      <Paper>
        <Container>
          <h1>Register:</h1>
        </Container>
        <Container>
          <form onSubmit={registerUser}>
            <p>
              <TextField label="Username" onChange={userNameChange} />
            </p>
            <p>
              <TextField label="Email" onChange={emailChange} />
            </p>
            <p>
              <TextField label="Password" onChange={passwordChange} />
            </p>
            <Button color="primary">Register</Button>
          </form>
        </Container>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendRegisterReq: (...args) => dispatch(sendRegisterReq(...args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Register
)
