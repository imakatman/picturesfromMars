// ************
// Actions
// ******************

import { ROVER_CHOSEN } from "./userChooses"

export const CALCULATED_SCREEN_SIZE = "CALCULATED_SCREEN_SIZE";

// ************
// Action Types
// ******************

export function calculateScreenSize() {
  const w          = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const mediaQuery = [
    { mobile: w < 768 },
    { tablet: w >= 768 && w < 1024 },
    { desktop: w >= 1024 },
  ]

  const currentDevice = mediaQuery.filter(mq => mq[Object.keys(mq)] === true)[0]

  return {
    type: CALCULATED_SCREEN_SIZE,
    device: Object.keys(currentDevice)[0]
  }
}

// ************
// Action Types
// ******************

export function screenSpecs(state = {}, action) {
  switch (action.type) {
    case CALCULATED_SCREEN_SIZE:
      return Object.assign({}, state, {
        device: action.device
      });
    default:
      return state;
  }
}
