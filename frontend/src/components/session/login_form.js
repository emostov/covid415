import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Container, Alert } from 'react-bootstrap'

import '../../styles/session_form.scss'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/tweets');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  demoLogin(e) {
    e.preventDefault();

    let user = {
      email: 'rayleensharp@gmail.com',
      password: 'password',
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul className='errors-list'>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            <Alert variant='warning'>
              {this.state.errors[error]}
            </Alert>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
              <Card className=' login session'>
                <Card.Title className='session'>
                  <strong>Welcome back, neighbor.</strong>
                </Card.Title>
                {this.renderErrors()}
                {/*  */}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.update('email')}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.update('password')}
                    />
                  </Form.Group>
                </Form>
                <Button
                  className='session-btn'
                  type="submit"
                  onClick={this.handleSubmit}>
                  Login
                </Button>
                <Button
                  className='demo-btn'
                  type="submit"
                  onClick={this.demoLogin}>
                  Just demo for now
                </Button>
              </Card>
    );
  }
}

export default withRouter(LoginForm);