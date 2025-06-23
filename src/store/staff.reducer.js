export const SET_STAFF = 'SET_STAFF'
export const ADD_STAFF_MEMBER = 'ADD_STAFF_MEMBER'
export const DELETE_STAFF_MEMBER = 'DELETE_STAFF_MEMBER'
export const UPDATE_STAFF_MEMBER = 'UPDATE_STAFF_MEMBER'

const initialState = {
  staff: []
}

export function staffReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STAFF_MEMBER:
      return {
        ...state,
        staff: [action.newMember, ...state.staff]
      }

    case DELETE_STAFF_MEMBER:
      return {
        ...state,
        staff: state.staff.filter(b => b._id !== action.memberId)
      }

    case UPDATE_STAFF_MEMBER:
      return {
        ...state,
        staff: state.staff.map(b => (b._id === action.member._id ? action.member : b))
      }

    default:
      return state
  }
}