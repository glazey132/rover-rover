import React, { Component } from 'react';

import './App.css';

import NasaTodayContainer from './containers/NasaTodayContainer';
import Navigation from './components/Navigation';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayDataOpen: true,
    }
  }

  //exit modal
  exitTodayData = () => {
    console.log('clicked button')
    this.setState({
      todayDataOpen: !this.state.todayDataOpen
    })
  }

  openTodayData = () => {
    this.setState({
      todayDataOpen: !this.state.todayDataOpen
    })
  }

  render() {
    const { todayDataOpen } = this.state;
    return (
      <div className="App overlay">
        {todayDataOpen ?
          <NasaTodayContainer todayDataOpen={this.state.todayDataOpen} exitTodayData={this.exitTodayData}/>
          :
          <Navigation />}
      </div>
    );
  }
}

export default App;
