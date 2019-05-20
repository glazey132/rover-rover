//packages
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import CameraPicker from '../components/CameraPicker';
import ControlledCarousel from '../components/ControlledCarousel';
import Navigation from '../components/Navigation';
import DatePicker from '../components/DatePicker';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            <Row>
              <Col>
                <h1>Choose a camera for: <Badge variant="secondary">Spirit</Badge></h1>
                <DatePicker />
              </Col>
            </Row>
            <Row>
              <Col>
                <CameraPicker rover={"spirit"} />
                {this.props.latestSpiritPhotos ?  <ControlledCarousel rover={"spirit"} photos={this.props.latestSpiritPhotos}/>
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

const mapStateToProps = state => ({ latestSpiritPhotos: state.latestPhotos.latestSpiritPhotos })

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestLatestSpiritPhotos,
    setRover
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SpiritContainer);
