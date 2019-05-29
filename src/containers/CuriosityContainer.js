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

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme';

import { requestLatestCuriosityPhotos  } from '../redux/actions/fetch-latest-curiosity-photos';
import { setRover  } from '../redux/actions/set-rover';

class CuriosityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
      submitted: false,
      images: null
    }
    this.props.requestLatestCuriosityPhotos();
    this.props.setRover('curiosity');
  }

  render() {
    return (
      <div style={CuriosityContainerPageStyle} className="overlay">
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
                <CameraPicker rover={"curiosity"} />
                 {this.props.datePhotos ? <ControlledCarousel rover={"curiosity"} photos={this.props.datePhotos}/>
                  : this.props.curiosityCameraPhotos ? <ControlledCarousel rover={"curiosity"} photos={this.props.curiosityCameraPhotos}/>
                 : this.props.latestCuriosityPhotos ? <ControlledCarousel rover={"curiosity"} photos={this.props.latestCuriosityPhotos}/>
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


const CuriosityContainerPageStyle = {
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
  latestCuriosityPhotos: state.latestPhotos.latestCuriosityPhotos,
  curiosityCameraPhotos: state.roverSelections.curiosityCameraPhotos,
  datePhotos: state.dates.datePhotos
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestLatestCuriosityPhotos,
    setRover
  }, dispatch)

const SizedCuriosityContainer = sizeMe({ monitorHeight: true })(CuriosityContainer);
export default connect(mapStateToProps, mapDispatchToProps)(SizedCuriosityContainer);
