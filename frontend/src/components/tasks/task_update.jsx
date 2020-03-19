import React from 'react';
import '../../styles/task_update.scss'

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = this.props.task

        this.handleClaim = this.handleClaim.bind(this)
    }

    componentDidMount() {
        // console.log(this.state);
    }

    handleClaim () {
        if (this.state.status === 0){
            this.setState(prevState => ({
                status: prevState.status+1,
                volunteer: this.props.currentUserId
            }), () => this.props.updateTask(this.state)
                .then(() => this.props.fetchTasks()))
        } else if (this.state.status === 1) {
            this.setState(prevState => ({
                status: prevState.status+1
            }), () => this.props.updateTask(this.state)
                .then(() => this.props.fetchTasks()))
        }

        setTimeout(() => this.props.closeModal(), 500);
    }

    render() {
        const { task } = this.props

        return (
            <div>
                {
                    this.state.status === 0
                    ? 
                    (
                        <div className="modal-child-confirm-delivery">
                            <div className="delivery-header-container">
                                <div className="delivery-header">Thanks for helping out.</div>
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
                                <button className='claim-button' onClick={() => this.handleClaim()}>I'm on it!</button>
                                <button className='cancel-button' onClick={() => this.handleClaim()}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="modal-confirm-delivery">
                            <h4>You have accepted a delivery for {task.requester.firstName}</h4>
                            <p>Deliver to: {task.deliveryAddress}</p>
                            <p>Contact: {task.requester.email}</p>
                            <p>Please presse complete once you bring {task.requester.firstName} their goods?</p>
                            <button className='claim-button' onClick={() => this.handleClaim()}>Complete</button>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default TaskUpdate;