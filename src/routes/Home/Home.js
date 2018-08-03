import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import Rover from '../Rover';
import curiosity_retina from './img/retina/curiosity.jpg';
import opportunity_retina from './img/retina/opportunity.jpg';
import spirit_retina from './img/retina/spirit.jpg';
import './Home.css';

const mapStateToProps = state => {
  return {
    rovers: state.rovers.list.map(r => r.name),
    device: state.device ? state.device : "mobile"
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { match, rovers, device, backgroundImages, roverSpecificColumn } = this.props;

    return (
      <div>
        <nav className={cx("columns home-nav", `is-${device}`)}>
          {rovers.map((r, i) => {
            const name = r.toLowerCase();
            return (
              <div key={`rover-navlink-${i}`} className={cx("column", roverSpecificColumn[name])}>
                <Link to={`/${name}`}>
                  <img src={backgroundImages[device][name]} alt={`${name}`} />
                  <h2>{r}</h2>
                </Link>
              </div>
            )
          })}
        </nav>
        <Switch>
          {rovers.map((r, i) => {
            return (
              <Route
                key={`rover-route-${i}`}
                path={`${match.url}:rover`}
                render={props => <Rover {...props} />}
              />
            )
          })}
        </Switch>
      </div>
    )
  }
}

Home.defaultProps = {
  backgroundImages: {
    mobile: {
      curiosity: [curiosity_retina],
      opportunity: [opportunity_retina],
      spirit: [spirit_retina],
    },
    tablet: {
      // @TO-DO: need to change
      curiosity: [curiosity_retina],
      opportunity: [opportunity_retina],
      spirit: [spirit_retina],
    },
    desktop: {
      // @TO-DO: need to change
      curiosity: [curiosity_retina],
      opportunity: [opportunity_retina],
      spirit: [spirit_retina],
    }
  },
  roverSpecificColumn: {
    curiosity: "is-12-mobile",
    opportunity: "is-6-mobile",
    spirit: "is-6-mobile",
  }
}

export default connect(mapStateToProps)(Home);