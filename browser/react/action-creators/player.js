// ACTION CREATOR

import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST} from '../constants';


export const startPlaying = function () {
  return {
    type: START_PLAYING,
    isPlaying: true,
  };
};

export const stopPlaying = function () {
  return {
    type: STOP_PLAYING,
    isPlaying: false,
  };
};

export const SetCurrentSong = function () {
  return {
    type: SET_CURRENT_SONG,
    isPlaying: false,
  };
};



