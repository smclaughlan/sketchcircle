import React from 'react';
import { connect } from 'react-redux';
import { Container, TextField, Button } from '@material-ui/core';
import { sendAddDataPointReq } from '../redux/sketchbook';

const AddData = (props) => {
  const [value, setValue] = React.useState();

  const valueChange = e => {
    try {
      const num = Number(e.target.value);
      setValue(num);
    } catch {
      console.log('Not a number');
    }
    console.log(value);
  }

  const createDataPoint = (e) => {
    e.preventDefault();
    props.sendAddDataPointReq(props.token, props.id, value);
  }

  return (
    <Container style={{ padding: "15px" }}>
      <form onSubmit={createDataPoint}>
        <TextField label="Value" type="number" onChange={valueChange} />
        <Button type="submit">Add data</Button>
      </form>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendAddDataPointReq: (...args) => dispatch(sendAddDataPointReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  AddData
);
