// ACTION CREATOR

import {SET_LYRICS} from '../constants';
import axios from 'axios';

export const setLyrics = function (text) {
  return {
    type: SET_LYRICS,
    lyric: text
  };
};


export const fetchLyrics = function (artist, song) {
  return function (dispatch, getState) {
    //doing a query to get the data
    axios.get(`/api/lyrics/${artist}/${song}`)
      .then(res => {
         //Data is sent to our other action creator (setLyrics). The setLyrics reducer modifies the global state and the new state is sent to local state in LyricsContainer's componentDidMount.
        dispatch(setLyrics(res.data.lyric));
      });
  };
};
