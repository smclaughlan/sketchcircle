import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Container, Paper } from '@material-ui/core';
import AddData from './AddData';

const LineGraph = (props) => {
  const dateFromTargetDate = new Date(props.targetDate);
  const dateFromTimestamp = new Date(props.timestamp);
  const sketchbookId = window.location.href.split('/')[4];

  //check first if value of all relevant datapoints is larger than target
  //and if so, return a completed message for that goal instead
  let total = 0;
  if (props.id in props.datapoints) {
    const datapointForGraphs = props.datapoints[props.id];
    Object.keys(datapointForGraphs).forEach(k => {
      const currDatapoint = datapointForGraphs[k];
      const currValue = currDatapoint.value;
      total += currValue;
    });
  }
  if (total > props.target) {
    return (
      <Container style={{ margin: "20px" }}>
        <Paper style={{ margin: "20px" }}>
          <div>{props.targetDate} {props.title} completed!</div>
        </Paper>
      </Container>
    )
  }

  //then check if the current date is past the the targetdate
  //and if so, return a failed message for that goal instead
  const currentDate = new Date();
  if (currentDate > dateFromTargetDate) {
    return (
      <Container style={{ margin: "20px" }}>
        <Paper style={{ margin: "20px" }}>
          <div>{props.targetDate} {props.title} failed!</div>
        </Paper>
      </Container>
    )
  }

  const dateLabels = [];
  if (dateFromTargetDate > dateFromTimestamp) {
    const accTargetDate = moment(dateFromTargetDate).add(1, 'day').toDate();
    let iDate = moment(dateFromTimestamp).toDate();
    while (iDate <= accTargetDate) {
      dateLabels.push(iDate.toLocaleString().split(',')[0]);
      iDate = moment(iDate).add(1, 'day').toDate();
    }
  }

  const idealData = [];
  for (let i = 1; i <= dateLabels.length; i++) {
    if (i === 1) {
      idealData.push(0);
    } else if (i === dateLabels.length) {
      idealData.push(props.target);
    } else {
      const percentage = i / (dateLabels.length);
      const idealDataPoint = props.target * percentage;
      idealData.push(idealDataPoint);
    }
  }

  const userData = [];
  if (props.id in props.datapoints) {
    const datapointForGraphs = props.datapoints[props.id];
    Object.keys(datapointForGraphs).forEach(k => {
      const currDatapoint = datapointForGraphs[k];
      //get value
      const currValue = currDatapoint.value;
      //get timestamp
      const currTimestamp = moment(currDatapoint.timestamp)
        .toDate()
        .toLocaleString()
        .split(',')[0]; //gives e.g."6/20/2020" as with dateLabels[]
      //if timestamp matches index of dateLabels[] then add it to userData[]
      //...at that index in userData
      if (dateLabels.indexOf(currTimestamp) !== -1) {
        const idxToAddValue = dateLabels.indexOf(currTimestamp);
        if (userData[idxToAddValue]) {
          userData[idxToAddValue] += currValue;
        } else {
          userData[idxToAddValue] = currValue;
        }
        if (idxToAddValue > 0) { //add previous value to this value, making
          //...each date's values add up over time
          userData[idxToAddValue] += userData[idxToAddValue - 1];
        }
      }
    })
  }

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Projected Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'rgba(0,0,150,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,0,0,1)',
        pointHoverBorderColor: 'rgba(0,0,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: idealData,
      },
      {
        label: 'User Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'rgba(0,200,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,0,0,1)',
        pointHoverBorderColor: 'rgba(0,0,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: userData,
      }
    ]
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <div>{props.description}</div>
      <Line data={data} />
      {sketchbookId === props.currentUserId ?
        <AddData
          id={props.id}
        />
        :
        <> </>
      }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    datapoints: state.sketchbook.datapoints,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  LineGraph
);
