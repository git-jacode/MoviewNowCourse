import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { logout, getEmail } from '../../services/auth';

class Header extends Component {
  state = {
    name: '',
  };

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

  handleLogout() {
    logout();
    firebase.auth().signOut();
    this.notifyError('See you latter');
    setTimeout(() => {
      this.props.history.push('/');
    }, 1500);
  }

  loadName = async () => {
    const db = firebase.firestore();

    db.collection('users')
      .where('email', '==', getEmail())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ name: doc.data().name });
        });
      })
      .catch(function(error) {
        console.log('Error getting documents', error);
      });
  };

  componentDidMount() {
    this.loadName();
  }

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Link to="/main">
            <Navbar.Brand href="">Movie Now</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav>Seja bem-vindo (a), {this.state.name}! </Nav>
            </Nav>
            <Nav classNmae="mr-auto">
              <Button
                variant="outline-danger"
                onClick={() => this.handleLogout()}
              >
                Sign Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
