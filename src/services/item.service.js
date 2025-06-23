// services/item.service.js
import { httpService } from './http.service'
import { utilService } from './util.service'

const ITEM_URL = 'item/' // assuming your backend handles /api/item

export const itemService = {
    query,
    getById,
    save,
    remove
}

async function query() {
    return await httpService.get(ITEM_URL)
}

async function getById(itemId) {
    return await httpService.get(`${ITEM_URL}${itemId}`)
}

async function remove(itemId) {
    return await httpService.delete(`${ITEM_URL}${itemId}`)
}

async function save(item) {
    if (item._id) {
        return await httpService.put(`${ITEM_URL}${item._id}`, item)
    } else {
        // Optionally assign a temp ID for optimistic updates
        item._id = utilService.generateRandomId()
        return await httpService.post(ITEM_URL, item)
    }
}
