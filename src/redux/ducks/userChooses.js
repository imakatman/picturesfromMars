// ************
// Actions
// ******************

export const ROVER_CHOSEN   = "ROVER_CHOSEN";
export const CAMERA_CHOSEN  = "CAMERA_CHOSEN";
export const DAY_CHOSEN     = "DAY_CHOSEN";
export const PICTURE_CHOSEN = "PICTURE_CHOSEN";

// ************************************************************************
// Action Types
// ************************************************************************

export function roverChosen(rover) {
  return {
    type: ROVER_CHOSEN,
    rover
  }
}

export function cameraChosen(camera) {
  return {
    type: CAMERA_CHOSEN,
    camera
  }
}

export function dayChosen(day) {
  return {
    type: DAY_CHOSEN,
    day
  }
}

export function pictureChosen(picture) {
  return {
    type: PICTURE_CHOSEN,
    picture
  }
}

// ************************************************************************
// Redux Thunks
// ************************************************************************

export function getPictures(rover, update) {
  return (dispatch) => {
    return Promise((res, rej) => {
      fetch(`http://localhost:3000/rover/${rover}?token=c?M3cwHGsvqP@JES${`&update`}`)
        .then(resp => {
          if (resp === null) {
            return;
          }
        })
    })
  }
}

// ************************************************************************
// Reducer
// ************************************************************************

export function userChosen(state = {}, action) {
  switch (action.type) {
    case ROVER_CHOSEN:
      return Object.assign({}, state, {
        rover: action.rover
      });
    case CAMERA_CHOSEN:
      return Object.assign({}, state, {
        camera: action.camera
      });
    case DAY_CHOSEN:
      return Object.assign({}, state, {
        day: action.day
      });
    case PICTURE_CHOSEN:
      return Object.assign({}, state, {
        picture: action.picture
      });
    default:
      return state;
  }
}
