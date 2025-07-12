// services/item.service.js
import { httpService } from './http.service'
import { utilService } from './util.service'

const ITEM_URL = 'item/' // assuming your backend handles /api/item

export const itemService = {
    query,
    loadItems,
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

function loadItems(items, filterBy) {
    const { txt = '', sortBy = 'name', sortDir = 1, selectedTypes = [] } = filterBy

    const normalize = str => str ? str.trim().toLowerCase() : ''

    let filteredItems = [...items]

    if (txt) {
        const normTxt = normalize(txt)
        filteredItems = filteredItems.filter(item =>
            normalize(item.name).includes(normTxt) ||
            normalize(item.type).includes(normTxt) ||
            normalize(item.category).includes(normTxt)
        )
    }

    if (selectedTypes.length) {
        filteredItems = filteredItems.filter(item => selectedTypes.includes(item.itemType))
    }

    filteredItems.sort((a, b) => {
        let valA = a[sortBy]
        let valB = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'deadline') {
            valA = new Date(valA).getTime()
            valB = new Date(valB).getTime()
        } else if (typeof valA === 'string') {
            valA = normalize(valA)
            valB = normalize(valB)
        }

        return (valA < valB ? -1 : valA > valB ? 1 : 0) * sortDir
    })

    return filteredItems
}


