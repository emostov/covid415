import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import WelcomeModal from './welcome_modal';

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mDTP)(WelcomeModal);