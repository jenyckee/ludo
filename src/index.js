import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import dataChannel, { actions } from './peer'


export default class Ludo {
  constructor() {
    this.NOTE_DOWN = 0x90;
    this.NOTE_UP   = 0x80;

    const middleware = [thunk]
    let rootReducer = this.makeRootReducer();
    let peerId = window.location.hash.substr(1);
    
    this.store = createStore(rootReducer, {}, applyMiddleware(...middleware));
    this.store.dispatch(actions.initRTC('bnon5rifq5dygb9', 3))
      .then(() => this.store.dispatch(actions.connectRTC(peerId)))
  }

  subscribe(f) {
    this.store.subscribe(f);
  }

  midi(message) {
    this.store.dispatch(actions.sendRTC(message))
  }

  getMidi(value) {
    return this.store.getState().dataChannel[value]
  }

  forEachNote(f) {
    for (var key in this.store.getState().dataChannel.notes) {
      f(key);
    }
  }

  makeRootReducer () {
    return combineReducers({
      dataChannel
    })
  }
}
