import { createStore, combineReducers } from 'redux'
import { userReducer } from './user.reducer'
import { boardReducer } from './board.reducer'
import { taskReducer } from './task.reducer'
import { staffReducer } from './staff.reducer'
import { itemReducer } from './item.reducer'
import { boards, staff, items } from '../services/demoData.service'

// Storage helpers
const STORAGE_KEY = 'appState'
const DATA_VERSION = '2.0' // Increment this when you want to reset data

function saveState(state) {
  const stateWithVersion = {
    ...state,
    dataVersion: DATA_VERSION
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithVersion))
}

function loadState() {
  const stored = sessionStorage.getItem(STORAGE_KEY)
  
  if (stored) {
    const parsedState = JSON.parse(stored)
    
    // Check if stored data version matches current version
    if (parsedState.dataVersion === DATA_VERSION) {
      return parsedState
    } else {
      console.log('Data version mismatch, loading fresh demo data')
      // Clear old data when version doesn't match
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  // Return fresh demo data
  return {
    boardModule: { boards: boards },
    staffModule: { staff: staff },
    itemModule: { items: items },
    taskModule: { tasks: [] },
    userModule: { user: null },
    dataVersion: DATA_VERSION
  }
}

// Root reducer
const rootReducer = combineReducers({
  userModule: userReducer,
  boardModule: boardReducer,
  taskModule: taskReducer,
  staffModule: staffReducer,
  itemModule: itemReducer,
})

// Redux devtools + preloaded state
const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined

const preloadedState = loadState()

export const store = createStore(rootReducer, preloadedState, middleware)

// Subscribe to save state on every change
store.subscribe(() => {
  saveState({
    boardModule: store.getState().boardModule,
    taskModule: store.getState().taskModule,
    staffModule: store.getState().staffModule,
    userModule: store.getState().userModule,
    itemModule: store.getState().itemModule,
  })

  // console.log('**** Store state changed: ****')
  // console.log('storeState:\n', store.getState())
  // console.log('*******************************')
})