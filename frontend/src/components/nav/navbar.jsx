import React from 'react';
// import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../public/COVID415.png';
import '../../styles/navbar.scss'

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
      const userCircle = (<FontAwesomeIcon className='user-circle mr-1' icon={faUserCircle} />)
      return (
        <NavDropdown title={userCircle} id="collasible-nav-dropdown" alignRight>
          <NavDropdown.Item href="" className='text-center'>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Item href="" className='text-center'>
            Help
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >
            <Button
              onClick={this.logoutUser}
              className='light-gray-btn w-full'>
              Logout
              </Button>
          </NavDropdown.Item>
        </NavDropdown>

      );
    } else {
      return (
        <div>
          <Nav>
            <Nav.Link
              className='white-txt border-right-grey'
              href="#signup">
              Sign up
               </Nav.Link>
            <Nav.Link
              className='white-txt'
              href="#login"
            >
              Log in
            </Nav.Link>
          </Nav>

        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" >
          {/*  */}
          <div className='d-flex justify-content-between w-full'>
            <Nav className="mr-auto ">
              <Navbar.Brand href="#">
                <img className="logo-covid415" src={Logo} width="200" />
              </Navbar.Brand>
              <Nav className='align-items-end'>
                <Nav.Link className='upcase text-center primary-txt' href="#">
                  Charts
                </Nav.Link>
                <Nav.Link className='upcase' href="#features">
                  FAQ
                </Nav.Link>
                <Nav.Link className='upcase' href="#pricing">
                 About
                </Nav.Link>
              </Nav>
            </Nav>
            <Nav
              className="justify-content-end upcase white-txt align-items-end">
              {this.getLinks()}
            </Nav>

          </div>
          {/* </Nav> */}
        </Navbar>


      </div>
    );
  }
}

export default NavBar;