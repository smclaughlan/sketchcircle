import { apiBaseUrl } from '../config';


const GET_SKETCHBOOKS = 'sketchcircle/sketchbooks/GET_SKETCHBOOKS';
const ADD_FOLLOW = 'sketchcircle/sketchbooks/ADD_FOLLOW';
const DELETE_FOLLOW = 'sketchcircle/sketchbooks/DELETE_FOLLOW';
const ADD_POST = 'sketchcircle/sketchbooks/ADD_POST';
const ADD_GOAL = 'sketchcircle/sketchbooks/ADD_GOAL';
const ADD_DATAPOINT = 'sketchcircle/sketchbooks/ADD_DATAPOINT';

export const getSketchbooks = (sketchbooks) => ({ type: GET_SKETCHBOOKS, sketchbooks });
export const addFollow = (newFollow) => ({ type: ADD_FOLLOW, newFollow });
export const deleteFollow = (removedFollow) => ({ type: DELETE_FOLLOW, removedFollow });
export const addPost = (newPost) => ({ type: ADD_POST, newPost });
export const addGoal = (newGoal) => ({ type: ADD_GOAL, newGoal });
export const addDataPoint = (newDataPoint) => ({ type: ADD_DATAPOINT, newDataPoint });

export const getSketchbooksReq = (currentUserId) => async (dispatch) => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks`);

  if (res.ok) {
    const sketchbooks = await res.json();
    const follows = sketchbooks['follows'];
    const newFollows = {}
    follows.forEach(follow => {
      if (follow[0] === Number(currentUserId)) {
        newFollows[follow[1]] = true;
      }
    });
    sketchbooks['follows'] = newFollows;
    dispatch(getSketchbooks(sketchbooks));
  }
}

export const getPostsReq = (sketchbook_id) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks/${sketchbook_id}`);
  if (res.ok) {
    const posts = await res.json();
    dispatch(addPost(posts));
  }
}

export const sendPostReq = (token, sketchbook_id, msgBody) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks/${sketchbook_id}`, {
    method: "post",
    body: JSON.stringify({ msgBody }),
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newPost = await res.json();
    console.log(newPost);
    dispatch(addPost(newPost));
    window.location.href = window.location.href;
  }
}

export const sendNewGoalReq = (token, newGoalData) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/goal`, {
    method: "post",
    body: JSON.stringify(newGoalData),
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });
  if (res.ok) {
    const newGoal = await res.json();
    console.log(newGoal);
    dispatch(addGoal(newGoal));
    window.location.href = window.location.href;
  }
}

export const sendAddDataPointReq = (token, goalId, value) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/goal/newdata`, {
    method: "post",
    body: JSON.stringify({ 'goalid': goalId, 'value': value }),
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });
  if (res.ok) {
    const newDataPoint = await res.json();
    console.log(newDataPoint);
    dispatch(addDataPoint(newDataPoint));
    // window.location.href = window.location.href;
  }
}

export const addFollowReq = (token, sketchbook_id) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks/${sketchbook_id}/follow`, {
    method: "post",
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const newFollow = await res.json();
    console.log(newFollow);
    dispatch(addFollow(newFollow));
    window.location.href = "/"
  }
}

export const deleteFollowReq = (token, sketchbook_id) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks/${sketchbook_id}/follow`, {
    method: "delete",
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const removedFollow = await res.json();
    console.log(removedFollow);
    dispatch(deleteFollow(removedFollow));
    window.location.href = "/"
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_SKETCHBOOKS: {

      return {
        ...state,
        ...action.sketchbooks,
      }
    }
    case ADD_FOLLOW: {
      const newFollows = Object.assign(state.follows, action.newFollow);
      return {
        ...state,
        follows: newFollows,
      }
    }
    case DELETE_FOLLOW: {
      const deleteKey = action.removedFollow.sketchbook_id;
      delete state.follows[deleteKey];
      return {
        ...state,
      }
    }
    case ADD_POST: {

      //handle posts
      if (!state.posts) {
        state.posts = [];
      }
      if (action.newPost.posts) {
        action.newPost.posts.forEach(post => {
          state.posts.push(post);
        })
      } else {
        state.posts.push(action.newPost);
      }

      //handle goals the same way
      if (!state.goals) {
        state.goals = [];
      }
      if (action.newPost.goals) {
        action.newPost.goals.forEach(goal => {
          state.goals.push(goal);
        })
      }

      //and datapoints
      if (!state.datapoints) {
        state.datapoints = [];
      }
      if (action.newPost.datapoints) {
        action.newPost.datapoints.forEach(datapoint => {
          state.datapoints.push(datapoint);
        })
      }
      return {
        ...state,
      }
    }
    case ADD_GOAL: {
      if (!state.goals) {
        state.goals = [];
      }
      if (action.newGoal.goals) {
        action.newGoal.goals.forEach(goal => {
          state.goals.push(goal);
        })
      } else {
        state.goals.push(action.newGoal);
      }
      return {
        ...state,
      }
    }
    case ADD_DATAPOINT: {
      if (!state.datapoints) {
        state.datapoints = [];
      }
      if (action.newDataPoint.datapoints) {
        action.newDataPoint.datapoints.forEach(datapoint => {
          state.datapoints.push(datapoint);
        })
      } else {
        state.datapoints.push(action.newDataPoint);
      }
      return {
        ...state,
      }
    }
    default: return state;
  }
}
