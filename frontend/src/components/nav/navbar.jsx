import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import gitHub from '../../public/github-logo.png';

import Logo from '../../public/COVID415.png';
import '../../styles/navbar.scss';

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
        <NavDropdown title={userCircle} id="nav-dropdown" alignRight>
          <div className='navbar-user'>
            <div className='navbar-curr-user'>Hi, {this.props.currUserName}</div>
            <div className='navbar-curr-email'>{this.props.currUserEmail}</div>
          </div>
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
      <header>
        <Navbar bg="dark" variant="dark" sticky="top">
          <div className='d-flex flex-row justify-content-between w-full align-items-center'>
            <Nav className="mr-auto ">
              <Navbar.Brand href="#">
                <img className="logo-covid415" src={Logo} alt='covid-logo'/>
              </Navbar.Brand>
            </Nav>
            {this.props.loggedIn ? (
              <button className='request-help-button' onClick={() => this.requestHelp()}>Request Delivery</button>
            ) : (
                <div></div>
              )
            }
            <div className="icon-login-container">
              <Nav
                className="justify-content-end upcase white-txt align-items-end">
                {this.getLinks()}
              </Nav>
              <Nav className="github-icon">
                <a href="https://github.com/emostov/covid415"
                  target="_blank" rel="noopener noreferrer" >
                  <img src={gitHub} className='online-presence-icon' alt="github" />
                </a>
              </Nav>
            </div>
          </div>
        </Navbar>

      </header>
    );
  }
}

export default NavBar;