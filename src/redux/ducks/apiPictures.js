import moment from 'moment';
import apiConfig from '../apiConfig';

export const GET_PICTURES_REQUEST  = 'GET_PICTURES_REQUEST';
export const GET_PICTURES_SUCCEEDS = 'GET_PICTURES_SUCCEEDS';
export const GET_PICTURES_FAILS    = 'GET_PICTURES_FAILS';

const getPicturesApiEndpoint = `${apiConfig.origin}/rover`;

// ************************************************************************
// Action Types
// ************************************************************************

export const getPicturesRequest = () => {
  return {
    type: GET_PICTURES_REQUEST,
  }
}

export const getPicturesSuccess = (rover, status, json) => {
  return {
    type: GET_PICTURES_SUCCEEDS,
    rover,
    status,
    json
  }
}

export const getPicturesFailure = (status, err) => {
  return {
    type: GET_PICTURES_FAILS,
    status,
    err
  }
}

// ************************************************************************
// Redux Thunks
// ************************************************************************

export function getPictures(rover) {
  return async dispatch => {
    const token    = apiConfig.token;
    const endpoint = `${getPicturesApiEndpoint}/${rover}?token=${token}`;
    let status;

    dispatch(getPicturesRequest());
    return await fetch(endpoint, {
      method: "get",
    })
      .then(response => {
        status = response.status;
        console.log(response)
        if (!response.ok && !response.status) {
          dispatch(getPicturesFailure(status, response));
          console.log(response);
          return response;
        }
        return response.json();
      }, (err) => {
        console.log('bad GET_PICTURES request');
        dispatch(getPicturesFailure(status, err));
        return null;
      }).then(json => {
        console.log(json)
        if (json) {
          if (json.ok !== undefined && !json.ok) {
            return dispatch(getPicturesFailure(status, json));
          }

          return dispatch(getPicturesSuccess(rover, status, json));
        }
        return dispatch(getPicturesFailure(status, "Server is offline"));
      }, (err) => {
        dispatch(getPicturesFailure(status, err));
        console.log('bad GET_PICTURES request - json', err);
      });
  }
}

// ************************************************************************
// Reducer
// ************************************************************************

export function pictures(state = {}, action) {
  switch (action.type) {
    case GET_PICTURES_REQUEST:
      return Object.assign({}, state, {
        isGetting: true
      });
    case GET_PICTURES_SUCCEEDS:
      return Object.assign({}, state, {
        isGetting: false,
        status: action.status,
        getSuccessful: true,
        list: {
          ...state.pictures.list,
          [action.rover]: action.json.data.Days
        }
      });
    case GET_PICTURES_FAILS:
      return Object.assign({}, state, {
        isGetting: false,
        status: action.status,
        getSuccessful: false
      });
    default:
      return state;
  }
}
