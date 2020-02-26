import React, { Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
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
        <Container
          style={{
            paddingTop: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 300,
          }}
        >
          <h1 style={{ color: '#fff', fontFamily: 'ubuntu', marginBottom: 20 }}>
            Moview Now
          </h1>

          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.movies.map(m => (
              <Card style={{ width: 250, margin: 10 }} key={m.id}>
                <Card.Img
                  variant="top"
                  src={m.url_picture}
                  onClick={() => this.handleRedirectToListEpisode(m.id, m.name)}
                  style={{
                    width: 180,
                    height: 300,
                    alignSelf: 'center',
                    paddingTop: 20,
                    cursor: 'pointer',
                  }}
                />
                <Card.Body
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Card.Title>{m.name}</Card.Title>
                  <Card.Text style={{ fontSize: 12 }}>
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
                        style={{
                          width: 200,
                        }}
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
