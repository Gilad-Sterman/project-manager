import { ADD_BOARD, DELETE_BOARD, UPDATE_BOARD } from './board.reducer'

export function addBoard(newBoard) {
  return {
    type: ADD_BOARD,
    board: newBoard
  }
}

export function deleteBoard(boardId) {
  return {
    type: DELETE_BOARD,
    boardId
  }
}

export function updateBoard(updatedBoard) {
  return {
    type: UPDATE_BOARD,
    board: updatedBoard
  }
}



// export function loadItems() {
//     return async dispatch => {
//         const items = await itemService.query()
//         dispatch({ type: SET_ITEMS, items })
//     }
// }

// export function addItem(item) {
//     return async dispatch => {
//         const savedItem = await itemService.save(item)
//         dispatch({ type: ADD_ITEM, item: savedItem })
//     }
// }

// export function updateItem(item) {
//     return async dispatch => {
//         const savedItem = await itemService.save(item)
//         dispatch({ type: UPDATE_ITEM, item: savedItem })
//     }
// }

// export function removeItem(itemId) {
//     return async dispatch => {
//         await itemService.remove(itemId)
//         dispatch({ type: REMOVE_ITEM, itemId })
//     }
// }
