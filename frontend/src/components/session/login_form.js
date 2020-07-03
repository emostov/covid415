import React, { useReducer, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap'

import '../../styles/session_form.scss'

const LoginForm = (props) => {
  const { currentUser, history, login, errors } = props;

  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: ''
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

    let user = {
      ...filterInput
    };

    login(user);
  };

  const demoLogin = () => {

    let user = {
      email: 'rayleensharp@gmail.com',
      password: 'password'
    };

    login(user);
  }

  const renderErrors = () => {
    // By default wll return an empty <ul>
    return (
      <ul className='errors-list'>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            <Alert variant='warning'>
              {errors[error]}
            </Alert>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className=' login session'>
      <Card.Title className='session'>
        <strong>Welcome back, neighbor.</strong>
      </Card.Title>
      {renderErrors()}
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name='email'
            type="email"
            placeholder="Enter email"
            value={filterInput.email}
            onChange={e => update(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            type="password"
            placeholder="Password"
            value={filterInput.password}
            onChange={e => update(e)}
          />
        </Form.Group>
      </Form>
      <Button
        className='session-btn'
        type="submit"
        onClick={() => handleSubmit()}
        variant='secondary'>
        Log in
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

export default withRouter(LoginForm);