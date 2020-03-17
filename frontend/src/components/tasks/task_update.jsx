import React from 'react';

class TaskUpdate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    handleClaim () {
        debugger;
    }

    render() {
        console.log('the whale has landed')
        return (
            <div>
                
                <button onClick={() => this.handleClaim()}>CLAIM</button>
            </div>
        )
    }
}

export default TaskUpdate;