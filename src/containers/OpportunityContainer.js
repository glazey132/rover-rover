//packages
import React, { Component } from 'react';
import '../App.css';

import CameraPicker from '../components/CameraPicker'
import ControlledCarousel from '../components/ControlledCarousel'
import Navigation from '../components/Navigation'
import DateToggleButton from '../components/DateToggleButton';
import DatePickerComponent from '../components/DatePickerComponent';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme';

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
              <Row style={dateRowStyle}>
                <Col>
                  <DateToggleButton screenSize={this.props.size}/>
                  <DatePickerComponent screenSize={this.props.size}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CameraPicker rover={"opportunity"} />
                  {this.props.datePhotos ? <ControlledCarousel rover={"opportunity"} photos={this.props.datePhotos}/>
                    :
                    this.props.opportunityCameraPhotos ? <ControlledCarousel rover={"opportunity"} photos={this.props.opportunityCameraPhotos}/>
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

const dateRowStyle = {
  margin: '1rem 0'
}

const mapStateToProps = state => ({ 
  latestOpportunityPhotos: state.latestPhotos.latestOpportunityPhotos,
  opportunityCameraPhotos: state.roverSelections.opportunityCameraPhotos,
  datePhotos: state.dates.datePhotos
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    requestLatestOpportunityPhotos,
    setRover
  }, dispatch)

const SizedOpportunityContainer = sizeMe({ monitorHeight: true })(OpportunityContainer);
export default connect(mapStateToProps, mapDispatchToProps)(SizedOpportunityContainer);
