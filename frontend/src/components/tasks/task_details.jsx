import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

const TaskDetails = (props) => {
  const { 
    task, 
    updateTask, 
    fetchTasks, 
    closeModal, 
    currentUserId, 
    openModal 
  } = props;

  const [state, setState] = useState({ status: task.status, volunteer: null })

  const handleClaim = () => {
    setState({
      status: state.status + 1,
      volunteer: currentUserId
    })

    updateTask({
      ...task,
      status: state.status,
      volunteer: state.volunteer
    })
      .then(() => fetchTasks())
      .then(() => openModal('completeTaskConfirmed'))
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    const updatedTask = {
      ...task,
      volunteer: null,
      status: 0,
    };

    updateTask(updatedTask)
      .then(() => fetchTasks())
      .then(() => {
        closeModal();
        setTimeout(() => {
          alert('Successfully removed from your deliveries.');
        }, 1)
      })
  };

  return (
    <div className="modal-child-confirm-delivery">
      <div className="close-x" onClick={() => closeModal()}>&times;</div>
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
          href={`https://www.google.com/maps/dir/?api=1&destination=${task.deliveryAddress}`}
        >
          {task.deliveryAddress}
          <FontAwesomeIcon className="directions-external-link" icon={faExternalLinkAlt} />
        </a>
        <div className="delivery-details-type">Delivery instructions:</div>
        <span className="delivery-details-text">{task.deliveryInstructions}</span>
      </div>
      <div className="button-container">
        <button className='claim-button-done'
          onClick={() => handleClaim()}>Delivery Complete</button>
        <button className='cancel-button done'
          onClick={() => handleCancel()}>Cancel Delivery</button>
      </div>
    </div>
  );
}


export default TaskDetails;