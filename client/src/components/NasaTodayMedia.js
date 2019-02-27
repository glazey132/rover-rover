import React from 'react';

const NasaTodayMedia = props => {
  return (
    <div style={nasaTodayMediaStyle}><object data={props.mediaUrl}
    title="nasa-today" width="560" height="315"></object></div>
  )
}

const nasaTodayMediaStyle = {
  marginBottom: '5px'
}

export default NasaTodayMedia;
