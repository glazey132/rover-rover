import React from 'react';
import Button from 'react-bootstrap/Button';

const NasaTodayExitButton = props => {
  return <Button style={nasaTodayExitButtonStyle} onClick={(e) => props.handleClick(e)}>Exit</Button>
}

const nasaTodayExitButtonStyle = {
  float: 'right',
}

export default NasaTodayExitButton;
