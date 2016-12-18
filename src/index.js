// import Rx from 'rx'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import dataChannel, { actions } from './peer'


function getId() {
  return window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
}

const makeRootReducer = () => {
  return combineReducers({
    dataChannel
  })
}

export function Ludo() {
  const middleware = [thunk]
  let store = createStore(
    makeRootReducer(),
    {},
    applyMiddleware(...middleware))

  let rtc = store.dispatch(actions.initRTC('bnon5rifq5dygb9', 1))
  .then(() => store.dispatch(actions.connectRTC('jsjvk3riy3p1ra4i')))
  return rtc
}

export default Ludo
