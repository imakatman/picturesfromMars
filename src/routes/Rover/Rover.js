import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import Description from '../../components/Description';
import Gallery from '../../components/Gallery';
import { roverChosen } from "../../redux/actions/userChooses";

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
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { rover, chooseRover } = this.props;

    chooseRover(rover)
  }

  render() {
    const { match, rover, cameras } = this.props;

    return (
      <div>
        <Description rover={rover} />
        <ul>
          {cameras.map(c => {
            return (
              <li key={`${rover}-camera-li-${c.name}`}>
                <NavLink to={`${match.url}/${c.name.toLowerCase()}`}>
                  {c.full_name}
                </NavLink>
              </li>
            )
          })}
        </ul>
        {rover &&
        <Route path={`${match.url}/:camera`} render={props => <Gallery {...props}/>}/>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);