import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bulma/css/bulma.min.css';
import logo from './logo.svg'
import './App.css';
import Home from './routes/Home';
import { calculateScreenSize } from './redux/actions/screenSize';

const mapDispatchToProps = dispatch => {
  return{
    detectDevice: () => dispatch(calculateScreenSize())
  }
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { detectDevice } = this.props;

    detectDevice();

    window.addEventListener("resize", () => detectDevice());
  }

  render() {
    const homeRoute = (props) => {
      return (
        <Home {...props} />
      )
    }

    return (
      <BrowserRouter>
        <Route render={(props) => homeRoute(props)} />
      </BrowserRouter>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
