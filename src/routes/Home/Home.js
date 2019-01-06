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
    device: state.device ? state.device : "mobile"
  }
}

class Home extends Component {
  render() {
    const { device, backgroundImages, roverSpecificColumn } = this.props;

    return (
      <div>
        <nav className={cx('mdl-grid home-nav', `is-${device}`)}>
          <div className={cx("mdl-cell", `${roverSpecificColumn["curiosity"]}-${device}`)}>
            <Link to='/curiosity'>
              <img src={backgroundImages[device]['curiosity']} alt="View Curiosity's photos"/>
              <h2>Curiosity</h2>
            </Link>
          </div>
          <div className={cx("mdl-cell", `${roverSpecificColumn["opportunity"]}-${device}`)}>
            <Link to='/opportunity'>
              <img src={backgroundImages[device]['opportunity']} alt="View Opportunity's photos"/>
              <h2>Opportunity</h2>
            </Link>
          </div>
          <div className={cx("mdl-cell", `${roverSpecificColumn["spirit"]}-${device}`)}>
            <Link to='/spirit'>
              <img src={backgroundImages[device]['spirit']} alt="View Spirit's photos"/>
              <h2>Spirit</h2>
            </Link>
          </div>
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