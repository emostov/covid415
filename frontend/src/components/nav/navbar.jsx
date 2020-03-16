import React from 'react';
import { Link } from 'react-router-dom'

import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'

// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <Button onClick={this.logoutUser}>Logout</Button>
      );
    } else {
      return (
        <div>
          <Nav>
            <Nav.Link href="#signup">Sign up</Nav.Link>
            <Nav.Link href="#login">Log in</Nav.Link>
          </Nav>

        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">COVID415</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav className="justify-content-end">
                {this.getLinks()}
              </Nav>
              
            </Nav>
        
          </Navbar>

        </>
        
      </div>
    );
  }
}

export default NavBar;