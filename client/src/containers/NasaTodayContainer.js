import React, { Component } from 'react';
import NasaTodayTitle from '../components/NasaTodayTitle';
import NasaTodayMedia from '../components/NasaTodayMedia';
import NasaTodayText from '../components/NasaTodayText';
import NasaTodayExitButton from '../components/NasaTodayExitButton';
import NasaTodayOpenButton from '../components/NasaTodayOpenButton';

class NasaTodayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDataOpen: true,
    }
  }

  async componentDidMount(){
    const result = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    const json = await result.json();
    console.log('the json ---> ', json);
    this.setState({
      todayDataOpen: true,
      data_date: json.date,
      explanation: json.explanation,
      mediaType: json.media_type,
      title: json.title,
      mediaUrl: json.url
    })
  }

  getDailyNasaStyle = () => {
    return {
      //nasa blue
      backgroundColor: '#0b3d91',
      display: this.state.todayDataOpen ? 'flex' : 'none',
      minHeight: '90vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: '#fff',
      textAlign: 'center',
      padding: '10px',
      width: '95%',
      opacity: '.85',
      zIndex: '9',
      borderRadius: '10px'
    }
  }

  exitTodayData = (e) => {
    e.preventDefault();
    console.log('clicked button')
    this.setState({
      todayDataOpen: !this.state.todayDataOpen
    })
  }

  render() {
    return (
      <div style={this.getDailyNasaStyle()}>
        <header className="container-header">
          <NasaTodayExitButton handleClick={this.exitTodayData}/>
          <NasaTodayTitle title={this.state.title} />
          <NasaTodayMedia mediaUrl={this.state.mediaUrl} />
          <NasaTodayText explanation={this.state.explanation} />
        </header>
      </div>
    );
  }
}

const nasaTodayContainerStyle = {
  backgroundColor: '#0b3d91',
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  width: '95%',
  opacity: '.85',
  zIndex: '9',
  borderRadius: '10px'
}

export default NasaTodayContainer;
