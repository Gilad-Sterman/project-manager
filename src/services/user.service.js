import { updateUser } from "../store/user.actions"
import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    signup,
    updateUserDetails,
    logout,
    saveLocalUser,
    getLoggedinUser,
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function login(credentials) {
    try {
        const user = await httpService.post('user/login', credentials)
        if (!user._id) return user
        return saveLocalUser(user)
    } catch (err) {
        console.error('Login failed:', err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post('user/signup', credentials)
        return saveLocalUser(user)
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}

async function updateUserDetails(field, updatedValue, user) {
    try {
        const updates = {
            [field]: updatedValue
        }

        const updatedUser = await httpService.put(`user/${user._id}`, updates)
        updateUser(updatedUser)
        return updatedUser
    } catch (err) {
        console.error('Failed to save list/items:', err)
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err) {
        console.error('Logout failed:', err)
        throw err
    }
}
