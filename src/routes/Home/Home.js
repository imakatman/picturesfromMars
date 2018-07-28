import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Rover from '../Rover';

const mapStateToProps = state => {
  return {
    rovers: state.rovers.list.map(r => r.name)
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { match, rovers } = this.props;

    return (
      <div>
        <nav>
          {rovers.map((r, i) => {
            return (
              <NavLink key={`rover-navlink-${i}`} to={`/${r.toLowerCase()}`}>
                {r}
              </NavLink>
            )
          })}
        </nav>
        <Switch>
          {rovers.map((r, i) => {
            return (
              <Route
                key={`rover-route-${i}`}
                path={`${match.url}:rover`}
                render={props => <Rover {...props}/>}
              />
            )
          })}
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home);