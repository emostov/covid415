import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap';

const SignupForm = (props) => {

  const { login, errors, currentUser, history, signup } = props;

  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      password2: '',
    }
  );

  useEffect(() => {
    if (currentUser === true) {
      history.push('/');
    }
  }, [currentUser]);

  const update = (e) => {
    const { name, value } = e.target;
    setFilterInput({ [name]: value });
  };

  const handleSubmit = () => {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      password2
    } = filterInput;

    const user = {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      password2,
    };

    signup(user, history);
  };

  const demoLogin = () => {

    let user = {
      email: 'rayleensharp@gmail.com',
      password: 'password',
    };

    login(user);
  }

  const renderErrors = () => {
    return (
      <ul className='errors-list'>
        {Object.keys(errors).map((error, i) => (
          <li>
            <Alert key={`error-${i}`} variant='warning'>
              {errors[error]}
            </Alert>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className='session signup'>
      <Card.Title className='session'>
        <strong>Help keep the 415 alive. Sign up now!</strong>
      </Card.Title>
      {renderErrors()}
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='email'
            type="email"
            placeholder="Email"
            value={filterInput.email}
            onChange={e => update(e)}
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
                name='firstName'
                placeholder="First Name"
                value={filterInput.firstName}
                onChange={e => update(e)}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name='lastName'
                placeholder="Last Name"
                value={filterInput.lastName}
                onChange={e => update(e)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name='phoneNumber'
                type="tel"
                placeholder="XXX-XXX-XXXX"
                value={filterInput.phoneNumber}
                onChange={e => update(e)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type="password"
              placeholder="Password"
              value={filterInput.password}
              onChange={e => update(e)}
            />
          </Col>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='password2'
              type="password"
              value={filterInput.password2}
              placeholder="Confirm Password"
              onChange={e => update(e)}
            />
          </Col>
        </Row>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree to be a good neighbor" />
        </Form.Group>
      </Form>
      <Button
        className='session-btn'
        type="submit"
        onClick={() => handleSubmit()}
        variant='secondary'>
        Create account
                </Button>
      <Button
        className='demo-btn'
        type="submit"
        onClick={() => demoLogin()}
        variant='secondary'>
        Just demo for now
                </Button>
    </Card>
  );
}

export default withRouter(SignupForm);