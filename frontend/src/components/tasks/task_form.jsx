import React from 'react';

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state=this.props.task
    }

    render() {
        return(
            <div>What would you like to request?</div>
        )
    }
};

export default TaskForm;