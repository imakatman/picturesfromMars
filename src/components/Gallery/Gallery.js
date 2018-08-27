import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { cameraChosen, dayChosen } from "../../redux/actions/userChooses";

const mapStateToProps = (state, ownProps) => {
  const thisRover    = state.userChosen.rover;
  const choseACamera = state.userChosen.camera ? true : false;
  const thisCamera   = state.userChosen.camera;
  const latestDay    = state.rovers[thisRover].max_date;
  const choseADay    = state.userChosen.day ? true : false;
  const thisDay      = state.userChosen.day;

  let pictures = [];

  if(choseADay){
    if(choseACamera){
      pictures = state.days[thisRover][thisDay].filter(p => p.camera.name.toUpperCase());
    } else {
      pictures = state.days[thisRover][thisDay];
    }
  } else {
    if(choseACamera){
      pictures = state.days[thisRover][latestDay].filter(p => p.camera.name.toUpperCase());
    } else {
      pictures = state.days[thisRover][latestDay];
    }
  }

  return {
    camera: thisCamera,
    hasChoseCamera: choseACamera ? true : false,
    day: choseADay ? thisDay : latestDay,
    pictures: pictures,
    chosenPicture: state.userChosen.picture
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseCamera: (id) => dispatch(cameraChosen(id)),
    grabNextDay: (date) => dispatch(dayChosen(date))
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { camera, chooseCamera } = this.props;

    if(camera !== undefined){
      chooseCamera(camera)
    }
  }

  componentDidUpdate(prevProps) {
    const { camera, chooseCamera } = this.props;

    if (prevProps.camera !== camera) {
      console.log("previous prop for camera do not match current prop for camera")
      chooseCamera(camera)
    }
  }

  render() {
    const { day, pictures } = this.props;

    return (
      <div>
          <ul className={"columns"}>
          {pictures.map(p => {
            const key = Object.keys(p);
            const data = p[key];
            return (
              <li key={data.id} className="column is-3-desktop" style={{height:480}}>
                <LazyLoad height={480}>
                  {/*<div style={{backgroundImage:`url(${p[key].img_src})`,height:480}}/>*/}
                  <img src={data.img_src} alt={`Picture taken by ${data.camera.name} on ${data.earth_date}`} />
                </LazyLoad>
              </li>
            )
          })}
          </ul>
        {/*
          Photos from latest day mapped out (Component)
          Camera chosen or not chosen? (Needed) bool
          If Chosen...
          1) Rover Id (needed)
          2) Camera Id (needed)
          3) Day Id (needed)
          Else ...
          1) Rover Id (needed)
          2) Day Id (needed)
         */}
        {/*
          Button to view next day or previous day
          pickADay(id)
        */}
        {/*
          Calender to view photos from a specific day
          pickADay(id)
        */}
        {/*
          Component: (Modal)
          Modal of photo selected
          1) Picture Id (needed)
         */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);