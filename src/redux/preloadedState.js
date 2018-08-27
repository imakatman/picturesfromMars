/**
 * Created by hope.kim on 6/25/18.
 */
import roversData from "./data/rovers.json";
import picturesData from "./data/pictures.json";

const roversState = {};
roversData.map(r => roversState[r.id] = r)
roversState.list = roversData.map(r => {
  return {
    id: r.id,
    name: r.name.toLowerCase()
  }
})

const picturesState = {};
picturesData.map(d => picturesState[d.id] = d);

const daysState = {};
//picturesData.map(d => daysState[d.id] = );

const preloadedState = {
  device: undefined,
  userChosen:{
    rover: undefined,
    camera: undefined,
    day: undefined,
    picture: undefined,
  },
  rovers: roversState,
  pictures: picturesState,
  days: daysState
}

export default preloadedState;
