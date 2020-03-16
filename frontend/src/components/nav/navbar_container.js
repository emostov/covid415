import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

// Map in isAuthenticated so we can toggle links displayed based on auth
const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavBar);