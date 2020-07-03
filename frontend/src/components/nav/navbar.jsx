import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import gitHub from '../../public/github-logo.png';

import Logo from '../../public/COVID415.png';
import '../../styles/navbar.scss';

const NavBar = (props) => {

  const logoutUser = () => {
    const { logout } = props;

    logout();
  };

  const getLinks = () => {
    const { loggedIn, currUserName, currUserEmail } = props;
    if (loggedIn) {
      const userCircle = (<FontAwesomeIcon className='user-circle mr-1' icon={faUserCircle} />)
      return (
        <NavDropdown title={userCircle} id="nav-dropdown" alignRight>
          <div className='navbar-user'>
            <div className='navbar-curr-user'>Hi, {currUserName}</div>
            <div className='navbar-curr-email'>{currUserEmail}</div>
          </div>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logoutUser()} className='text-left log-out' >
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
  };

  const requestHelp = () => {
    const { openModal } = props;

    openModal('taskform');
  };

  const { loggedIn } = props;

  return (
    <header>
      <Navbar bg="dark" variant="dark" sticky="top">
        <div className='d-flex flex-row justify-content-between w-full align-items-center'>
          <Nav className="mr-auto ">
            <Navbar.Brand href="#">
              <img className="logo-covid415" src={Logo} alt='covid-logo' />
            </Navbar.Brand>
          </Nav>
          {loggedIn ? (
              <button className='request-help-button' onClick={() => requestHelp()}>Request Delivery</button>
            ) : (
              <div></div>
            )
          }
          <div className="icon-login-container">
            <Nav
              className="justify-content-end upcase white-txt align-items-end">
              {getLinks()}
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

export default NavBar;