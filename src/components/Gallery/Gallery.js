import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import LazyLoad from 'react-lazy-load';
import { cameraChosen } from "../../redux/actions/userChooses";

const mapStateToProps = (state, ownProps) => {
  const thisRover    = state.userChosen.rover;
  const choseACamera = state.userChosen.camera ? true : false;
  const thisCamera   = ownProps.match.params.camera;
  const latestDay    = state.rovers[thisRover].max_date;
  const choseADay    = state.userChosen.day ? true : false;
  const thisDay      = state.userChosen.day;

  return {
    camera: thisCamera,
    hasChoseCamera: choseACamera ? true : false,
    day: choseADay ? thisDay : latestDay,
    pictures: choseADay ? state.days[thisRover][thisDay] : state.days[thisRover][latestDay],
    chosenPicture: state.userChosen.picture
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseCamera: (id) => dispatch(cameraChosen(id))
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { camera, chooseCamera } = this.props;

    chooseCamera(camera)
  }

  componentDidUpdate(prevProps) {
    const { camera, chooseCamera } = this.props;

    if (prevProps.camera !== camera) {
      chooseCamera(camera)
    }
  }

  render() {
    const { day, pictures } = this.props;

    console.log(pictures)

    return (
      <div>
        {/*<Masonry*/}
          {/*options={{ transitionDuration: 0 }}*/}
          {/*className="camera-gallery"*/}
          {/*elementType="ul">*/}
          <ul className={"columns"}>
          {pictures.map(p => {
            const key = Object.keys(p)
            return (
              <li key={p.id} className="column is-3-desktop" style={{height:480}}>
                <LazyLoad height={480}>
                  <div style={{backgroundImage:`url(${p[key].img_src})`,height:480}}/>
                  {/*<img src={p[key].img_src} alt={`Picture taken by ${p[key].camera.name} on ${p.eart_date}`} />*/}
                </LazyLoad>
              </li>
            )
          })}
          </ul>
        {/*</Masonry>*/}
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