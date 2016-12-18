import Peer from 'peerjs'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT    = 'CONNECT'
export const CONNECTION  = 'CONNECTION'
export const SEND       = 'SEND'
export const OPEN       = 'OPEN'
export const EMIT       = 'EMIT'
export const INIT       = 'INIT'
export const DATA       = 'DATA'
export const ERROR      = 'ERROR'

// ------------------------------------
// Actions
// ------------------------------------
function connectRTC (peerId) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let state = getState().dataChannel
      let connected = R.find(x => x===peerId)

      if (state.peers && !connected(state.peers)) {
        state.connection.connect(peerId, {
            label: 'midi',
            serialization: 'json'
          })
      }
      dispatch({
        type: CONNECT,
        peerId: peerId
      })
      resolve()
    })
  }
}

function connectionRTC (c) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let state = getState().dataChannel
      let connected = R.find(x => x == c.peer)

      if (!R.find(v => v == c.peer, state.peers)) {
        state.connection.connect(c.peer, {
            label: 'midi',
            serialization: 'json'
          })
      }
      c.on('data', (data) => dispatch(dataRTC(data, c.peer)))
      dispatch({
        type: CONNECTION,
        peerId: c.peer
      })
      resolve()
    })
  }
}

function openRTC (id) {
  return {
    type: OPEN,
    connectionId: id
  }
}

function initRTC (apiKey, debugLevel) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let c = new Peer({
        key: apiKey,
        debug: debugLevel
      }).on('connection', (c) => dispatch(connectionRTC(c)))
        .on('error', dispatch(errorRTC(error)))
        .on('open', (id) => {
          dispatch(openRTC(id))
          resolve(c)
        })
      dispatch({ type: 'INIT', connection: c })
    })
  }
}

function errorRTC (error) {
  return {
    type: ERROR,
    data: error
  }
}

function dataRTC (data, peer) {
  return {
    type: DATA,
    data: data,
    sender: peer
  }
}

function sendRTC (message, id) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      eachActiveConnection(getState(), function(c) {
        c.send(message)
      })
    })
  }
}

function emitRTC (message, sender) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      eachActiveConnection(getState(), function(c) {
        c.send(message)
      })
    })
  }
}

function error (message) {
  console.error(message)
}

export const actions = {
  connectRTC,
  connectionRTC,
  openRTC,
  initRTC,
  errorRTC,
  dataRTC,
  sendRTC,
  emitRTC
}

function eachActiveConnection (state, fn) {
  var actives = state.get('peers')
  var checkedIds = {}

  actives.forEach(function(peerId, index) {
    if (!checkedIds[peerId]) {
      var conns = state.get('connection').connections[peerId]
      conns.forEach(fn)
    }
    checkedIds[peerId] = 1
  })
}

const MIDI_MESSAGES = {
  noteON  : 144,
  noteOFF : 128,
  control : 176
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DATA]: (state, action) => {
    return state
  },
  [INIT]: (state, action) => {
    return R.merge(state, {
      connection: action.connection
    })
  },
  [SEND]: (state, action) => {
    return state
  },
  [EMIT]: (state, action) => {
    return state
  },
  [OPEN]: (state, action) => {
    return R.merge(state, {
      connectionId: action.connectionId
    })
  },
  [CONNECT]: (state, action) => {
    return R.merge(state, {
      peers: R.append(state.peers, action.peerId)
    })
  },
  [CONNECTION]: (state, action) => {
    return R.merge(state, {
      peers: R.append(state.peers, action.peerId)
    })
  },
  [DATA]: (state, action) => {
    switch (action.data[0]) {
      case MIDI_MESSAGES.noteON:
        return state.set(action.data[1], action.data[2])
      case MIDI_MESSAGES.noteOFF:
        return state.delete(action.data[1])
      case MIDI_MESSAGES.control:
        return state.set(action.data[1], action.data[2])
      default:
        return state
      }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  connectionId: '',
  connection: null,
  peers: [],
  scenesrc: ""
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
