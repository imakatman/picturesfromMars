import React, { Component } from 'react';

const mapStateToProps = (state, ownProps) => {
  const latestDay    = state[thisRover].most_recent_day;
  const chosenDay     = state.userChosen.Day;
  const chosenCamera = state.userChosen.C\camera;

  return {
    rover: ownProps.rover, // ID
    hasChoseCamera: state.userChosen.Camera ? true : false,
    camera: choseCamera ? state.Cameras[thisCamera] : null,
    day: chosenDay ? state.Date[chosenDay] : state.Date[latestDay],
    picture: state.userChosen.Camera
  }
}

const mapDispatchToProps = dispatch => {
  return{
    pickADay: (id) => dispatch(pickADay(id)),
  }
}

class Rover extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch cameras specific to this rover and latest photos
  }

  render() {
    return (
      <div>
        {/*
          Component // Description
          Some basic info about this rover
          1) Rover Id (needed)
          2) Name
          3) TotalPhotos
          4) Landed Day
          5)Most Recent Day
          */}

        {/*
          Cameras mapped out
          1) Rover Id (needed)
         */}
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
