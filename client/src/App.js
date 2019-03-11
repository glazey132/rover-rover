import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import NasaTodayContainer from './containers/NasaTodayContainer';

//bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayDataOpen: true,
    }
  }

  //exit modal
  exitTodayData = () => {
    console.log('clicked button')
    this.setState({
      todayDataOpen: !this.state.todayDataOpen
    })
  }

  openTodayData = () => {
    this.setState({
      todayDataOpen: !this.state.todayDataOpen
    })
  }

  render() {
    const { todayDataOpen } = this.state;
    return (
      <div className="App overlay">
        {todayDataOpen ?
          <NasaTodayContainer todayDataOpen={this.state.todayDataOpen} exitTodayData={this.exitTodayData}/>
          :
          <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="#home">
              <img
                src="http://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png"
                width="50"
                height="40"
                className="d-inline-block align-top"
                alt="Nasa logo"
              />
              {' Rover Rover' }
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Choose a Rover" id="basic-nav-dropdown">
                  <NavDropdown.Item><Link to="/opportunity">Opportunity</Link></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Curiosity</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Spirit</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>}


      </div>
    );
  }
}

export default App;
