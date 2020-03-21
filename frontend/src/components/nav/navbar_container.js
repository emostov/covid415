import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

import NavBar from './navbar';

// Map in isAuthenticated so we can toggle links displayed based on auth
const mapStateToProps = state => {
  let currUserName
  let currUserEmail
  if (state.session.isAuthenticated) {
    currUserName = state.session.user.firstName
    currUserEmail = state.session.user.email
  } else {
    currUserName = ''
    currUserEmail = ''
  }
  return {
    loggedIn: state.session.isAuthenticated,
    currUserName: currUserName,
    currUserEmail: currUserEmail
  }
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mDTP)(NavBar);