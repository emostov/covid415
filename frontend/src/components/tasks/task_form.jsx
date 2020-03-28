import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Form, Card, Alert, Container } from 'react-bootstrap'

import Food from '../../public/groceries.png';
import Medicine from '../../public/medicine.png';
import Other from '../../public/other.png';
import '../../styles/task_form.scss'

class TaskForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.props.task
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors })
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
      .then(() => {
        if (this.state.errors.length <= 0) {
          this.props.closeModal();
        }
      })
  }

  render() {
    return (
      <div className='task-form-container'>
        <Container>
          <Card.Title className='task-form-title'><strong>Self-isolating? Request a delivery.</strong></Card.Title>
          {this.renderErrors()}
          <Form className='task-form'>
            <Form.Group className='task-form-group'>
              <Form.Label className='task-form-label'>What are you requesting?</Form.Label>
              <div className='task-type-group'>
                <Form.Group className='task-form-type'>
                  <label>
                    <input type="radio" name='task-type' onChange={this.update('type')} value='Food' />
                    <img className='radio-img' src={Food} alt="grocery-pic" />
                    <div className='task-type-label'>Food</div>
                  </label>
                  <label>
                    <input type="radio" name='task-type' onChange={this.update('type')} value='Medicine' />
                    <img className='radio-img' src={Medicine} alt="medicine-pic" />
                    <div className='task-type-label'>Medicine</div>
                  </label>
                  <label>
                    <input type="radio" name='task-type' onChange={this.update('type')} value='Other' />
                    <img className='radio-img' src={Other} alt="other-pic" />
                    <div className='task-type-label'>Other</div>
                  </label>
                </Form.Group>
              </div>
            </Form.Group>

            <Form.Group className='task-form-group'>
              <Form.Label className='task-form-label'>Where is this being delivered to?</Form.Label>
              <GooglePlacesAutocomplete
                autocompletionRequest={{
                  bounds: [
                    { lat: 37.6, lng: -122.54 },
                    { lat: 37.9, lng: -122.34 }
                  ],
                  componentRestrictions: {
                    country: ['us']
                  }
                }}
                placeholder='825 Battery Street, San Francisco, CA 94111'
                onSelect={({ description }) => (
                  this.setState({ deliveryAddress: description })
                )}
                suggestionsClassNames={{
                  container: 'suggestion-container',
                  suggestion: 'suggestion'
                }}
              loader={<div className='task-form-loader'>Loading...</div>}
              />
            </Form.Group>

            <Form.Group className='task-form-group'>
              <Form.Label className='task-form-label'>Details</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Please bring me some canned food and whole milk.'
                onChange={this.update('details')}
                className='task-form-input-long'
              />
            </Form.Group>

            <Form.Group className='task-form-group'> 
              <Form.Label className='task-form-label'>Please provide additional delivery instructions</Form.Label>
              <Form.Control
                placeholder='Leave it on the front porch'
                onChange={this.update('deliveryInstructions')}
                className='task-form-input-short'
              />
            </Form.Group>
          </Form>
          <button className='task-form-submit' onClick={this.handleSubmit}>Request Delivery</button>
        </Container>
      </div>
    )
  }
};

export default TaskForm;