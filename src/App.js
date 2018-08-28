import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './App.css';
import Home from './routes/Home';
import { calculateScreenSize } from './redux/actions/screenSize';
import Rover from "./routes/Rover"

const mapStateToProps = state => {
  return {
    rovers: state.rovers.list.map(r => r.name),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    detectDevice: () => dispatch(calculateScreenSize())
  }
}

class App extends Component {
  componentDidMount() {
    const { detectDevice } = this.props;

    detectDevice();

    window.addEventListener("resize", () => detectDevice());
  }

  render() {
    const { rovers } = this.props;
    // const homeRoute = (props) => {
    //   return (
    //     <Home {...props} />
    //   )
    // }

    return (
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/" exact />
          {rovers.map((r, i) => {
            return (
              <Route
                key={`rover-route-${i}`}
                path="/:rover"
                component={Rover}
              />
            )
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
