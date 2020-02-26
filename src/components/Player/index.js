import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Player extends Component {
  render() {
    return <ReactPlayer controls url={this.props.url_movie} playing />;
  }
}

export default Player;
