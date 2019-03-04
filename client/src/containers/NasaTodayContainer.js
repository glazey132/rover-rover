//packages
import React, { Component } from 'react';
//app components
import NasaTodayModal from '../components/NasaTodayModal';


class NasaTodayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
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
      title: json.title,
      mediaUrl: json.url,
      mediaHdUrl: json.hdurl,
      mediaType: json.media_type,
      ready: true
    })
  }

  render() {
    console.log('this.state --> ', this.state);
    const { ready } = this.state;
    const { todayDataOpen, exitTodayData } = this.props;
    return (
      <div>
      {ready ?
        <NasaTodayModal
        title={this.state.title}
        mediaUrl={this.state.mediaUrl}
        mediaHdUrl={this.state.mediaHdUrl}
        mediaType={this.state.mediaType}
        explanation={this.state.explanation}
        todayDataOpen={todayDataOpen}
        exitTodayData={exitTodayData}/>
        : <p>loading...</p>}
      </div>
    )
  }
}

export default NasaTodayContainer;
