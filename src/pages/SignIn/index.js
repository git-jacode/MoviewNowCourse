import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class SignIn extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    inputConfirmPassword: '',
    inputName: '',
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

  handleRegister = async event => {
    event.preventDefault();

    const name = this.state.inputName;

    if (this.state.inputPassword === this.state.inputConfirmPassword) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.inputEmail,
          this.state.inputPassword
        )
        .then(function(success) {
          const cloudFirestore = firebase.firestore();

          cloudFirestore
            .collection('users')
            .add({
              name,
              email: success.user.email,
              uid: success.user.uid,
              id: '',
            })
            .then(function(doc) {
              cloudFirestore
                .collection('users')
                .doc(doc.id)
                .update({
                  id: doc.id,
                });
            })
            .catch(function(error) {
              console.error('Error adding domcument', error);
            });
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      this.notifySuccess('Congratulations!');
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500);
    } else {
      this.notifyError('Password does not match!');
    }
  };

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
          onSubmit={this.handleRegister}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={this.state.inputName}
              onChange={event =>
                this.setState({ inputName: event.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

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
              Well never share your email with anyone else.
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={this.state.inputConfirmPassword}
              onChange={event =>
                this.setState({ inputConfirmPassword: event.target.value })
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
            Register
          </Button>

          <Link to="/" style={{ width: '100%', textAlign: 'center' }}>
            <p>Login</p>
          </Link>
        </Form>
      </Container>
    );
  }
}

export default SignIn;
