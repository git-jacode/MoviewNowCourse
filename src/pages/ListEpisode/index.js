import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Header from '../../components/Header';

class ListEpisode extends Component {
  state = {
    id: this.props.location.state.id,
    name: this.props.location.state.name,
    episodes: [],
  };

  loadEpisode = async () => {
    const db = firebase.firestore();

    const idMovie = this.state.id.trim();

    db.collection(`movies/${idMovie}/episodes`)
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ episodes: [...this.state.episodes, doc.data()] });
        });
      });
  };

  handleWatchEpisode(url_movie, name) {
    this.props.history.push('/watch', { url_movie, name });
  }

  componentDidMount() {
    this.loadEpisode();
  }

  render() {
    return (
      <>
        <Header history={this.props.history} />
        <Container
          style={{
            paddingTop: 50,
            paddingLeft: 10,
            color: '#fff',
          }}
        >
          <h2 style={{ color: '#fff', textAlign: 'center' }}>
            {this.state.name}
          </h2>
          <hr
            style={{ backgroundColor: `rgba(252,252,252,0.5)`, marginTop: 20 }}
          />
          <div>
            <ul style={{ listStyleType: 'none', marginTop: 50 }}>
              {this.state.episodes.map(e => (
                <li
                  key={e.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    verticalAlign: 'middle',
                  }}
                >
                  {e.name}
                  <Button
                    onClick={() => this.handleWatchEpisode(e.url_movie, e.name)}
                    style={{
                      marginLeft: 50,
                      padding: 5,
                      marginBottom: 5,
                      marginTop: -10,
                    }}
                  >
                    Watch
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </>
    );
  }
}
ListEpisode.propTypes = {
  episodes: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url_movie: PropTypes.string,
  }).isRequired,
};

export default ListEpisode;
