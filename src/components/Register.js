import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Paper, TextField, Typography } from '@material-ui/core';
import { sendRegisterReq } from '../redux/user';
import { Redirect } from 'react-router-dom';

function Register(props) {
  const [registerData, setRegisterData] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  const [registerEnabled, setRegisterEnabled] = React.useState(false);

  const checkRegisterButton = () => {
    let userHasEnteredAName = registerData.username.length > 0;
    let userHasEnteredAPassword = registerData.password.length > 0;
    let emailHasNecessaryPunctuation = registerData.email.indexOf("@") !== -1
      && registerData.email.indexOf(".") !== -1
    if (userHasEnteredAName && userHasEnteredAPassword
      && emailHasNecessaryPunctuation) {
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
  }

  return (props.token ?
    <Redirect to='/' />
    :
    <Container style={{ marginTop: '100px' }}>
      <Paper>
        <Container>
          <Typography variant="h6">Register:</Typography>
        </Container>
        <Container>
          {props.errorMsg ?
            <p>{props.errorMsg}</p>
            :
            <></>
          }
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
                <Button variant="outlined" color="primary" style={{ marginTop: "10px", marginRight: "10px", marginBottom: "10px" }} type="submit">Register</Button>
                :
                <Button variant="outlined" color="primary" style={{ marginTop: "10px", marginRight: "10px", marginBottom: "10px" }} type="submit" disabled>Register</Button>
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
    errorMsg: state.user.registerError,
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
