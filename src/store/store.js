import { createStore, combineReducers } from 'redux'
import { userReducer } from './user.reducer'
import { boardReducer } from './board.reducer'
import { taskReducer } from './task.reducer'
import { staffReducer } from './staff.reducer'

// Storage helpers
const STORAGE_KEY = 'appState'

function saveState(state) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function loadState() {
  const stored = sessionStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : undefined
}

// Root reducer
const rootReducer = combineReducers({
  userModule: userReducer,
  boardModule: boardReducer,
  taskModule: taskReducer,
  staffModule: staffReducer,
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
  })
  
  console.log('**** Store state changed: ****')
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})
