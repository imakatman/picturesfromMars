import React, { Component } from 'react';
import { connect } from 'react-redux';
import Description from '../../components/Description';
import Gallery from '../../components/Gallery';
import { roverChosen } from "../../redux/ducks/userChooses";
import { getPictures } from "../../redux/ducks/apiPictures";
import errorImage from '../../error.jpeg';

const mapStateToProps = (state, ownProps) => {
  const roverParam    = ownProps.match.params.rover;
  const thisRoverNameCapitalized = roverParam.charAt(0).toUpperCase() + roverParam.slice(1);
  const roversState   = state.rovers;

  let thisRoverId, thisRoverIndex;

  if (!roversState.isGetting && roversState.getSuccessful) {
    thisRoverId = String(roversState.list.filter((r, i) => thisRoverNameCapitalized === r.name)[0].id);
    thisRoverIndex    = roversState.list.findIndex(r => r.id == thisRoverId);
    console.log(thisRoverId, thisRoverIndex)
  }

  return {
    rover: {
      name: thisRoverNameCapitalized,
      index: thisRoverIndex,
      param: roverParam,
      id: String(thisRoverId)
    },
    cameras: thisRoverIndex ? roversState.list[thisRoverIndex].cameras : null,
    getManifest: {
      isGetting: roversState.isGetting,
      success: roversState.getSuccessful,
      status: roversState.status
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseRover: (id) => dispatch(roverChosen(id)),
    getPictures: (rover) => dispatch(getPictures(rover))
  }
}

class Rover extends Component {
  componentWillUpdate(prevProps) {
    const { getManifest, rover, chooseRover, getPictures } = this.props;

    if (prevProps.getManifest.success && prevProps.getManifest.isGetting !== getManifest.isGetting) {
      chooseRover(rover.param);
      getPictures(rover.param);
    }
  }

  render() {
    const { rover, getManifest } = this.props;

    console.log(rover)

    if (rover.index !== undefined && rover.id !== undefined) {
      return (
        <div>
          <Description index={rover.index} id={rover.id} />
          {/*<ul>*/}
          {/*{cameras.map(c => {*/}
          {/*return (*/}
          {/*<li key={`${rover}-camera-li-${c.name}`}>*/}
          {/*<NavLink to={{*/}
          {/*pathname: `${match.url}/${c.name.toLowerCase()}`,*/}
          {/*state:{*/}
          {/*chosenCamera: c.name*/}
          {/*}*/}
          {/*}}>*/}
          {/*{c.full_name}*/}
          {/*</NavLink>*/}
          {/*</li>*/}
          {/*)*/}
          {/*})}*/}
          {/*</ul>*/}
          <Gallery rover={rover} />
        </div>
      )
    } else if (getManifest.isGetting) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>There was a problem! Please come back later.</h1>
          <img src={errorImage} alt="There was a problem, please come back later!" />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);