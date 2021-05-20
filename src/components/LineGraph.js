import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Container, Typography } from "@material-ui/core";
import AddData from "./AddData";

function LineGraph(props) {
  const dateFromTargetDate = new Date(props.targetDate);
  const dateFromTimestamp = new Date(props.timestamp);
  const sketchbookId = window.location.href.split("/")[4];
  let allDataPointVals = 0;

  const [dateLabels, setDateLabels] = React.useState([]);
  const [idealData, setIdealData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [goalDisplayTotal, setGoalDisplayTotal] =
    React.useState(0);

  /** Incomplete Goal/Draw Graph **/
  React.useEffect(() => {
    let userDataTemp = userData.slice();
    let dateLabelsTemp = dateLabels.slice();
    let idealDataTemp = idealData.slice();
    let goalDisplayTemp = 0;

    if (dateFromTargetDate > dateFromTimestamp) {
      const accTargetDate = moment(dateFromTargetDate)
        .add(1, "day")
        .toDate();
      let iDate = moment(dateFromTimestamp).toDate();
      while (iDate <= accTargetDate) {
        dateLabelsTemp.push(
          iDate.toLocaleString().split(",")[0]
        );
        iDate = moment(iDate).add(1, "day").toDate();
      }
    }

    for (let i = 1; i <= dateLabelsTemp.length; i++) {
      if (i === 1) {
        idealDataTemp.push(0);
        // setIdealData(idealData.concat([0]));
      } else if (i === dateLabelsTemp.length) {
        idealDataTemp.push(props.target);
        // setIdealData(idealData.concat([props.target]));
      } else {
        const percentage = i / dateLabelsTemp.length;
        const idealDataPoint = props.target * percentage;
        idealDataTemp.push(idealDataPoint);
        // setIdealData(idealData.concat([idealDataPoint]));
      }
    }

    if (props.id in props.datapoints) {
      const datapointForGraphs = props.datapoints[props.id];
      Object.keys(datapointForGraphs).forEach((k) => {
        const currDatapoint = datapointForGraphs[k];
        //get value
        const currValue = currDatapoint.value;
        //get timestamp
        // goalDisplayTotal += currValue; //this will be displayed below, no further math with gDT
        goalDisplayTemp += currValue;
        const currTimestamp = moment(
          currDatapoint.timestamp
        )
          .toDate()
          .toLocaleString()
          .split(",")[0]; //gives e.g."6/20/2020" as with dateLabels[]
        //if timestamp matches index of dateLabels[] then add it to userData[]
        //at that index in userData

        if (dateLabelsTemp.indexOf(currTimestamp) !== -1) {
          const idxToAddValue =
            dateLabelsTemp.indexOf(currTimestamp);
          if (userDataTemp[idxToAddValue]) {
            // userData[idxToAddValue] += currValue;
            userDataTemp[idxToAddValue] += currValue;
          } else {
            userDataTemp[idxToAddValue] = currValue;
            if (idxToAddValue > 0) {
              //add previous value to this value, making
              //...each date's values add up over time
              if (
                userDataTemp[idxToAddValue - 1] !==
                undefined
              ) {
                userDataTemp[idxToAddValue] +=
                  userDataTemp[idxToAddValue - 1];
              }
            }
          }
        }
      });

      for (let i = 0; i < userDataTemp.length; i++) {
        //test for empty days
        if (userDataTemp[i] === undefined) {
          userDataTemp[i] = userDataTemp[i - 1]; //if day is empty, use previous day's value. Flat line on graph.
          for (
            let j = i + 1;
            j < userDataTemp.length;
            j++
          ) {
            //add current value to all the rest of the userDataTemp
            if (userDataTemp[j] === undefined) {
              break;
            }
            userDataTemp[j] += userDataTemp[i];
          }
        }
      }
    }

    setDateLabels(dateLabelsTemp);
    setIdealData(idealDataTemp);
    setUserData(userDataTemp);
    setGoalDisplayTotal(goalDisplayTemp);
  }, []);

  /** Completed Goal **/
  if (props.id in props.datapoints) {
    const datapointForGraphs = props.datapoints[props.id];
    Object.keys(datapointForGraphs).forEach((k) => {
      const currDatapoint = datapointForGraphs[k];
      const currValue = currDatapoint.value;
      allDataPointVals += currValue;
    });
  }

  /** Failed Goal **/
  const currentDate = new Date();
  const isCurrDatePastTargetDate =
    currentDate > dateFromTargetDate;
  if (isCurrDatePastTargetDate) {
    return (
      <Container style={{ margin: "20px" }}>
        <Typography>
          {props.targetDate} {props.title} failed!
        </Typography>
      </Container>
    );
  }

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "Suggested pace",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderColor: "rgba(0,0,150,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0,0,0,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0,0,0,1)",
        pointHoverBorderColor: "rgba(0,0,0,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: idealData,
      },
      {
        label: "User Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderColor: "rgba(0,200,0,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0,0,0,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0,0,0,1)",
        pointHoverBorderColor: "rgba(0,0,0,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: userData,
      },
    ],
  };

  /* Return completed goal */
  if (allDataPointVals >= props.target) {
    return (
      <Container style={{ margin: "20px" }}>
        <Typography>
          {props.targetDate} {props.title} completed!
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ margin: "10px" }}>
      <Typography variant="h5">{props.title}</Typography>
      <Typography>{props.description}</Typography>
      <Line data={data} />
      {sketchbookId === props.currentUserId ? (
        <AddData id={props.id} />
      ) : (
        <> </>
      )}
      <Typography>Goal target: {props.target}</Typography>
      <Typography>
        Completed: {goalDisplayTotal} (
        {((goalDisplayTotal / props.target) * 100).toFixed(
          0
        )}
        %)
      </Typography>
      <Typography>
        Remaining: {props.target - goalDisplayTotal}
      </Typography>
      <Typography style={{ paddingBottom: "10px" }}>
        Due date: {props.targetDate}
      </Typography>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    datapoints: state.sketchbook.datapoints,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineGraph);
