import React from 'react';

const NasaTodayText = props => {
  return (
    <div>
      <span style={textSectionStyle}>
        <p style={explanationTextStyle}>{props.explanation}</p>
      </span>
    </div>
  )
}

const textSectionStyle = {
  borderRadius: '10px',
  textAlign: 'left',
  color: 'black',
  backgroundColor: 'white',
  display: 'flex',
  border: '1.5px solid black',
}

const explanationTextStyle = {
  flex: '1',
  lineHeight: '1.2',
  fontSize: 'initial',
  padding: '10px'
}

export default NasaTodayText;
