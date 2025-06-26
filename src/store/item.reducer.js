export const SET_ITEMS = 'SET_ITEMS'
export const ADD_ITEM = 'ADD_ITEM_'
export const DELETE_ITEM = 'DELETE_ITEM_'
export const UPDATE_ITEM= 'UPDATE_ITEM'

const initialState = {
  items: []
}

export function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [action.newItem, ...state.items]
      }

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(b => b._id !== action.itemId)
      }

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(b => (b._id === action.item._id ? action.item : b))
      }

    default:
      return state
  }
}