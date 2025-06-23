import { itemService } from '../services/item.service'
import { ADD_ITEM, REMOVE_ITEM, SET_ITEMS, UPDATE_ITEM } from './item.reducer'

export function loadItems() {
    return async dispatch => {
        const items = await itemService.query()
        dispatch({ type: SET_ITEMS, items })
    }
}

export function addItem(item) {
    return async dispatch => {
        const savedItem = await itemService.save(item)
        dispatch({ type: ADD_ITEM, item: savedItem })
    }
}

export function updateItem(item) {
    return async dispatch => {
        const savedItem = await itemService.save(item)
        dispatch({ type: UPDATE_ITEM, item: savedItem })
    }
}

export function removeItem(itemId) {
    return async dispatch => {
        await itemService.remove(itemId)
        dispatch({ type: REMOVE_ITEM, itemId })
    }
}
