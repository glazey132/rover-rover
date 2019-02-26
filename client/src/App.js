import React, { Component } from 'react';
import './App.css';

import NasaTodayContainer from './containers/NasaTodayContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NasaTodayContainer />
        </header>
      </div>
    );
  }
}

export default App;
