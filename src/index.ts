import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import dataChannel, { actions } from './peer'


export default class Ludo {
  public NOTE_DOWN = 0x90;
  public NOTE_UP   = 0x80;

  private store;

  constructor() {
    const middleware = [thunk]
    let rootReducer = this.makeRootReducer();

    this.store = createStore(rootReducer, {}, applyMiddleware(...middleware));
    
    let peerId = window.location.hash.substr(1);

    let rtc = this.store.dispatch(actions.initRTC('bnon5rifq5dygb9', 3))
      .then(() => this.store.dispatch(actions.connectRTC(peerId)))
  }

  public subscribe(f) {
    this.store.subscribe(f);
  }

  public midi(message) {
    this.store.dispatch(actions.sendRTC(message))
  }

  public getMidi(value) {
    return this.store.getState().dataChannel[value]
  }

  public forEachNote(f) {
    for (var key in this.store.getState().dataChannel.notes) {
      f(key);
    }
  }

  private makeRootReducer () {
    return combineReducers({
      dataChannel
    })
  }
}
