import { apiBaseUrl } from '../config';


const GET_SKETCHBOOKS = 'sketchcircle/sketchbooks/GET_SKETCHBOOKS';
const ADD_FOLLOW = 'sketchcircle/sketchbooks/ADD_FOLLOW';
const DELETE_FOLLOW = 'sketchcircle/sketchbooks/DELETE_FOLLOW';

export const getSketchbooks = (sketchbooks) => ({ type: GET_SKETCHBOOKS, sketchbooks });
export const addFollow = (newFollow) => ({ type: ADD_FOLLOW, newFollow });
export const deleteFollow = (removedFollow) => ({ type: DELETE_FOLLOW, removedFollow });

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
    default: return state;
  }
}
