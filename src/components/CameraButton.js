import React, { Component } from 'react';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//bootstrap components
import Button from 'react-bootstrap/Button';

import { setCameraType } from '../redux/actions/set-camera-type';

class CameraButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (camera) => {
    this.props.setCameraType(camera)
  }
  render() {
    console.log('camera button rendered =')
    return (
      <Button value={this.props.cameraName} style={ButtonStyle} size="sm" onClick={() => this.handleClick(this.props.cameraName)}>{this.props.cameraName}</Button>
    )
  }
};

const ButtonStyle = {
  margin: '1px',
  flex: '1'
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setCameraType
  }, dispatch)

export default connect(null, mapDispatchToProps)(CameraButton);
