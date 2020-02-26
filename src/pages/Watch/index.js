import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Player from '../../components/Player';
import Header from '../../components/Header';

class Watch extends Component {
  render() {
    return (
      <>
        <Header history={this.props.history} />

        <Container>
          <Row>
            <Col>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: '#fff', fontSize: 18, marginTop: 20 }}>
                  {this.props.location.state.name}
                </p>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center',
            }}
          >
            <Player url_movie={this.props.location.state.url_movie} />
          </Row>

          <Row
            style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
          >
            <Button
              onClick={() => this.props.history.goBack()}
              variant="dark"
              style={{ width: 100, margin: 10 }}
            >
              Back
            </Button>
            <Link to="/">
              <Button variant="dark" style={{ width: 100, margin: 10 }}>
                Home
              </Button>
            </Link>
          </Row>
        </Container>
      </>
    );
  }
}

export default Watch;
