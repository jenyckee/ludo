import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import dataChannel, { actions } from './peer'

const makeRootReducer = () => {
  return combineReducers({
    dataChannel
  })
}



export default class Ludo {
  public NOTE_DOWN = 0x90;
  public NOTE_UP   = 0x80;

  private store;

  constructor() {
    const middleware = [thunk]
    let rootReducer = makeRootReducer();

    this.store = createStore(rootReducer, {}, applyMiddleware(...middleware));
    
    let peerId = window.location.hash.substr(1);

    let rtc = this.store.dispatch(actions.initRTC('bnon5rifq5dygb9', 3))
      .then(() => this.store.dispatch(actions.connectRTC(peerId)))
  }

  public midi(store, message) {
    this.store.dispatch(actions.sendRTC(message))
  }

  private makeRootReducer () {
    return combineReducers({
      dataChannel
    })
  }
}
