import React from 'react';
import '../../styles/task_form.scss'
import { Form, Button, Card, Alert } from 'react-bootstrap'

import Food from '../../public/groceries.png';
import Medicine from '../../public/medicine.png';
import Other from '../../public/other.png';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state=this.props.task
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
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

        debugger;
        // this.props.createNewTask(this.state)
        //     .then(() => this.props.fetchTasks())

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
                        <div className='task-type-group'>
                            <Form.Group className='task-form-type'>
                                <label>
                                    <input type="radio" name='task-type' onChange={this.update('type')} value='Food'/>
                                    <img className='radio-img' src={Food} alt="grocery-pic"/>
                                    <div className='task-type-label'>Food</div>
                                </label>
                                <label>
                                    <input type="radio" name='task-type' onChange={this.update('type')} value='Medicine'/>
                                    <img className='radio-img' src={Medicine} alt="medicine-pic"/>
                                    <div className='task-type-label'>Medicine</div>
                                </label>
                                <label>
                                    <input type="radio" name='task-type' onChange={this.update('type')} value='Other'/>
                                    <img className='radio-img' src={Other} alt="other-pic"/>
                                    <div className='task-type-label'>Other</div>
                                </label>
                            </Form.Group>
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='task-form-label'>Where is this being delivered to?</Form.Label>
                        <GooglePlacesAutocomplete
                            type='text'
                            placeholder='825 Battery Street, San Francisco, CA 94111'
                            // value={this.state.deliveryAddress}
                            // onChange={this.update('deliveryAddress')}
                            onSelect={({ description }) => (
                                this.setState({ deliveryAddress: description })
                            )}
                            className='task-form-input-short'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='task-form-label'>Details</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder='Please bring me some fuji apples and Sour Diesel'
                            onChange={this.update('details')}
                            className='task-form-input-long'
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label className='task-form-label'>Please provide additional delivery instructions</Form.Label>
                        <Form.Control
                            placeholder='Leave it on the front porch'
                            onChange={() => this.update('deliveryInstructions')}
                            className='task-form-input-short'
                        />
                    </Form.Group>
                </Form>
                <Button className='task-form-submit' onClick={this.handleSubmit}>Request Delivery</Button>
            </div>
        )
    }
};

export default TaskForm;