import React, {Component} from 'react';
import store from '../store';

export default class LyricsContainer extends Component {
  constructor() {
    super();

    // we are setting local state based on global state values (store)
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <h1>Just a container for now!</h1>
    )
  }


}
