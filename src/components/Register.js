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
  const [registerEnabled, setRegisterEnabled] = React.useState(false);

  const checkRegisterButton = () => {
    if (registerData.username.length > 0 && registerData.password.length > 0
      && registerData.email.indexOf("@") !== -1
      && registerData.email.indexOf(".") !== -1) {
      setRegisterEnabled(true);
    } else {
      setRegisterEnabled(false);
    }
  }

  const userNameChange = (event) => {
    setRegisterData({
      ...registerData,
      username: event.target.value,
    });
    checkRegisterButton();
  }

  const passwordChange = (event) => {
    setRegisterData({
      ...registerData,
      password: event.target.value,
    });
    checkRegisterButton();
  }

  const emailChange = (event) => {
    setRegisterData({
      ...registerData,
      email: event.target.value,
    });
    checkRegisterButton();
  }

  const registerUser = (event) => {
    event.preventDefault();
    props.sendRegisterReq(registerData);
    props.history.push('/');
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
              <TextField label="Password" type="password" onChange={passwordChange} />
            </div>
            <div>
              {registerEnabled ?
                <Button color="primary" type="submit">Register</Button>
                :
                <Button color="primary" type="submit" disabled>Register</Button>
              }
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
