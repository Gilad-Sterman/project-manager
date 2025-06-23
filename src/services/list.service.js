import { store } from "../store/store"
import { updateUser } from "../store/user.actions"
import { SET_USER } from "../store/user.reducer"
import { httpService } from "./http.service"
import { utilService } from "./util.service"

export const listService = {
    save,
    remove,
    updateItem,
    addItem,
    removeItem,
    // getLists() {
    //     return store.getters.user?.lists || []
    // },

    // getById(listId) {
    //     const lists = store.getters.user?.lists || []
    //     return lists.find(l => l._id === listId)
    // },
}

async function save(list, items, user) {
    if (!user) return
    try {
        // Update user's lists
        const updatedLists = user.lists.map(l =>
            l._id === list._id ? list : l
        )

        if (!list._id) {
            list._id = utilService.generateRandomId()
            list.itemIds = []
            updatedLists.unshift(list)
        }

        // Combine old and new items
        const existingItems = user.items || []
        const itemMap = {}
            ;[...existingItems, ...items].forEach(item => {
                itemMap[item._id] = item
            })

        const updatedItems = Object.values(itemMap)

        const updates = {
            lists: updatedLists,
            items: updatedItems
        }

        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return { list, items: updatedItems }
    } catch (err) {
        console.error('Failed to save list/items:', err)
        throw err
    }
}

async function remove(listId, user) {
    if (!user) return
    try {
        const updatedLists = user.lists.filter(list => list._id !== listId)

        const updates = { lists: updatedLists }
        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return listId
    } catch (err) {
        console.error('Failed to remove list:', err)
        throw err
    }
}

async function updateItem(updatedItem, user) {
    try {
        const updatedItems = user.items.map(item => {
            if (item._id === updatedItem._id) return updatedItem
            return item
        })

        const updates = {
            items: updatedItems
        }

        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return updatedItems
    } catch (err) {
        console.error('Failed to save list/items:', err)
        throw err
    }
}

async function addItem(item, user) {
    try {
        user.items.unshift(item)
        const updatedItems = user.items

        const updates = {
            items: updatedItems
        }

        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return item
    } catch (err) {
        console.error('Failed to save list/items:', err)
        throw err
    }
}

async function removeItem(newLists, newItems, user) {
    try {
        const updates = {
            lists: newLists,
            items: newItems
        }

        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return newItems
    } catch (err) {
        console.error('Failed to save list/items:', err)
        throw err
    }
}
