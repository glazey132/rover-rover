//packages
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import CameraPicker from '../components/CameraPicker'
import ControlledCarousel from '../components/ControlledCarousel'
import Navigation from '../components/Navigation'

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


class SpiritContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
      submitted: false
    }
  }

  async componentDidMount() {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=10&camera=fhaz&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
    this.setState({
      images: response.data.photos,
      ready: true
    })
    console.log('the json -> ', response);
  }

  render() {
    return (
      <div style={SpiritContainerPageStyle} className="overlay">
        <Container fluid={true}>
          <Row>
            <Navigation />
          </Row>
          {this.state.ready ?
            <Row>
              <Col>
                <h1>Choose a camera for: <Badge variant="secondary">Spirit</Badge></h1>
                <CameraPicker rover={"spirit"} />
                <ControlledCarousel images={this.state.images}/>
              </Col>
            </Row>
            :
            <h4>loading...</h4>
          }
        </Container>
      </div>
    )
  }
}


const SpiritContainerPageStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    border: '1px solid teal'
}


const PictureSectionStyle = {
  border: '1px solid red',
  width: '50%',
  height: '50%'
}

const TextSectionStyle = {
  border: '1px solid blue',
  width: '50%',
  height: '20%',
  marginTop: ''
}

export default SpiritContainer;
