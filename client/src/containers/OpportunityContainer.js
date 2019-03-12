//packages
import React, { Component } from 'react';
import '../App.css';

import HeaderText from '../components/HeaderText'
import ControlledCarousel from '../components/ControlledCarousel'

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// <div style={OpportunityContainerStyle}>
//   <HeaderText text={'Opportunity Rover'}/>
//   <div style={PictureSectionStyle}>pic section</div>
//   <div style={TextSectionStyle}><span>Text section</span></div>
// </div>


class OpportunityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={OpportunityContainerPageStyle} className="overlay">
        <Container fluid={true}>
          <Row>
            <Col><HeaderText text={'Opportunity Rover'}/></Col>
          </Row>
          <Row>
            <Col>
              <ControlledCarousel />
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

export default OpportunityContainer;
