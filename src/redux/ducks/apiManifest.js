import moment from 'moment';
import apiConfig from '../apiConfig';

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

export const getManifestSuccess = (status, json) => {
  return {
    type: GET_MANIFEST_SUCCEEDS,
    status,
    json
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

export function getManifest() {
  return async dispatch => {
    const token    = apiConfig.token;
    const endpoint =`${getManifestApiEndpoint}?token=${token}`;
    let status;

    dispatch(getManifestRequest());
    return await fetch(endpoint, {
      method: "get",
    })
      .then(response => {
        status = response.status;
        console.log(response)
        if (!response.ok && !response.status) {
          dispatch(getManifestFailure(status, response));
          console.log(response);
          return response;
        }
        return response.json();
      }, (err) => {
        console.log('bad MANIFEST request');
        dispatch(getManifestFailure(status, err));
        return null;
      }).then(json => {
        console.log(json)
        if (json) {
          if (json.ok !== undefined && !json.ok) {
            return dispatch(getManifestFailure(status, json));
          }
          return dispatch(getManifestSuccess(status, json));
        }

        return dispatch(getManifestFailure(status, "Server is offline"));
      }, (err) => {
        dispatch(getManifestFailure(status, err));
        console.log('bad MANIFEST request - json', err);
      });
  }
}

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
        list: action.json.rovers
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
