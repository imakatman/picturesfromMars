import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink} from 'react-router-dom';
import Description from '../../components/Description';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)

  const thisRoverName = ownProps.match.path.replace(new RegExp("/"), "");
  const thisRover     = state.rovers.list.filter(r => thisRoverName === r.name)[0].id;

  const latestDay = state.rovers[thisRover].max_date;

  const choseADay = state.userChosen.day ? true : false;
  const thisDay   = state.userChosen.day;

  const choseACamera = state.userChosen.camera ? true : false;
  const thisCamera   = state.userChosen.camera;

  console.log(state.rovers)

  return {
    rover: thisRover, // ID
    cameras: state.rovers[thisRover].cameras,
    hasChoseCamera: choseACamera ? true : false,
    camera: choseACamera ? state.rovers[thisRover].cameras.filter(c => c.id === thisCamera) : null,
    day: choseADay ? state.days[thisRover][thisDay] : state.days[thisRover][latestDay],
    picture: state.userChosen.picture
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // pickADay: (id) => dispatch(pickADay(id)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Rover);