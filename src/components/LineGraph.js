import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const LineGraph = (props) => {

  const dateFromTargetDate = new Date(props.targetDate);
  const dateFromTimestamp = new Date(props.timestamp);

  // console.log(dateFromTargetDate);
  // console.log(dateFromTimestamp);
  // console.log(dateFromTargetDate < dateFromTimestamp);

  const dateLabels = [];
  if (dateFromTargetDate > dateFromTimestamp) {
    const accTargetDate = moment(dateFromTargetDate).add(1, 'day').toDate();
    let iDate = moment(dateFromTimestamp).toDate();
    while (iDate <= accTargetDate) {
      // console.log(iDate);
      dateLabels.push(iDate.toLocaleString().split(',')[0]);
      iDate = moment(iDate).add(1, 'day').toDate();
    }
  }
  // console.log(dateLabels);

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

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Projected Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: idealData,
      }
    ]
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <Line data={data} />
    </div>
  )
}


const mapStateToProps = state => {
  return {

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
