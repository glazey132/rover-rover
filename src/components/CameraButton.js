import React, { Component } from 'react';

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
    if (roverFullName === 'curiosity') { 
      this.props.setCuriosityCameraType(camera);
    } else if (roverFullName === 'opportunity') {
      this.props.setOpportunityCameraType(camera);
    } else if (roverFullName === 'spirit') {
      this.props.setSpiritCameraType(camera);
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
  roverFullName: state.roverSelections.roverFullName 
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setCuriosityCameraType,
    setOpportunityCameraType,
    setSpiritCameraType
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CameraButton);
