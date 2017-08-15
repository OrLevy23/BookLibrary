import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            My Book Library
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
