 import React, { Component } from 'react';

import {geolocated} from 'react-geolocated';

import LocationImage from './LocationImage';

import Badge from 'react-bootstrap/Badge';


class GeoSection extends Component {
  constructor(props) {
    super(props)
  }

  //* I am keeping this as a class component so that I can add a show world map button / world map at a later time *//
  render() {
    return (
            <div style={geoColumnStyle}><LocationImage coords={this.props.coords}/></div>
    )
  }
    
}

const geoNotificationTextStyle = {
  color: '#0066b4'
}
const coordsSectionStyle = {
    display: 'inline-flex',
    margin: '5px'
}

const geoColumnStyle = {
    display: 'inline-flex',
    maxHeight: '100%',
    height: '100%'
  }

const tableSectionStyle = {
  width: '100%',
  height: '100%',
  margin: '0'
}

const tableLabelCellStyle = {
    borderBottom: 'dashed',
    margin: '0 auto',
    padding: '0'
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(GeoSection);