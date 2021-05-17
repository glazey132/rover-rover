//packages
import React, { Component } from 'react';
import '../App.css';

import Navigation from '../components/Navigation'
import CMESection from '../components/CMESection';


//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme';

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { isPhotoFetching, isCameraPhotosFetching } = this.props;
    return (
      <div style={GraphContainerPageStyle}>
        <Container fluid={true}>
          <Row>
            <Navigation />
          </Row>
            <Row style={dateRowStyle}>
              <Col>
                <CMESection />
              </Col>
            </Row>
        </Container>
      </div>
    )
  }
}


const GraphContainerPageStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    border: '1px solid teal'
}

const loadingStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  display: 'flex'
}

const dateRowStyle = {
  margin: '1rem 0'
}

const mapStateToProps = state => ({ 
  null: null
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch)

const SizedCGraphContainer = sizeMe({ monitorHeight: true })(GraphContainer);
export default connect(mapStateToProps, mapDispatchToProps)(SizedCGraphContainer);
