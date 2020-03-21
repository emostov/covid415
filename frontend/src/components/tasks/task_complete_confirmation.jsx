import React from 'react';

import '../../styles/task_update.scss'

class CompleteTakeConfirmation extends React.Component {
    render() {
        return (
            <div className="modal-child-confirm-delivery">
            <div className="delivery-header-container-pending">
                <div className="delivery-header">Delivery complete!</div>
            </div>
            <div className="delivery-confirm-body">
                Thanks for helping keep the 415 alive.
            </div>
        </div>
        )
    }
}

export default CompleteTakeConfirmation;