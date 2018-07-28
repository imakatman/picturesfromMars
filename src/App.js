import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import { Route} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css';
import Home from './routes/Home';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Fetch basic data about each rover: 1) name, number of photos, latest day taken photo

  }

  render() {
    const homeRoute = (props) => {
      return(
        <Home {...props}/>
      )
    }

    return (
      <BrowserRouter>
        <Route render={(props) => homeRoute(props)} />
      </BrowserRouter>
    );
  }
}

export default App;
