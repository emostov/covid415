import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

class TaskTakeConfirmation extends React.Component {
    render() {
        const { task } = this.props

        return (
            <div className="modal-child-confirm-delivery">
            <div className="delivery-header-container">
                <div className="delivery-header">You're confirmed!</div>
            </div>
            <div className="delivery-details-container">
                Delivery added to your 'My Deliveries'
            </div>
        </div>
        )
    }
}

export default TaskTakeConfirmation;