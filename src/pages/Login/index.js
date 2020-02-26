import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from 'firebase';
import { login, email, getToken } from '../../services/auth';

class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
  };

  notifySuccess(message) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  notifyError(message) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  handleLogin = async event => {
    event.preventDefault();

    await firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.inputEmail,
        this.state.inputPassword
      )
      .then(success => {
        login(success.user.refreshToken);
        email(success.user.email);
        this.notifySuccess('Login successfull!');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        this.notifyError('Login Failed!');
      });

    setTimeout(() => {
      this.props.history.push('/main');
    }, 1500);
  };

  componentDidMount() {
    if (getToken()) {
      this.props.history.push('/main');
    }
  }

  render() {
    return (
      <Container
        style={{
          paddingTop: 50,
          paddingLeft: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontFamily: 'ubuntu',
            marginBottom: 20,
          }}
        >
          Movies Now
        </h1>
        <Form
          style={{
            backgroundColor: '#fff',
            padding: 60,
            borderRadius: 5,
          }}
          onSubmit={this.handleLogin}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.inputEmail}
              onChange={event =>
                this.setState({ inputEmail: event.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.inputPassword}
              onChange={event =>
                this.setState({ inputPassword: event.target.value })
              }
              required
            />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button
            style={{ width: '100%', marginBottom: 20 }}
            variant="outline-dark"
            type="submit"
          >
            Login
          </Button>

          <Link to="/signIn" style={{ width: '100%', textAlign: 'center' }}>
            <p>Cadastre-se</p>
          </Link>
        </Form>
      </Container>
    );
  }
}

export default Login;
