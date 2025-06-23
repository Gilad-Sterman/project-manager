export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const DELETE_BOARD = 'DELETE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

const initialState = {
  boards: []
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [action.board, ...state.boards]
      }

    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(b => b._id !== action.boardId)
      }

    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map(b => (b._id === action.board._id ? action.board : b))
      }

    default:
      return state
  }
}
