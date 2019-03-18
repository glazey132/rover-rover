import React from 'react';

//bootstrap components
import Button from 'react-bootstrap/Button';

const CameraButton = props => {
  return (
    <Button style={ButtonStyle}>{props.cameraName}</Button>
  )
};

const ButtonStyle = {
  margin: '1px',
  flex: '1'
}


export default CameraButton;
