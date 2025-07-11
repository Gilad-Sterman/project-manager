import { io } from "socket.io-client";

const baseUrl = 'http://localhost:3030'

export const socketService = createSocketService()
export const socket = io(baseUrl)
// export const socket = new WebSocket("ws://localhost:3030");
socketService.setup()

function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        },
    }
    return socketService
}
