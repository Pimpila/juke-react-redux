import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';
import axios from 'axios';

export default class extends Component {

  constructor() {

    super();

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // once component mounts, update local state with store state
  componentDidMount() {
    // set subscribe to a reference on the component so you can call it later (in componentWillUnmount)
    this.unsubscribe = store.subscribe(() => {
      this.setState({lyrics: store.getState().lyrics}); // pull off just the .lyrics part of global state.
    });
  }
  // before component unmounts, unsubscribe. this turns off the listening we activated in subsbribe, so when global state changes, we're no longer trying to update our LyricsContainer's local state because our view is no longer mounted.
  componentWillUnmount() {
    this.unsubscribe();
  }

  // sets artistQuery in local state
  handleArtistInput(artist) {
    this.setState({ artistQuery: artist });
  }

  // sets songQuery in local state
  handleSongInput(song) {
    this.setState({ songQuery: song });
  }

  handleSubmit(event) {
    event.preventDefault()
    //this submit event will dispatch the selected artist and song to the middleware action creator (fetchLyrics).
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

  render() {
    return <Lyrics
      text={this.state.lyrics.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }

}
