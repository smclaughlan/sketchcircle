import { apiBaseUrl } from '../config';


const GET_SKETCHBOOKS = 'sketchcircle/sketchbooks/GET_SKETCHBOOKS';
const ADD_FOLLOW = 'sketchcircle/sketchbooks/ADD_FOLLOW';
const DELETE_FOLLOW = 'sketchcircle/sketchbooks/DELETE_FOLLOW';
const ADD_POST = 'sketchcircle/sketchbooks/ADD_POST';

export const getSketchbooks = (sketchbooks) => ({ type: GET_SKETCHBOOKS, sketchbooks });
export const addFollow = (newFollow) => ({ type: ADD_FOLLOW, newFollow });
export const deleteFollow = (removedFollow) => ({ type: DELETE_FOLLOW, removedFollow });
export const addPost = (newPost) => ({ type: ADD_POST, newPost });

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
      return {
        ...state,
      }
    }
    default: return state;
  }
}
