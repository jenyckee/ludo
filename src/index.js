import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import dataChannel, { actions } from './peer'

const makeRootReducer = () => {
  return combineReducers({
    dataChannel
  })
}

export function Ludo(peer) {
  const middleware = [thunk]
  let store = createStore(
    makeRootReducer(),
    {},
    applyMiddleware(...middleware))

  let rtc = store.dispatch(actions.initRTC('bnon5rifq5dygb9', 1))
    .then(() => store.dispatch(actions.connectRTC(peer)))

  return store
}

export function midi(store, message) {
  store.dispatch(actions.sendRTC(message))
}

export const NOTE_DOWN = 0x90
export const NOTE_UP   = 0x80

export default Ludo
