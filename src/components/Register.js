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
            <div>
              <TextField label="Username" onChange={userNameChange} />
            </div>
            <div>
              <TextField label="Email" onChange={emailChange} />
            </div>
            <div>
              <TextField label="Password" onChange={passwordChange} />
            </div>
            <div>
              <Button color="primary" type="submit">Register</Button>
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
