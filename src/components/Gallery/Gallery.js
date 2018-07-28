import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { cameraChosen } from "../../redux/actions/userChooses";

const mapStateToProps = (state, ownProps) => {
  const chosenCamera = ownProps.match.params.camera;

  console.log(chosenCamera)

  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    pickACamera: (id) => dispatch(cameraChosen(id)),
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch cameras specific to this rover and latest photos
  }

  render() {
    const { match } = this.props;

    console.log(match)

    return (
      <div>
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