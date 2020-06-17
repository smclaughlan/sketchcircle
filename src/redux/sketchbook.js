import { apiBaseUrl } from '../config';


const GET_SKETCHBOOKS = 'sketchcircle/login/GET_SKETCHBOOKS';

export const getSketchbooks = (sketchbooks) => ({ type: GET_SKETCHBOOKS, sketchbooks });

export const getSketchbooksReq = () => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/sketchbooks`);

  if (res.ok) {
    const sketchbooks = await res.json();
    console.log(sketchbooks);
    dispatch(getSketchbooks(sketchbooks));
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

    default: return state;
  }
}
