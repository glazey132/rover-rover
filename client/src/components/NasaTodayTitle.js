import React from 'react';

const NasaTodayTitle = props => {
  return <h3 style={titleTextStyle}>{props.title}</h3>;
}

const titleTextStyle = {
  textDecoration: 'underline'
}

export default NasaTodayTitle;
