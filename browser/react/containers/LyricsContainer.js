import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics} from '../action-creators/lyrics';
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
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  // before component unmounts, unsubscribe
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
    if (this.state.artistQuery && this.state.songQuery) {
      //doing a query to get the data.
      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      .then( res => {
        //Data is sent to our action creator. And the action (result) is sent to the reducer via store.dispatch. The reducer modifies the global state and the new state is sent to local state in componentDidMount.
        store.dispatch(setLyrics(res.data.lyric));
      })
    }

  }

  render() {
    return <Lyrics
      text={this.state.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }

}
