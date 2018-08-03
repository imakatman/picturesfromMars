/**
 * Created by hope.kim on 6/25/18.
 */
import roversData from "./data/rovers.json";
import daysData from "./data/dates.json";

const roversState = {};
roversData.map(r => roversState[r.id] = r)
roversState.list = roversData.map(r => {
  return {
    id: r.id,
    name: r.name.toLowerCase()
  }
})

const daysState = {};
daysData.map(d => daysState[d.id] = d);

const preloadedState = {
  device: undefined,
  userChosen:{
    rover: undefined,
    camera: undefined,
    day: undefined,
    picture: undefined,
  },
  rovers: roversState,
  days: daysState
}

export default preloadedState;
