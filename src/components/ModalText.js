import React from 'react';

const HeaderText = props => {
  return (
    <div>
      <span style={textSectionStyle}>
        <p style={textStyle}>no</p>
      </span>
    </div>
  )
}

const textSectionStyle = {
  borderRadius: '10px',
  color: 'black',
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

export default HeaderText;
