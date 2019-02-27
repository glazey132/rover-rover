import React from 'react';

const NasaTodayText = props => {
  return (
    <div style={nasaTodayTextStyle}>
      <span style={textSectionStyle}>
        <p style={explanationTextStyle}>{props.explanation}</p>
      </span>
    </div>
  )
}

const nasaTodayTextStyle = {
  //nasa red
  backgroundColor: '#fc3d21',
  color: '#fff',
  borderRadius: '10px'
}

const textSectionStyle = {
  display: 'flex'
}

const explanationTextStyle = {
  flex: '1',
  lineHeight: '1.2',
  fontSize: 'initial',
  padding: '10px'
}

export default NasaTodayText;
