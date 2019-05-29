import React from 'react';

const ModalText = props => {
  return (
    <div>
      <span style={textSectionStyle}>
        <p style={textStyle}>{props.text}</p>
      </span>
    </div>
  )
}

const textSectionStyle = {
  borderRadius: '10px',
  color: 'black',
  backgroundColor: 'white',
  display: 'flex',
  marginTop: '5px',
  marginBottom: '15px'
}

const textStyle = {
  flex: '1',
  lineHeight: '1.5',
  fontSize: '14px',
  padding: '5px 3px'
}

export default ModalText;
