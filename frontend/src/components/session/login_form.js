import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Container, Alert } from 'react-bootstrap'
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

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container  ">
        <Container fluid='sm'>
          <Row>
            <Col>
              <Card className='session'>
                <Card.Title>Welcome <strong>back</strong></Card.Title>
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
                  Creat My Account
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div >
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <div>
      //       email here 
      //       <input type="text"
      //         value={this.state.email}
      //         onChange={this.update('email')}
      //         placeholder="Email"
      //       />
      //       <br />
      //       <br />
      //       password here
      //       <input type="password"
      //         value={this.state.password}
      //         onChange={this.update('password')}
      //         placeholder="Password"
      //       />
      //       <br />
      //       <br />
      //       <input type="submit" value="Submit" />
      //       {this.renderErrors()}
      //     </div>
      //   </form>
      // </div>
    );
  }
}

export default withRouter(LoginForm);