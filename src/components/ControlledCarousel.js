import React, { Component } from 'react';

//bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

class ControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Carousel style={unsetPositionStyle}>
        {this.props.images.map(image =>
          <Carousel.Item key={image.id} style={unsetPositionStyle}>
          <Image src={image.img_src} thumbnail />
            <Carousel.Caption style={unsetPositionStyle}>
              <h4>{image.earth_date}</h4>
              <h5>{image.camera.name}</h5>
              <h6>{image.camera.full_name}</h6>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    )
  }
}

const unsetPositionStyle = {
  position: 'unset'
}
export default ControlledCarousel;
