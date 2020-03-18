import React from 'react';
import '../../styles/task_update.scss'

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = this.props.task

        this.handleClaim = this.handleClaim.bind(this)
    }

    componentDidMount() {
        console.log(this.state);
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
                        <div>
                            <h4>Delivery for {task.requester.firstName}</h4>
                            <p>Deliver to: {task.deliveryAddress}</p>
                            <p>Contact: {task.requester.email}</p>
                            <p>Can you bring {task.requester.firstName} their goods?</p>
                            <button className='claim-button' onClick={() => this.handleClaim()}>Confirm</button>
                        </div>
                    ) : (
                        <div>
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