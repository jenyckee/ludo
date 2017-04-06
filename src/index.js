import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import dataChannel, { actions } from './peer'

export const NOTE_DOWN = 0x90;
export const NOTE_UP   = 0x80;

export function initialize() {
  const middleware = [thunk]
  let rootReducer = makeRootReducer();
  let peerId = window.location.hash.substr(1);

  let store = createStore(rootReducer, {}, applyMiddleware(...middleware));
  store.dispatch(actions.initRTC('bnon5rifq5dygb9', 3))
    .then(() => store.dispatch(actions.connectRTC(peerId)))

  return store;
}

export function midi(store, message) {
  store.dispatch(actions.sendRTC(message))
}

export function getMidi(store, value) {
  return store.getState().dataChannel.notes[value]
}

export function forEachNote(store, f) {
  for (var key in store.getState().dataChannel.notes) {
    f(key);
  }
}

export function makeRootReducer () {
  return combineReducers({
    dataChannel
  })
}
