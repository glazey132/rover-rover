//packages
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import HeaderText from '../components/HeaderText'
import CameraPicker from '../components/CameraPicker'
import ControlledCarousel from '../components/ControlledCarousel'
import Navigation from '../components/Navigation'
import DatePickerComponent from '../components/DatePickerComponent';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestLatestOpportunityPhotos  } from '../redux/actions/fetch-latest-opportunity-photos';
import { setRover  } from '../redux/actions/set-rover';

class OpportunityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
      submitted: false
    }
    this.props.requestLatestOpportunityPhotos();
    this.props.setRover('opportunity');
  }

  render() {
    return (
      <div style={OpportunityContainerPageStyle} className="overlay">
        <Container fluid={true}>
          <Row>
            <Navigation />
          </Row>
            <React.Fragment>
              <Row style={rowStyle}>
                <Col>
                  <h5>Choose a camera and date for: <Badge variant="secondary">Opportunity</Badge></h5>
                  <DatePickerComponent />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CameraPicker rover={"opportunity"} />
                  {this.props.opportunityCameraPhotos ? <ControlledCarousel rover={"curiosity"} photos={this.props.opportunityCameraPhotos}/>
                    :
                    this.props.latestOpportunityPhotos ? <ControlledCarousel rover={"opportunity"} photos={this.props.latestOpportunityPhotos}/>
                    :
                   <span><h4>loading...</h4></span>}
                  
                </Col>
              </Row>
            </React.Fragment>
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

const rowStyle = {
  display: 'inline-flex'
}

const mapStateToProps = state => ({ 
  latestOpportunityPhotos: state.latestPhotos.latestOpportunityPhotos,
  opportunityCameraPhotos: state.roverSelections.opportunityCameraPhotos })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    requestLatestOpportunityPhotos,
    setRover
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityContainer);
