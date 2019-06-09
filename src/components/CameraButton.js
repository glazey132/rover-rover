import React, { Component } from 'react';
import moment from 'moment';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//bootstrap components
import Button from 'react-bootstrap/Button';

import { setCuriosityCameraType } from '../redux/actions/set-curiosity-camera-type';
import { setOpportunityCameraType } from '../redux/actions/set-opportunity-camera-type';
import { setSpiritCameraType } from '../redux/actions/set-spirit-camera-type';

class CameraButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (camera, roverFullName) => {
    // right now we need to pass in the date from our redux store to this call because we want to keep filtering of photos by camera.
    // will optimize in future by caching the photos and filtering from that cache.
    if (roverFullName === 'curiosity') { 
      this.props.setCuriosityCameraType(camera, this.props.date);
    } else if (roverFullName === 'opportunity') {
      this.props.setOpportunityCameraType(camera, this.props.date);
    } else if (roverFullName === 'spirit') {
      this.props.setSpiritCameraType(camera, this.props.date);
    }
  }
  render() {
    const { camera } = this.props;
    return (
      camera === this.props.cameraName ?
      <Button active value={this.props.cameraName} style={ButtonStyle} size="sm" onClick={() => this.handleClick(this.props.cameraName, this.props.roverFullName)}>{this.props.cameraName}</Button>
      :
      <Button value={this.props.cameraName} style={ButtonStyle} size="sm" onClick={() => this.handleClick(this.props.cameraName, this.props.roverFullName)}>{this.props.cameraName}</Button>
    )
  }
};

const ButtonStyle = {
  margin: '1px',
  flex: '1'
}

const mapStateToProps = state => ({ 
  camera: state.roverSelections.camera,
  roverFullName: state.roverSelections.roverFullName,
  date: state.dates.date ||  moment().subtract(1, 'day').format('YYYY-MM-DD'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setCuriosityCameraType,
    setOpportunityCameraType,
    setSpiritCameraType
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CameraButton);
