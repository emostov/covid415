import React from 'react';

import { sendSMS } from '../../util/sms_util';

class TaskUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.task
    this.handleClaim = this.handleClaim.bind(this);
  }

  handleClaim() {
    this.setState(prevState => ({
      status: prevState.status + 1,
      volunteer: this.props.currentUser.id
    }), () => this.props.updateTask(this.state)
      .then(() =>
        sendSMS({
          phoneNumber: this.props.task.requester.phoneNumber,
          volunteerName: this.props.currentUser.firstName,
      }))
      .then(() => this.props.fetchTasks())
      .then(() => this.props.openModal('takeTaskConfirmed'))
      .catch(err => console.log(err))
    )
  }

  render() {
    const { task, closeModal } = this.props

    return (
      <div className="modal-child-confirm-delivery">
        <div className="close-x" onClick={this.props.closeModal}>&times;</div>
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