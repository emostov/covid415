import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import Logo from '../../public/COVID415.png';
import '../../styles/navbar.scss'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.requestHelp = this.requestHelp.bind(this);
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
          <NavDropdown.Item href="" className='text-left'>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Item href="" className='text-left'>
            Help
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.logoutUser} className='text-left log-out' >
            Log out
          </NavDropdown.Item>
        </NavDropdown>

      );
    } else {
      return (
        <div>
          <Nav>
            <Link to="/signup" className="nav-link">
              Sign up
            </Link>
            <Link to="/login" className="nav-link">
              Log in
            </Link>
          </Nav>
        </div>
      );
    }
  }

  requestHelp() {
    this.props.openModal('taskform');
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" >
          <div className='d-flex justify-content-between w-full align-items-center'>
            <Nav className="mr-auto ">
              <Navbar.Brand href="#">
                <img className="logo-covid415" src={Logo} alt='' width="200" />
              </Navbar.Brand>
            </Nav>

            {this.props.loggedIn ? (
              <button className='request-help-button' onClick={() => this.requestHelp()}>Request a Delivery</button>
            ) : (
                <div></div>
              )
            }

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