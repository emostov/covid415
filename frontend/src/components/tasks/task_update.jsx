import React from 'react';
import '../../styles/task_update.scss'

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.task
    }

    componentDidMount() {

    }

    handleClaim () {
        if (this.state.status === 0){
            debugger;
            this.setState({
                status: 1,
                volunteer: this.props.currentUserId
            })
        } else if (this.state.status === 1) {
            this.setState({
                status: 2
            })
        }

        console.log(this.state);
        this.props.updateTask(this.state);
        setTimeout(() => this.props.closeModal(), 2000);
    }

    render() {
        const { task } = this.props

        return (
            <div>
                <h4>Delivery for {task.requester.firstName}</h4>
                <p>Deliver to: {task.deliveryAddress}</p>
                <p>Contact: {task.requester.email}</p>
                <p>Can you bring {task.requester.firstName} their goods?</p>
                <button className='claim-button' onClick={() => this.handleClaim()}>Confirm</button>
            </div>
        )
    }
}

export default TaskUpdate;