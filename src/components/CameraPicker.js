import React , { Component } from 'react';
import '../App.css';
import CAMERA_TYPES from '../assets/camera-types';
import CameraButton from './CameraButton';

//bootstrap components
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class CameraPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameras: null
    }

    if (this.props.rover === 'opportunity') {
      this.state.cameras = CAMERA_TYPES[0]
    } else if (this.props.rover === 'curiosity') {
      this.state.cameras = CAMERA_TYPES[1]
    } else if (this.props.rover === 'spirit') {
      this.state.cameras = CAMERA_TYPES[2]
    }
  }


  render() {
    return (
      <div style={ToolbarStyle}>
        <ButtonToolbar>
          <ButtonGroup style={ButtonGroupStyle}>
            {this.state.cameras.map(camera =>
              <CameraButton key={this.state.cameras.indexOf(camera)} cameraName={camera} />)}
          </ButtonGroup>
        </ButtonToolbar>
      </div>);
  }
}

const ToolbarStyle = {
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '1rem'
}

const ButtonGroupStyle = {
  flexWrap: 'wrap',
  zIndex: 2
}

export default CameraPicker;
