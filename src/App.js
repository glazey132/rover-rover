import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

import NasaTodayContainer from './containers/NasaTodayContainer';
import Navigation from './components/Navigation';
import NotificationSection from './components/NotificationSection';
import GeoSection from './components/GeoSection';
import CMESection from './components/CMESection';

import Container from 'react-bootstrap/Container';
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

    //console.log('the notification json => ',  notificationJson);
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
          <Container fluid>
            <Navigation />
            <Row>
              <Col xs={12}  sm={12} lg={6} style={notificationColumnStyle}>
                <NotificationSection notification={this.state.notification} />
              </Col>
              <Col xs={12} sm={12} lg={6} style={geoColumnStyle}>
                <GeoSection></GeoSection>
              </Col>
            </Row>
            <Row style={bottomRowStyle} noGutters={true}><Col xs={12} style={bottomColumnStyle}><CMESection /></Col></Row>
          </Container>
        }
      </div>
    );
  }
}

const notificationColumnStyle = {
  height: '50vh',
  maxHeight: '50vh',
  overflow: 'scroll',
  borderRadius: '10px',
  margin: '5px',
  flex: '1',
  background: '#e9ecef',
  padding: '2em',
  maxWidth: '95%'
}

const geoColumnStyle = {
  height: '50vh',
  maxHeight: '50vh',
  margin: '5px',
  borderRadius: '10px',
  color: 'black',
  border: '1.5px solid black',
  background: 'white',
  overflow: 'scroll',
  maxWidth: '95%',
  textAlign: 'center'
}

const bottomRowStyle = {
  height: '50vh',
  maxHeight: '50vh',
  margin: '10px -10px',
  marginBottom: '20px'
}

const bottomColumnStyle = {
  overflow: 'scroll',
  height: '50vh',
  maxHeight: '50vh',
  background: '#e9ecef',
  marginTop: '5px',
  borderRadius: '10px'
}

export default App;
