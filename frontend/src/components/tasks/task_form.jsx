import React from 'react';
import '../../styles/task_form.scss'
import { Form, Button, Card, Alert } from 'react-bootstrap'


class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state=this.props.task
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors})
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    renderErrors() {
        return (
            <ul className='errors-list'>
                {Object.values(this.state.errors).map((error, i) => (
                    <li key={`error=${i}`}>
                        <Alert variant='warning'>
                            {error}
                        </Alert>
                    </li>
                ))}
            </ul>
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.createNewTask(this.state)
            .then(() => this.props.fetchTasks())

        // if (Object.values(this.state.errors).length !== 0) {
        //     setTimeout(() => this.props.closeModal(), 1000);
        // }
    }

    render() {
        return(
            <div className='task-form-container'>
                <Card.Title className='task-form-title'><strong>Under quarantine? Request a delivery.</strong></Card.Title>
                {this.renderErrors()}
                <Form className='task-form'>
                    <Form.Group>
                        <Form.Label className='task-form-label'>What are you requesting?</Form.Label>
                        <Form.Group className='task-form-type'>
                            <Form.Check type='radio' name='task-type' onChange={this.update('type')} value='Food' label='Food'/>
                            <Form.Check type='radio' name='task-type' onChange={this.update('type')} value='Medicine' label='Medicine'/>
                            <Form.Check type='radio' name='task-type' onChange={this.update('type')} value='Other' label='Other'/>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='task-form-label'>Details</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Please bring me some fuji apples and Sour Diesel'
                            onChange={this.update('details')}
                            className='task-form-input-short'
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label className='task-form-label'>Where is this being delivered to?</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='825 Battery Street, San Francisco, CA 94111'
                            onChange={this.update('deliveryAddress')}
                            className='task-form-input-short'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='task-form-label'>Please provide additional delivery instructions</Form.Label>
                        <Form.Control
                            as='textarea'
                            onChange={this.update('deliveryInstructions')}
                            className='task-form-input-long'
                        />
                    </Form.Group>

                </Form>
                <Button className='task-form-submit' onClick={this.handleSubmit}>Request Delivery</Button>
            </div>
        )
    }
};

export default TaskForm;