import React from 'react';

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.task
    }

    handleClaim () {
        if (this.state.status === 0){
            this.setState({
                status: 1,
                // volunteer: 
            })
        }

        this.props.updateTask(this.state);
    }

    render() {
        return (
            <div>
                <h4>Task Info</h4>
                <button onClick={() => this.handleClaim()}>CLAIM</button>
            </div>
        )
    }
}

export default TaskUpdate;