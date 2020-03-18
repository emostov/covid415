import React from 'react';
import '../../styles/task_form.scss'

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state=this.props.task
    }

    render() {
        return(
            <div className='task-form-container'>
                <h3 className='task-form-title'>Request Form</h3>
                <form className='task-form'>

                    <label>What are you requesting?</label>
                    <div className='task-form-type'> 
                        <input type="radio" value="food"/>Food
                        <input type="radio" value="medicine"/>Medicine
                        <input type="radio" value="other"/>Other
                    </div>
                    
                    <label>Details</label>
                    <input type="text" placeholder='Please bring me some fuji apples and Sour Diesel'/>

                    <label>Where is this being delivered to? SF only</label>
                    <input type="text" placeholder='123 Fake St, San Francisco, CA'/>

                    <label>Please provide additional delivery instructions</label>
                    <textarea></textarea>
                </form>
            </div>
        )
    }
};

export default TaskForm;