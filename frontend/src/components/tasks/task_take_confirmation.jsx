import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

class TaskTakeConfirmation extends React.Component {
    render() {
        return (
            <div className="modal-child-confirm-delivery">
            <div className="delivery-header-container">
                <div className="delivery-header">Delivery accepted!</div>
            </div>
            <div className="delivery-confirm-body">
                Check 'My Deliveries' for delivery details.
            </div>
        </div>
        )
    }
}

export default TaskTakeConfirmation;