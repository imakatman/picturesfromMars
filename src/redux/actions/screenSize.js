// ************
// Actions
// ******************

export const CALCULATED_SCREEN_SIZE = "CALCULATED_SCREEN_SIZE";

// ************
// Action Types
// ******************

export function calculateScreenSize() {
  const mediaQuery = [
    { mobile: window.innerWidth < 768 },
    { tablet: window.innerWidth >= 768 && window.innerWidth < 1024 },
    { desktop: window.innerWidth >= 1024 },
  ]

  const currentDevice = mediaQuery.filter(mq => mq[Object.keys(mq)] === true)[0]

  return {
    type: CALCULATED_SCREEN_SIZE,
    device: Object.keys(currentDevice)[0]
  }
}