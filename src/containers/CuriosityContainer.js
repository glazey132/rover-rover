//packages
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import CameraPicker from '../components/CameraPicker'
import ControlledCarousel from '../components/ControlledCarousel'
import Navigation from '../components/Navigation'
import DatePicker from '../components/DatePicker';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            <Row>
              <Col>
                <h1>Choose a camera for: <Badge variant="secondary">Curiosity</Badge></h1>
                <DatePicker />
              </Col>
            </Row>
            <Row>
              <Col>
                <CameraPicker rover={"curiosity"} />
                 {this.props.curiosityCameraPhotos ? <ControlledCarousel rover={"curiosity"} photos={this.props.curiosityCameraPhotos}/>
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
  latestCuriosityPhotos: state.latestPhotos.latestCuriosityPhotos,
  curiosityCameraPhotos: state.roverSelections.curiosityCameraPhotos
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestLatestCuriosityPhotos,
    setRover
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CuriosityContainer);
