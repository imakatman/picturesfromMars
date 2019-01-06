/**
 * Created by hope.kim on 6/25/18.
 */
const preloadedState = {
  screenSpecs: {
    device: undefined // device is used to determine which images to render
  },
  userChosen:{
    rover: undefined,
    camera: undefined,
    day: undefined,
    picture: undefined,
  },
  rovers: {
    isGetting: null,
    getSuccessful: null,
    status: null,
    list: null
  },
  pictures: {
    isGetting: null,
    getSuccessful: null,
    status: null,
    list: null
  }
}

export default preloadedState;
