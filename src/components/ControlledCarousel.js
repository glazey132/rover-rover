import React, { Component } from 'react';
import logo from '../logo.svg'

//bootstrap
import Carousel from 'react-bootstrap/Carousel';

class ControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Carousel style={unsetPositionStyle}>
        <Carousel.Item style={unsetPositionStyle}>
          <img
            className="d-block w-100"
            src={logo}
            alt="First slide"
          />
          <Carousel.Caption style={unsetPositionStyle}>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={unsetPositionStyle}>
          <img
            className="d-block w-100"
            src={logo}
            alt="Second slide"
          />

          <Carousel.Caption style={unsetPositionStyle}>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={unsetPositionStyle}>
          <img
            className="d-block w-100"
            src={logo}
            alt="Third slide"
          />

          <Carousel.Caption style={unsetPositionStyle}>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}

const unsetPositionStyle = {
  position: 'unset'
}
export default ControlledCarousel;
