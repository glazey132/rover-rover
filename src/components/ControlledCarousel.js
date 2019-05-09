import React, { Component } from 'react';
import { connect } from 'react-redux';

//bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';



class ControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log('this.props cc constructor +> ', this.props)
  }

  componentDidMount() {
    console.log('this.props cc comp did mount +> ', this.props)
  }

  

  render() {
    console.log('this.props cc render +> ', this.props)
    return (
      this.props.photos ? 
      <Carousel style={unsetPositionStyle}>
        {this.props.photos.map(image =>
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
      :
      <Carousel style={unsetPositionStyle}>

      </Carousel>
    )
    
  }
}

const unsetPositionStyle = {
  position: 'unset'
}


const mapStateToProps = state => ({ latestOpportunityPhotos: state.latestOpportunityPhotos })

export default connect(mapStateToProps, null)(ControlledCarousel);
