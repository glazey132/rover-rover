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
      !this.props.isGeolocationAvailable
    ? <div><p style={geoNotificationTextStyle}>Your browser does not support Geolocation</p></div>
    : !this.props.isGeolocationEnabled
        ? <div><p style={geoNotificationTextStyle}>Geolocation is not enabled</p></div>
        : this.props.coords
        ? <table>
        <tbody>
          <tr style={coordsSectionStyle}>
            <td style={tableLabelCellStyle}>
              <Badge pill variant="primary">Latitude: </Badge>
            </td>
            <td style={tableLabelCellStyle}>{this.props.coords.latitude}</td>
            <br />
            <td style={tableLabelCellStyle}>
              <Badge pill variant="primary">Longitude: </Badge>
            </td>
            <td style={tableLabelCellStyle}>{this.props.coords.longitude}</td>
            </tr>
          <tr style={geoColumnStyle}><td><LocationImage coords={this.props.coords}/></td></tr>
          <tr><small>This is the most recent photo that Nasa LandSat imagery has of your location</small></tr>
        </tbody>
    </table>
    : <table style={tableSectionStyle}><tbody><tr><td><p style={geoNotificationTextStyle}>Getting the location data&hellip;</p></td></tr></tbody></table>
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
    maxHeight: '100%'
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