import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import curiosity_mobile from './img/retina/mobile/curiosity.jpg';
import opportunity_mobile from './img/retina/mobile/opportunity.jpg';
import spirit_mobile from './img/retina/mobile/spirit.jpg';
import curiosity_tablet from './img/retina/tablet/curiosity.jpg';
import opportunity_tablet from './img/retina/tablet/opportunity.jpg';
import spirit_tablet from './img/retina/tablet/spirit.jpg';
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
    const { rovers, device, backgroundImages, roverSpecificColumn } = this.props;

    return (
      <div>
        <nav className={cx("columns home-nav", `is-${device}`)}>
          {rovers.map((r, i) => {
            const name = r.toLowerCase();
            return (
              <div key={`rover-navlink-${i}`} className={cx("column", `${roverSpecificColumn[name]}-${device}`)}>
                <Link to={`/${name}`}>
                  <img src={backgroundImages[device][name]} alt={`${name}`} />
                  <h2>{r}</h2>
                </Link>
              </div>
            )
          })}
        </nav>
      </div>
    )
  }
}

Home.defaultProps = {
  backgroundImages: {
    mobile: {
      curiosity: [curiosity_mobile],
      opportunity: [opportunity_mobile],
      spirit: [spirit_mobile],
    },
    tablet: {
      // @TO-DO: need to change
      curiosity: [curiosity_tablet],
      opportunity: [opportunity_tablet],
      spirit: [spirit_tablet],
    },
    desktop: {
      // @TO-DO: need to change
      curiosity: [curiosity_mobile],
      opportunity: [opportunity_mobile],
      spirit: [spirit_mobile],
    }
  },
  roverSpecificColumn: {
    curiosity: "is-12",
    opportunity: "is-6",
    spirit: "is-6",
  }
}

export default connect(mapStateToProps)(Home);