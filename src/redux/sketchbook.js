import { apiBaseUrl } from '../config';


const GET_SKETCHBOOKS = 'sketchcircle/sketchbooks/GET_SKETCHBOOKS';
const ADD_FOLLOW = 'sketchcircle/sketchbooks/ADD_FOLLOW';
const DELETE_FOLLOW = 'sketchcircle/sketchbooks/DELETE_FOLLOW';
const ADD_POST = 'sketchcircle/sketchbooks/ADD_POST';
const UPDATE_POST = 'sketchcircle/sketchbooks/UPDATE_POST';
const DELETE_POST = 'sketchcircle/sketchbooks/DELETE_POST';
const ADD_GOAL = 'sketchcircle/sketchbooks/ADD_GOAL';
const ADD_DATAPOINT = 'sketchcircle/sketchbooks/ADD_DATAPOINT';


export const getSketchbooks = (sketchbooks) => ({ type: GET_SKETCHBOOKS, sketchbooks });
export const addFollow = (newFollow) => ({ type: ADD_FOLLOW, newFollow });
export const deleteFollow = (removedFollow) => ({ type: DELETE_FOLLOW, removedFollow });
export const addPost = (newPost) => ({ type: ADD_POST, newPost });
export const updatePost = (updPost) => ({ type: UPDATE_POST, updPost });
export const delPost = () => ({ type: DELETE_POST });
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
    dispatch(addPost(newPost));
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
    dispatch(addDataPoint(newDataPoint));
    window.location.href = window.location.href;
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
    dispatch(addFollow(newFollow));
    // window.location.href = "/"
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
    dispatch(deleteFollow(removedFollow));
    // window.location.href = "/" //if the async await calls don't work, backup
  }
}

export const sendDeletePostReq = (token, postId) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/posts/${postId}`, {
    method: "delete",
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });
  if (res.ok) {
    const delRes = await res.json();
    console.log(delRes);
    // dispatch(delPost());
  }
}

export const sendUpdatePostReq = (token, postId, text, skbId) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/posts/${postId}`, {
    method: "put",
    body: JSON.stringify({ "body": `${text}` }),
    headers: {
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    }
  });

  // if (res.ok) {
  //   const updRes = await res.json();
  //need to add updated post to state
  // window.location.href = `/sketchbook/${skbId}`;
  let updPost = { skbId, postId, text };
  dispatch(updatePost(updPost));
  // }
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
      return {
        ...state,
        ...action.newPost,
      }
    }
    case UPDATE_POST: {
      const { skbId, postId, text } = action.updPost;
      state["posts"][skbId][postId]["body"] = text;
      return {
        ...state,
      }
    }
    case ADD_GOAL: {
      return {
        ...state,
        ...action.newGoal,
      }
    }
    case ADD_DATAPOINT: {

      return {
        ...state,
      }
    }
    default: return state;
  }
}
