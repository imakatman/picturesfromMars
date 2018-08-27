import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import LazyLoad from 'react-lazy-load'
import moment from 'moment'
import { cameraChosen, dayChosen } from "../../redux/actions/userChooses"

const mapStateToProps = (state, ownProps) => {
  const thisRover = state.userChosen.rover;
  const latestDay = state.rovers[thisRover].max_date;
  //const choseADay    = state.userChosen.day ? true : false;
  const thisDay      = state.userChosen.day;

  // let pictures = [];

  // if (choseADay) {
  //   if (choseACamera) {
  //     pictures = state.days[thisRover][thisDay].filter(p => chosenCamera ===
  // p[Object.keys(p)].camera.name.toUpperCase()); } else { pictures = state.days[thisRover][thisDay]; } } else { if
  // (choseACamera) { pictures = state.days[thisRover][latestDay].filter(p => chosenCamera ===
  // p[Object.keys(p)].camera.name.toUpperCase()); } else { pictures = state.days[thisRover][latestDay]; } }

  let pictures = state.pictures[thisRover][latestDay]

  return {
    // day: choseADay ? thisDay : latestDay,
    currentDay: thisDay,
    dataAvailable: state.pictures[thisRover][thisDay] !== [],
    pictures: pictures,
    chosenPicture: state.userChosen.picture
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseCamera: (id) => dispatch(cameraChosen(id)),
    grabPicturesByDay: (date) => dispatch(dayChosen(date))
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.grabNextAvailableDay = this.grabNextAvailableDay.bind(this)
  }

  componentWillMount() {
    const { camera, chooseCamera } = this.props;

    if (camera !== undefined) {
      chooseCamera(camera)
    }
  }

  grabNextAvailableDay(day){
    console.log("grabNextAvailableDay")

    const {grabPicturesByDay, pictures} = this.props;
    let nextPreviousDay = moment(day).subtract("1", "d");

    if(pictures.nextPreviousDay !== []){
      grabPicturesByDay(nextPreviousDay)
    } else {
      nextPreviousDay = moment(nextPreviousDay).subtract("1", "d");
      this.grabNextAvailableDay(nextPreviousDay)
    }
  }

  render() {
    const { latestDay, pictures } = this.props;

    return (
      <InfiniteScroll
        loadMore={this.grabNextAvailableDay(latestDay)}
        loader={<div>Loading...</div>}
      >
        <ul className={"columns"}>
          {pictures.map(p => {
            const key  = Object.keys(p);
            const data = p[key];

            const cameraFull   = data.camera.full_name;
            const cameraAbbrev = data.camera.name;
            const earthDate    = data.earth_date;
            const sol          = data.sol;
            const id           = data.id;

            return (
              <li key={data.id} className="column is-3-desktop" style={{ height: 480 }}>
                <LazyLoad height={375}>
                  <a href={data.img_src}>
                    <img src={data.img_src} alt={`Picture taken by ${cameraAbbrev} on ${earthDate}`} />
                  </a>
                </LazyLoad>
                <p>{cameraFull} / {cameraAbbrev}</p>
                <p>{earthDate} / {sol}</p>
                <a href={data.img_src} download={`${cameraAbbrev}_${earthDate}_${id}`}>Download</a>
              </li>
            )
          })}
        </ul>
        {/*
          Component: (Modal)
          Modal of photo selected
          1) Picture Id (needed)
         */}
      </InfiniteScroll>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);