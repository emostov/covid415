import React from 'react';
import '../../styles/task_form.scss'

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state=this.props.task
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.createNewTask(this.state)
            .then(() => this.props.fetchTasks())
        setTimeout(() => this.props.closeModal(), 500);
    }

    render() {
        return(
            <div className='task-form-container'>
                <h3 className='task-form-title'>Request Form</h3>
                <form className='task-form' onSubmit={this.handleSubmit}>

                    <label className='task-form-label'>What are you requesting?</label>
                    <div className='task-form-type'> 
                        <input type="radio" name='task-type' onChange={this.update('type')} value="Food"/>Food
                        <input type="radio" name='task-type' onChange={this.update('type')} value="Medicine"/>Medicine
                        <input type="radio" name='task-type' onChange={this.update('type')} value="Other"/>Other
                    </div>
                    
                    <label className='task-form-label'>Details</label>
                    <input type="text" placeholder='Please bring me some fuji apples and Sour Diesel'
                        onChange={this.update('details')} 
                        className='task-form-input'/>

                    <label className='task-form-label'>Where is this being delivered to? SF only</label>
                    <input type="text" placeholder='123 Fake St, San Francisco, CA'
                        onChange={this.update('deliveryAddress')}
                        className='task-form-input' />

                    <label className='task-form-label'>Please provide additional delivery instructions</label>
                    <textarea onChange={this.update('deliveryInstructions')}
                        className='task-form-input'></textarea>

                    <input className='task-form-submit' type="submit" value='Request Task!'/>
                </form>
            </div>
        )
    }
};

export default TaskForm;