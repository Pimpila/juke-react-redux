import store from './store';

const initialState = Object.assign({
  albums: [],
  artists: [],
  selectedAlbum: {},
  selectedArtist: {},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0,
  playlists: [],
  selectedPlaylist: {},
  songs: []
}, store.getState());

export default initialState;
