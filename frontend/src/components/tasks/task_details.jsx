import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

class TaskDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.task
    this.handleClaim = this.handleClaim.bind(this)
  }

  handleClaim() {
    this.setState(prevState => ({
      status: prevState.status + 1,
      volunteer: this.props.currentUserId
    }), () => this.props.updateTask(this.state)
      .then(() => this.props.fetchTasks())
      .then(() => this.props.openModal('completeTaskConfirmed'))
    )
  }

  handleCancel() {
    const task = this.state;
    const { updateTask, fetchTasks, closeModal } = this.props;
    const updatedTask = {
      ...task,
      volunteer: null,
      status: 0,
    }
    updateTask(updatedTask)
      .then(() => fetchTasks())
      .then(() => {
        closeModal();
        setTimeout(() => {
          alert('Successfully removed from your deliveries.');
        }, 1)
      })



    // console.log(updatedTask);
  }

  render() {
    const { task } = this.props
    return (
      <div className="modal-child-confirm-delivery">
        <div className="close-x" onClick={this.props.closeModal}>&times;</div>
        <div className="delivery-header-container-pending">
          <div className="delivery-header">{task.requester.firstName} is counting on you.</div>
        </div>
        <div className="delivery-details-container">
          <div className="delivery-details-type">Recipient name:</div>
          <span className="delivery-details-text">{task.requester.firstName}</span>
          <div className="delivery-details-type">Phone number:</div>
          <span className="delivery-details-text">
            <a href={`tel:${task.requester.phoneNumber}`}>{task.requester.phoneNumber}</a></span>
          <div className="delivery-details-type">Delivery details</div>
          <span className="delivery-details-text">{task.details}</span>
          <div className="delivery-details-type">Deliver to:</div>
          <a className="card-address-link"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.task.deliveryAddress}`}
            onClick={this.handleDirectionsClick}
          >
            {this.props.task.deliveryAddress}
            <FontAwesomeIcon className="directions-external-link" icon={faExternalLinkAlt} />
          </a>
          <div className="delivery-details-type">Delivery instructions:</div>
          <span className="delivery-details-text">{task.deliveryInstructions}</span>
        </div>
        <div className="button-container">
          <button className='claim-button-done'
            onClick={() => this.handleClaim()}>Delivery Complete</button>
          <button className='cancel-button done'
            onClick={() => this.handleCancel()}>Cancel Delivery</button>
        </div>
      </div>
    )
  }
}


export default TaskDetails;