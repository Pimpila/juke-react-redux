import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';
import axios from 'axios';

export default class extends Component {

  constructor() {

    super();

    // local state made up of user input and all of the store.
    // b/c we subscribe below just the lyrics piece will update every time the store updates.

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
    // create a reference to store.subscribe within the component
    // so you can call it later (in componentWillUnmount)
    // here's we're pulling off just the .lyrics part of global state.
    this.unsubscribe = store.subscribe(() => {
      this.setState({lyrics: store.getState().lyrics});
    });
  }
  // before component unmounts, unsubscribe. this is possible b/c store.subscribe is
  // wired to also return a function that will turn the subsscribing off. so when global
  // state changes, we're no longer trying to update our LyricsContainer's local state
  // because our view is no longer mounted.
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
    // our event handler dispatches the selected artist and song to
    // the middleware action creator (fetchLyrics).
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



