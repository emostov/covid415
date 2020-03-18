import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

import NavBar from './navbar';

// Map in isAuthenticated so we can toggle links displayed based on auth
const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mDTP)(NavBar);