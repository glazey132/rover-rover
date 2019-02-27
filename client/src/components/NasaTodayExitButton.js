import React from 'react';

const NasaTodayExitButton = props => {
  return <button style={nasaTodayExitButtonStyle} onClick={(e) => props.handleClick(e)}><span>X</span></button>
}

const nasaTodayExitButtonStyle = {
  backgroundColor: 'pink',
  borderRadius: '50%',
  display: 'block',
  float: 'right',
  marginRight: '.5vw'
}

export default NasaTodayExitButton;
