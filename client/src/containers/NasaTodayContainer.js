import React, { Component } from 'react';

class NasaTodayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount(){
    const result = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    const json = await result.json();
    console.log('the json ---> ', json);
    this.setState({
      data_date: json.date,
      explanation: json.explanation,
      mediaType: json.media_type,
      title: json.title,
      imageUrl: json.url
    })
  }
  render() {
    return (
      <div style={nasaTodayContainerStyle}>
        <header className="container-header">
          <h4>{this.state.title}</h4>
          <object data={this.state.imageUrl}
          title="nasa-today" width="560" height="315"></object>
          <p>{this.state.explanation}</p>
        </header>
      </div>
    );
  }
}

const nasaTodayContainerStyle = {
  backgroundColor: '#384639',
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
}

export default NasaTodayContainer;
