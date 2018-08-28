// TODO: 2018-08-14 isn't being added to pictures

import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import LazyLoad from 'react-lazy-load'
import moment from 'moment'
import { cameraChosen, dayChosen } from "../../redux/actions/userChooses"

const mapStateToProps = (state) => {
  const thisRover = state.userChosen.rover;
  const latestDay = state.rovers[thisRover].max_date;
  const chosenDay = state.userChosen.day;

  return {
    latestDay: latestDay,
    picturesByDay: chosenDay ? state.pictures[thisRover][chosenDay] : state.pictures[thisRover][latestDay],
    allPictures: state.pictures[thisRover],
    days: state.pictures[thisRover]["days"],
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

    this.state = {
      pictures: this.props.picturesByDay,
      dateToDisplay: this.props.latestDay
    }

    this.grabPrevDayFromLatest = this.grabPrevDayFromLatest.bind(this);
    this.grabPrevAvailableDay  = this.grabPrevAvailableDay.bind(this);
  }

  componentWillMount() {
    const { camera, chooseCamera } = this.props;

    if (camera !== undefined) {
      chooseCamera(camera)
    }
  }

  componentWillUpdate(prevProps) {
    const { picturesByDay } = this.props;
    const { pictures }      = this.state;

    if (prevProps.picturesByDay !== picturesByDay) {
      this.setState({
        pictures: pictures.concat(picturesByDay)
      })
    }
  }

  grabPrevDayFromLatest() {
    const { dateToDisplay } = this.state;

    this.grabPrevAvailableDay(dateToDisplay);
  }

  grabPrevAvailableDay(day) {
    const { grabPicturesByDay, days, allPictures } = this.props;
    let prevDay                                    = moment(day).subtract("1", "d").format("YYYY-MM-DD");
    const prevDayHasPictures                       = days.filter(d => allPictures[d] === prevDay)[0] !== []

    console.log("days.filter(d => allPictures[d] === prevDay)[0] !== []", days.filter(d => allPictures[d] === prevDay)[0] !== [])

    if (prevDayHasPictures) {
      this.setState({ dateToDisplay: prevDay }, () => grabPicturesByDay(prevDay));
    } else {
      prevDay = moment(prevDay).subtract("1", "d");
      this.setState({ dateToDisplay: prevDay }, () => this.grabNextAvailableDay(prevDay))
    }
  }

  render() {
    const { pictures } = this.state;

    return (
      <InfiniteScroll
        loadMore={this.grabPrevDayFromLatest}
        hasMore={true}
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
                <LazyLoad height={375} offset={500}>
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