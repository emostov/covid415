import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/task_update.scss'

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = this.props.task

        this.handleClaim = this.handleClaim.bind(this)
    }

    handleClaim () {
        debugger
        if (this.state.status === 0){
            this.setState(prevState => ({
                status: prevState.status+1,
                volunteer: this.props.currentUserId
            }), () => this.props.updateTask(this.state)
                .then(() => {
                    this.props.fetchTasks()
                    this.props.closeModal()
                }))
        } else if (this.state.status === 1) {
            this.setState(prevState => ({
                status: prevState.status+1
            }), () => this.props.updateTask(this.state)
                .then(() => this.props.fetchTasks()))
        }

    }

    render() {
        return (
            <div className="modal-child-confirm-delivery">
                <div className="delivery-header-container-pending">
                    <div className="delivery-header">{task.requester.firstName} is counting on you.</div>
                </div>
                <div className="delivery-details-container">
                    <div className="delivery-details-type">Delivery details:</div>
                    <span className="delivery-details-text">{task.details}</span>
                    <div className="delivery-details-type">Recipient name:</div>
                    <span className="delivery-details-text">{task.requester.firstName}</span>
                    <div className="delivery-details-type">Deliver to:</div>
                    <span className="delivery-details-text">{task.deliveryAddress}</span>
                    <div className="delivery-details-type">Contact:</div>
                    <span className="delivery-details-text">{task.requester.email}</span>
                </div>
                <div className="button-container">
                    <button className='claim-button-done' onClick={() => this.handleClaim()}>Confirm Delivery Complete</button>
                </div>
            </div>
        )
    }