import React from 'react';
import Image from 'react-bootstrap/Image';

const NasaTodayMedia = props => {
  const { mediaUrl, mediaHdUrl, mediaType } = props;
  const imageWidth = window.innerWidth / 1.5;
  const imageHeight = window.innerHeight / 2;

  if (mediaType === 'image'){
    return (
      <Image style={nasaHdImageStyle} src={mediaHdUrl} fluid/>
    )
  } else {
    return (
      <div style={nasaTodayMediaStyle}><object data={mediaUrl}
      title="nasa-today" width={imageWidth} height={imageHeight}></object></div>
    )
  }
}

const nasaTodayMediaStyle = {
  marginBottom: '5px',
  display: 'flex',
  justifyContent: 'center'
}

const nasaHdImageStyle = {
  height: '50vh'
}

export default NasaTodayMedia;
