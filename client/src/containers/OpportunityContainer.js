//packages
import React, { Component } from 'react';
import '../App.css';

import HeaderText from '../components/HeaderText'
import ControlledCarousel from '../components/ControlledCarousel'

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class OpportunityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
      submitted: false
    }
  }

  render() {
    const { submitted } = this.state;
    return (
      <div style={OpportunityContainerPageStyle} className="overlay">
        <Container fluid={true}>
          <Row>
            <Col><HeaderText text={'Opportunity Rover'}/></Col>
          </Row>
          <Row>
            <Col>
              {submitted ?
                <ControlledCarousel />
                :
                <div>
                  <p>Choose a camera</p>
                </div>}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


const OpportunityContainerPageStyle = {
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

// <CameraMenu rover={'opportunity'}/>

export default OpportunityContainer;
