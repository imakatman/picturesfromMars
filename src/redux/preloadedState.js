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
    list: null,
    inAppData: {
      "5": {
        name: "Curiosity",
        description: "Ancient alien burmuta triangle otherworldly visitors foo fighter Ezekiel, anti-gravity astronaut worm hole mainstream archaelogy star people megoliths, Ezekiel ancient god choral castle SETI."
      },
      "6":{
        name: "Opportunity",
        description: "Helicopter heiroglyph worm hole mystery anti-gravity sanskrit Machu Picchu legendary times, anti-gravity elongated skull golden disk electromagnetic cover up kachina doll, Puma Punku Mayan crystal skull kachina doll Nazca lines."
      },
      "7": {
        description: {
          name: "Spirit",
          description: "Extraterrestrial origin petroglyph Mayan petroglyph sky people, Indian texts targeted mutation vortex Machu Picchu, star people clearly UFO megoliths anti-gravity."
        }
      }
    },
  },
  pictures: {
    isGetting: null,
    getSuccessful: null,
    status: null,
    list: null
  }
}

export default preloadedState;
