import React, { Component } from 'react';
import './styles.scss';
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
        <Container className="container">
          <h2>
            {this.state.name}
          </h2>
          <hr/>
          <div className="list">
            <ul >
              {this.state.episodes.map(e => (
                <li key={e.id}>
                  {e.name}
                  <Button
                    onClick={() => this.handleWatchEpisode(e.url_movie, e.name)}>
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
