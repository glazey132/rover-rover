import React, { Component } from 'react';

//bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Navigation = props => {
  return (
    <Navbar style={BarStyle} bg="light" expand="lg" fixed="top">
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
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Choose a Rover" id="basic-nav-dropdown">
            <NavDropdown.Item href="/opportunity">Opportunity</NavDropdown.Item>
            <NavDropdown.Item href="/curiosity">Curiosity</NavDropdown.Item>
            <NavDropdown.Item href="/spirit">Spirit</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://api.nasa.gov/api.html#MarsPhotos">Nasa Rover API information</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

const BarStyle = {
  marginBottom: '3vh',
}

export default Navigation;
