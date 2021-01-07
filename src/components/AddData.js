import React from 'react';
import { connect } from 'react-redux';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import { sendAddDataPointReq } from '../redux/sketchbook';

function AddData(props) {
  const [value, setValue] = React.useState();

  const valueChange = e => {
    try {
      const num = Number(e.target.value);
      setValue(num);
    } catch {
      console.log('Value for data must be number');
    }
  }

  const createDataPoint = (e) => {
    e.preventDefault();
    props.sendAddDataPointReq(props.token, props.id, value);
  }

  return (
    <Container style={{ padding: "15px" }}>
      <form onSubmit={createDataPoint}>
        <TextField label="Value" type="number" onChange={valueChange} />
        <div>
          <Button variant="contained" style={{ marginTop: "10px", marginBottom: "10px" }} type="submit">Add data</Button>
        </div>
      </form>
      <Typography>Adding a value automatically adds it to the current date, and the value is added to already existing data
      for that date. For example, to record having drawn 1 sketch, enter 1 and add the value. To record drawing a second
      sketch, enter another 1 on the same day. The graph will display 2.</Typography>
      <Typography>The dark line is a suggested pace for the user to match to hit their goal on time.</Typography>
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
