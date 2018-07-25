import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const id              = ownProps.rover;
  const thisRoversState = state.rovers[id];

  return {
    id: id,
    name: thisRoversState.name,
    totalPhotos: thisRoversState.total_photos,
    landedDay: thisRoversState.landing_date,
    mostRecentDay: thisRoversState.max_date
  }
}

function Description(props) {
  // const {}

  return (
    <div>
      <h1>{props.name}</h1>
      <ul>
        <li><strong>Total Photos:</strong> {props.totalPhotos}</li>
        <li><strong>Day that {props.name} Landed:</strong> {props.landedDay}</li>
        <li><strong>Most Recent Day Photos Were Taken:</strong> {props.mostRecentDay}</li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps)(Description);