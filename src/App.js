import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Home from './routes/Home';
import Rover from "./routes/Rover"
import errorImage from './error.jpeg';
import { calculateScreenSize } from './redux/ducks/screenSpecs';
import { getManifest } from './redux/ducks/apiManifest';

const mapStateToProps = state => {
  const roversState = state.rovers;

  return {
    rovers: roversState.list ? roversState.list.map(r => r.name) : null,
    get: {
      isGetting: roversState.isGetting,
      success: roversState.getSuccessful,
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

    if (get.success === null) {
      getManifest();
    }
  }

  render() {
    const {get} = this.props;

    if(!get.success && !get.isGetting){
      return(
        <div>
          <h1>There was a problem, please come back later!</h1>
          <br />
          <img src={errorImage} alt="There was a problem, please come back later!" />
        </div>
      )
    } else {
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
