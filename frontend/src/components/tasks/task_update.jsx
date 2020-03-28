import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

class TaskUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.task
    this.handleClaim = this.handleClaim.bind(this);
  }

  handleClaim() {
    this.setState(prevState => ({
      status: prevState.status + 1,
      volunteer: this.props.currentUserId
    }), () => this.props.updateTask(this.state)
      .then(() => this.props.fetchTasks())
      .then(() => this.props.openModal('takeTaskConfirmed'))
    )

    setTimeout(() => this.props.closeModal(), 2000);
  }

  render() {
    const { task, closeModal } = this.props

    return (
      <div className="modal-child-confirm-delivery">
        <div className="delivery-header-container">
          <div className="delivery-header">Thanks for helping out.</div>
        </div>
        <div className="delivery-details-container">
          <div className="delivery-details-type">Requested delivery:</div>
          <span className="delivery-details-text">{task.details}</span>
          <div className="delivery-details-memo">Contact information:</div>
          <span className="delivery-details-text">Recipient name, address, and contact info will be shared after accepting the delivery.</span>
        </div>
        <div className="button-container">
          <button className='claim-button' onClick={() => this.handleClaim()}>Confirm</button>
          <button className='cancel-button' onClick={() => closeModal()}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default TaskUpdate;