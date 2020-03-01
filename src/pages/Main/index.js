import React, { Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import './styles.scss';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Header from '../../components/Header';

class Main extends Component {
  state = {
    movies: [],
  };

  loadMovie = async () => {
    const db = firebase.firestore();

    db.collection('movies')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ movies: [...this.state.movies, doc.data()] });
        });
      });
  };

  handleRedirectToListEpisode(id, name) {
    this.props.history.push('/episodes', { id, name });
  }

  componentDidMount() {
    this.loadMovie();
  }

  render() {
    return (
      <>
        <Header history={this.props.history} />
        <Container className="container">
          <h1 >
            Moview Now
          </h1>

          <Row>
            {this.state.movies.map(m => (
              <Card key={m.id}  className="card">
                <Card.Img
                  variant="top"
                  src={m.url_picture}
                  onClick={() => this.handleRedirectToListEpisode(m.id, m.name)}
                 
                />
                <Card.Body
                 
                >
                  <Card.Title style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{m.name}</Card.Title>
                  <Card.Text>
                    {m.description}
                  </Card.Text>
                  <Row>
                    <Col />

                    <Col>
                      <Button
                        variant="outline-dark"
                        onClick={() =>
                          this.handleRedirectToListEpisode(m.id, m.name)
                        }                       
                      >
                        Watch
                      </Button>
                    </Col>

                    <Col />
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

Main.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Main;
