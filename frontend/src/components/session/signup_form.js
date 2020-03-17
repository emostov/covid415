import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';

import '../../styles/session_form.scss'
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, firstName, lastName, password, password2 } = this.state
    const user = {
      email,
      firstName,
      lastName,
      password,
      password2,
    };

    // clarify this.props.history
    this.props.signup(user, this.props.history);
  }

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
      <div className="signup-form-container  ">
        <Container fluid='sm'>
          <Row>
            <Col>
              <Card className='session'>
                <Card.Title><strong>Sign Up</strong></Card.Title>
                {this.renderErrors()}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.update('email')}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.update('firstName')}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.update('lastName')}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Row>
                    <Col>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.update('password')}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password"
                        placeholder="Confirm Password"
                        onChange={this.update('password2')}
                        placeholder="Confirm Password"
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="I agree to be a good neighbor" />
                </Form.Group>

                <Button className='session-btn' type="submit">
                  Creat My Account
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>


      </div >

      // 
      //   <form onSubmit={this.handleSubmit}>
      //     <div className="signup-form">
      //       <br />
      //       <input type="text"
      //         value={this.state.email}
      //         onChange={this.update('email')}
      //         placeholder="Email"
      //       />
      //       <br />
      //       <br />
      //       <br />
      //       <input type="text"
      //         value={this.state.firstName}
      //         onChange={this.update('firstName')}
      //         placeholder="First Name"
      //       />
      //       <br />
      //       <br />
      //       <input type="text"
      //         value={this.state.lastName}
      //         onChange={this.update('lastName')}
      //         placeholder="Last Name"
      //       />
      //       <br />
      //       <br />
      //       <input type="password"
      //         value={this.state.password}
      //         onChange={this.update('password')}
      //         placeholder="Password"
      //       />
      //       <br />
      //       <br />
      //       <input type="password"
      //         value={this.state.password2}
      //         onChange={this.update('password2')}
      //         placeholder="Confirm Password"
      //       />
      //       <br />
      //       <br />
      //       <input type="submit" value="Submit" />
      //       {this.renderErrors()}
      //     </div>
      //   </form>

    );
  }
}

export default withRouter(SignupForm);