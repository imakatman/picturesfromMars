import apiConfig from '../apiConfig';
import { CALCULATED_SCREEN_SIZE } from "./screenSpecs"

export const GET_MANIFEST_REQUEST  = 'GET_MANIFEST_REQUEST';
export const GET_MANIFEST_SUCCEEDS = 'GET_MANIFEST_SUCCEEDS';
export const GET_MANIFEST_FAILS    = 'GET_MANIFEST_FAILS';

const getManifestApiEndpoint = `${apiConfig.origin}/manifest`;

// ************************************************************************
// Action Types
// ************************************************************************

export const getManifestRequest = () => {
  return {
    type: GET_MANIFEST_REQUEST,
  }
}

export const getManifestSuccess = (status, data) => {
  return {
    type: GET_MANIFEST_SUCCEEDS,
    status,
    data
  }
}

export const getManifestFailure = (status, err) => {
  return {
    type: GET_MANIFEST_FAILS,
    status,
    err
  }
}

// ************************************************************************
// Redux Thunks
// ************************************************************************

export const getManifest = () => {
  return async dispatch => {
    let token = apiConfig.token;
    let status;
    dispatch(getManifestRequest());
    return await fetch(`${getManifestApiEndpoint}?token=${token}`, {
      method: "get",
    })
      .then(response => {
        status = response.status;
        if (!response.ok) {
          dispatch(getManifestFailure(status, response));
          console.log(response);
          return response;
        }
        return response.json();
      }, (err) => {
        dispatch(getManifestFailure(status, err));
        console.log('bad MANIFEST request');
      })
      .then(json => {
        console.log(json);
        if (json.ok !== undefined && !json.ok) {
          dispatch(getManifestFailure(status, json));
          return;
        }

        dispatch(getManifestSuccess(status, json));
      }, (err) => {
        dispatch(getManifestFailure(status, err));
        console.log('bad MANIFEST request - json');
      });
  }
};

// ************************************************************************
// Reducer
// ************************************************************************

export function rovers(state = {}, action) {
  switch (action.type) {
    case GET_MANIFEST_REQUEST:
      return Object.assign({}, state, {
        isGetting: true
      });
    case GET_MANIFEST_SUCCEEDS:
      return Object.assign({}, state, {
        isGetting: false,
        status: action.status,
        getSuccessful: true,
        list: action.data.rovers
      });
    case GET_MANIFEST_FAILS:
      return Object.assign({}, state, {
        isGetting: false,
        status: action.status,
        getSuccessful: false
      });
    default:
      return state;
  }
}
