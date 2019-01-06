import React, { Component } from 'react';
import { connect } from 'react-redux';
import Description from '../../components/Description';
import Gallery from '../../components/Gallery';
import { roverChosen } from "../../redux/ducks/userChooses";

const mapStateToProps = (state, ownProps) => {
  const thisRoverName = ownProps.match.params.rover;
  const thisRover     = state.rovers.list.filter(r => thisRoverName === r.name)[0].id;

  return {
    rover: thisRover, // ID
    cameras: state.rovers[thisRover].cameras
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseRover: (id) => dispatch(roverChosen(id))
  }
}

class Rover extends Component {
  componentWillMount() {
    const { rover, chooseRover } = this.props;

    chooseRover(rover)
  }

  render() {
    const { rover } = this.props;

    return (
      <div>
        <Description rover={rover} />
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
        <Gallery />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);