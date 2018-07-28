// ************
// Actions
// ******************

export const ROVER_CHOSEN   = "ROVER_CHOSEN";
export const CAMERA_CHOSEN  = "CAMERA_CHOSEN";
export const DAY_CHOSEN     = "DAY_CHOSEN";
export const PICTURE_CHOSEN = "PICTURE_CHOSEN";

// ************
// Action Types
// ******************

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