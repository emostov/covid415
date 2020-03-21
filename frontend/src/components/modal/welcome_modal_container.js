import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import WelcomeModal from './welcome_modal';

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(WelcomeModal);