import React from 'react';

const NasaTodayOpenButton = props => {
  return <button style={nasaTodayOpenButtonStyle} onClick={(e) => props.handleClick(e)}><span>Daily Nasa Data</span></button>
}

const nasaTodayOpenButtonStyle = {
  backgroundColor: '#0b3d91',
  borderRadius: '50%',
  display: 'block',
  float: 'right',
  marginRight: '.5vw',
  width: '33vw'
}

export default NasaTodayOpenButton;
