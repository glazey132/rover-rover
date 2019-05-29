//packages
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import CameraPicker from '../components/CameraPicker';
import ControlledCarousel from '../components/ControlledCarousel';
import Navigation from '../components/Navigation';
import DateToggleButton from '../components/DateToggleButton';
import DatePickerComponent from '../components/DatePickerComponent';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme';

import { requestLatestSpiritPhotos  } from '../redux/actions/fetch-latest-spirit-photos';
import { setRover  } from '../redux/actions/set-rover';


class SpiritContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: null,
      submitted: false
    }
    this.props.requestLatestSpiritPhotos();
    this.props.setRover('spirit');
  }

  render() {
    return (
      <div style={SpiritContainerPageStyle} className="overlay">
        <Container fluid={true}>
          <Row>
            <Navigation />
          </Row>
          <React.Fragment>

          </React.Fragment>
            <Row style={dateRowStyle}>
              <Col>
                <DateToggleButton screenSize={this.props.size}/>
                <DatePickerComponent screenSize={this.props.size}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <CameraPicker rover={"spirit"} />
                {this.props.datePhotos ? <ControlledCarousel rover={"spirit"} photos={this.props.datePhotos}/>
                  :
                  this.props.spiritCameraPhotos ? <ControlledCarousel rover={"spirit"} photos={this.props.spiritCameraPhotos}/>
                  :
                  this.props.latestSpiritPhotos ?  <ControlledCarousel rover={"spirit"} photos={this.props.latestSpiritPhotos}/>
                :
                  <span><h4>loading...</h4></span>}
              </Col>
            </Row>
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

const dateRowStyle = {
  margin: '1rem 0'
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

const mapStateToProps = state => ({ 
  latestSpiritPhotos: state.latestPhotos.latestSpiritPhotos,
  datePhotos: state.dates.datePhotos
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestLatestSpiritPhotos,
    setRover
  }, dispatch)

const SizedSpiritContainer = sizeMe({ monitorHeight: true })(SpiritContainer)
export default connect(mapStateToProps, mapDispatchToProps)(SizedSpiritContainer);
