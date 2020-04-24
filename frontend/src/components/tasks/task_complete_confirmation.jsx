import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';

const CompleteTakeConfirmation = props => {
    return (
        <div className="modal-child-confirm-delivery">
        <div className="close-x" onClick={props.closeModal}>&times;</div>
        <div className="delivery-header-container-pending">
            <div className="delivery-header">Delivery complete!</div>
        </div>
        <div className="delivery-confirm-body">
            Thanks for helping keep the 415 alive.
        </div>
    </div>
    )
}

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(CompleteTakeConfirmation);