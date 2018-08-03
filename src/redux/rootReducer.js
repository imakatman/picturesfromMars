import {
  ROVER_CHOSEN,
  CAMERA_CHOSEN,
  DAY_CHOSEN,
  PICTURE_CHOSEN
} from './actions/userChooses';
import {CALCULATED_SCREEN_SIZE} from "./actions/screenSize";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case CALCULATED_SCREEN_SIZE:
      return Object.assign({}, state, {
        ...state,
        device: action.device
      });
    case ROVER_CHOSEN:
      return Object.assign({}, state, {
        ...state,
        userChosen: {
          ...state.userChosen,
          rover: action.rover
        }
      });
    case CAMERA_CHOSEN:
      return Object.assign({}, state, {
        ...state,
        userChosen: {
          ...state.userChosen,
          camera: action.camera
        }
      });
    case DAY_CHOSEN:
      return Object.assign({}, state, {
        ...state,
        userChosen: {
          ...state.userChosen,
          day: action.day
        }
      });
    case PICTURE_CHOSEN:
      return Object.assign({}, state, {
        ...state,
        userChosen: {
          ...state.userChosen,
          picture: action.picture
        }
      });
    default:
      return state;
  }
}
