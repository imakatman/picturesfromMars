import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './routes/Home';

class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    // Fetch basic data about each rover: 1) name, number of photos, latest day taken photo

  }

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
