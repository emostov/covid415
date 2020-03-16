import React from 'react';
import { Link } from 'react-router-dom'

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
        <div>
          <Link to={'/link1'}>link 1</Link>
          &nbsp;
          <Link to={'/link2'}>link 2</Link>
          &nbsp;
          <Link to={'/link3'}>link 3</Link>
          &nbsp;
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          &nbsp;
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h4>NavBar place holder</h4>
        &nbsp;
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;