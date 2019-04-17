import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

import NasaTodayContainer from './containers/NasaTodayContainer';
import Navigation from './components/Navigation';
import NotificationSection from './components/NotificationSection';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayDataOpen: true,
      notifications: null
    }
  }

  async componentDidMount(){
    let notification = null;

    const dateToday = moment().format('YYYY-MM-DD');

    const asteroidResults = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateToday}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    const asteroidJson = await asteroidResults.json();

    const notificationResults = await fetch(`https://api.nasa.gov/DONKI/notifications?type=all&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
    const notificationJson = await notificationResults.json();

    // console.log('the asteroidJson ....=> ', asteroidJson);
    // console.log('the dateee ....=> ', dateToday);

    console.log('the notification json => ',  notificationJson);
    notificationJson.forEach(note => {
      if(note.messageType === 'Report' && notification === null) {
        notification = note;
      }
    })
    this.setState({
      notification: notification
    })
  }

  //exit modal
  exitTodayData = () => {
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
      <div className="overlay">
        {todayDataOpen ?
          <NasaTodayContainer className="App" todayDataOpen={this.state.todayDataOpen} exitTodayData={this.exitTodayData}/>
          :
          <React.Fragment>
            <Navigation />
            <Row>
              <Col style={notificationColumnStyle}>
                <NotificationSection notification={this.state.notification} />
              </Col>
              <Col>
                <h1>Col 2</h1>
              </Col>
            </Row>
          </React.Fragment>
        }
      </div>
    );
  }
}

const notificationColumnStyle = {
  height: '50vh',
  overflow: 'scroll',
  border: '5px solid #282c34'
}
export default App;
