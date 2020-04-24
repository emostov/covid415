import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';

const TaskTakeConfirmation = props => {
    return (
        <div className="modal-child-confirm-delivery">
        <div className="close-x" onClick={props.closeModal}>&times;</div>
        <div className="delivery-header-container">
            <div className="delivery-header">Delivery accepted!</div>
        </div>
        <div className="delivery-confirm-body">
            Check 'My Deliveries' for delivery details.
        </div>
    </div>
    )
};

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(TaskTakeConfirmation);