import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './item.reducer'

export function addItem(newItem) {
    return {
        type: ADD_ITEM,
        newItem
    }
}

export function deleteItem(itemId) {
    return {
        type: DELETE_ITEM,
        itemId
    }
}

export function updateItem(updatedItem) {
    return {
        type: UPDATE_ITEM,
        item: updatedItem
    }
}
