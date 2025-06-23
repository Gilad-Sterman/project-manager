import { ADD_STAFF_MEMBER, DELETE_STAFF_MEMBER, UPDATE_STAFF_MEMBER } from './staff.reducer'

export function addStaffMember(newMember) {
    return {
        type: ADD_STAFF_MEMBER,
        newMember
    }
}

export function deleteStaffMemeber(memberId) {
    return {
        type: DELETE_STAFF_MEMBER,
        memberId
    }
}

export function updateStaffMember(updatedMember) {
    return {
        type: UPDATE_STAFF_MEMBER,
        member: updatedMember
    }
}
