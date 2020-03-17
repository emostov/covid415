import React from 'react';

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    handleClaim () {
        
    }

    render() {
        console.log('the whale has landed')
        return (
            <div>
                <h4>Task Info</h4>
                <button onClick={() => this.handleClaim()}>CLAIM</button>
            </div>
        )
    }
}

export default TaskUpdate;