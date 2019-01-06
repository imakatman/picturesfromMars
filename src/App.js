import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './redux/store';
import 'bulma/css/bulma.min.css';
import './App.css';
import Home from './routes/Home';
import Rover from "./routes/Rover"
import { calculateScreenSize } from './redux/ducks/screenSpecs';
import { getManifest } from './redux/ducks/apiManifest';

const mapStateToProps = state => {
  const roversState = state.rovers;

  return {
    rovers: roversState.list ? roversState.list.map(r => r.name) : null,
    get: {
      isGetting: roversState.isGetting,
      getSuccessful: roversState.getSuccessful,
      status: roversState.status
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    detectDevice: () => dispatch(calculateScreenSize()),
    getManifest: () => dispatch(getManifest())
  }
}

class App extends Component {
  componentDidMount() {
    const { get, detectDevice, getManifest } = this.props;

    detectDevice();
    window.addEventListener("resize", () => detectDevice());

    if (get.getSuccessful === null) {
      getManifest();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route path="/:rover" component={Rover} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
