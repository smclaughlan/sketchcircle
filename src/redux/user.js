import { apiBaseUrl } from '../config';


const LOGIN_USER = 'sketchcircle/login/LOGIN_USER';
const LOGOUT_USER = 'sketchcircle/logout/LOGOUT_USER';

export const loginUser = (token, currentUserId) => ({ type: LOGIN_USER, token, currentUserId });
export const logoutUser = () => ({ type: LOGOUT_USER });

export const sendRegisterReq = (userInfo) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/users`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInfo.username,
      email: userInfo.email,
      hashed_password: userInfo.password
    }),
  })

  if (res.ok) {
    const { token, currentUserId } = await res.json();
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId);
    dispatch(loginUser(token, currentUserId));
  }
}

export const sendLoginReq = (userInfo) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/users/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userInfo.email,
      password: userInfo.password
    }),
  })

  if (res.ok) {
    const { token, currentUserId } = await res.json()
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId.toString());
    dispatch(loginUser(token, currentUserId.toString()))
  }
}

export const sendLogoutReq = () => async dispatch => {
  window.localStorage.removeItem("x-access-token");
  window.localStorage.removeItem("currentUserId");
  dispatch(logoutUser())
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        token: action.token,
        currentUserId: action.currentUserId,
      }
    }
    case LOGOUT_USER: {
      delete state.token;
      delete state.currentUserId;
      return {
        ...state,
      }
    }

    default: return state;
  }
}
