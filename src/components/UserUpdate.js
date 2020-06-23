import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { sendUpdateReq } from '../redux/user';
import { getSketchbooksReq } from '../redux/sketchbook';

const UserUpdate = (props) => {
  const [updateData, setUpdateData] = React.useState({
    avatarUrl: '',
  });

  const avatarChange = (event) => {
    setUpdateData({
      ...updateData,
      avatarUrl: event.target.value,
    });
  }

  const updateUserInfo = (event) => {
    event.preventDefault();
    props.sendUpdateReq(props.token, updateData);
    const userId = props.currentUserId;
    props.getSketchbooksReq(userId);
    props.history.push('/');
  }

  return (
    <Container>
      <Paper>
        <Container>
          <h1>User Update:</h1>
        </Container>
        <Container>
          <form onSubmit={updateUserInfo}>
            <div>
              <TextField label="Avatar Url" onChange={avatarChange} />
            </div>
            <div>
              <Button color="primary" type="submit">Update</Button>
            </div>
          </form>
        </Container>
      </Paper>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendUpdateReq: (...args) => dispatch(sendUpdateReq(...args)),
    getSketchbooksReq: (...args) => dispatch(getSketchbooksReq(...args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  UserUpdate
)
