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
  lineHeight: '1.2',
  fontSize: 'initial',
  padding: '10px'
}

export default ModalText;
