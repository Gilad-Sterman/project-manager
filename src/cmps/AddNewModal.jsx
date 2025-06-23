import { useState } from 'react'
import { MsgModal } from './MsgModal'
import { utilService } from '../services/util.service'
import { useDispatch } from 'react-redux'
import { addStaffMember } from '../store/staff.actions'

export function AddNewModal({ type = 'board', addFunc, objectToAdd, setShowAdd, team = [] }) {
    const [newObject, setNewObject] = useState(objectToAdd)
    const [selectedTeamIds, setSelectedTeamIds] = useState([])
    const [showMsgModal, setShowMsgModal] = useState(false)
    const [newMembersInput, setNewMembersInput] = useState('')
    const dispatch = useDispatch()

    function handleInput({ target }) {
        const value = target.type === 'number' ? +target.value : target.value
        setNewObject(prev => ({ ...prev, [target.name]: value }))
    }

    function handleNewMembersInput({ target }) {
        setNewMembersInput(target.value)
    }

    function handleSelectChange({ target }) {
        const selectedOptions = Array.from(target.selectedOptions, opt => opt.value)
        setSelectedTeamIds(selectedOptions.filter(option => option))
    }

    function onAdd(ev) {
        ev.preventDefault()
        let finalObj
        if (type === "board") {
            if (!newObject.name) {
                showMsg('נא למלא את כל השדות')
                return
            }
            const staffMembers = normalizeStaffMembers(team, selectedTeamIds, newMembersInput)
            finalObj = {
                ...newObject,
                staffMembers
            }
        }
        if (type === 'team') {
            const names = newObject.names
                .split(/[,|]/)
                .map(name => name.trim())
                .filter(name => name)

            if (!names.length) return alert('נא להזין לפחות שם אחד')

            finalObj = names.map(name => ({
                _id: utilService.generateRandomId(),
                name,
                createdAt: newObject.createdAt || new Date().toISOString().split('T')[0]
            }))
        }
        if (type === "task") {
            if (!newObject.name) {
                showMsg('נא למלא את כל השדות')
                return
            }
            const teamMembers = normalizeStaffMembers(team, selectedTeamIds, newMembersInput)
            if (!teamMembers.length) {
                showMsg('נא למלא את כל השדות')
                return
            }
            finalObj = {
                ...newObject,
                teamMembers
            }
        }
        addFunc(finalObj)
    }

    function normalizeStaffMembers(existingStaff, selectedIds, newMembersInput) {
        const finalMemberIds = [...selectedIds] // Start with selected IDs (from multi-select)

        const namesArr = newMembersInput
            ? newMembersInput.split('|').map(name => name.trim()).filter(name => name)
            : []

        namesArr.forEach(name => {
            const existingMember = existingStaff.find(member => member.name === name)
            if (existingMember) {
                // Name already exists → use their _id
                if (!finalMemberIds.includes(existingMember._id)) finalMemberIds.push(existingMember._id)
            } else {
                // New member → create, add to store, push ID
                const newMember = {
                    _id: utilService.generateRandomId(),
                    name
                }
                dispatch(addStaffMember(newMember))
                finalMemberIds.push(newMember._id)
            }
        })
        return finalMemberIds
    }

    function showMsg(msg) {
        setShowMsgModal(msg)
        setTimeout(() => setShowMsgModal(false), 2500)
    }

    return (
        <section className="add-new-modal" onClick={ev => ev.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAdd(false)}>
                <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="close" />
            </button>
            <h3>{type === 'task' ? 'הוספת משימה' : type === 'board' ? 'הוספת לוח פרוייקט' : 'הוספה לצוות'}</h3>
            {type === 'board' && <form>
                <div className='dates'>
                    <label htmlFor="createdAt">תאריך יצירה: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="createdAt"
                        id="createdAt"
                        value={newObject.createdAt}
                        onChange={handleInput}
                    />
                    <label htmlFor="deadline">תאריך סיום: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="deadline"
                        id="deadline"
                        value={newObject.deadline}
                        onChange={handleInput}
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="name">שם</label>
                    <input type="text" name="name" id="name" required onChange={handleInput} />
                </div>
                <div className="my-input">
                    <label htmlFor="description">תיאור</label>
                    <textarea name="description" id="description" required onChange={handleInput} />
                </div>
                {team.length > 0 && (
                    <div className="my-input select">
                        <label htmlFor="teamMembersSelect" className="select-label">בחר משתתפים קיימים (לחיצה עם Ctrl/Command לבחירה מרובה)</label>
                        <select
                            multiple
                            name="teamMembersSelect"
                            id="teamMembersSelect"
                            onChange={handleSelectChange}
                            size={Math.min(5, team.length)}
                        >
                            <option key={'no'} value={''}>{''}</option>
                            {team.map(tm => (
                                <option key={tm._id} value={tm._id}>{tm.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="my-input">
                    <label htmlFor="newMembersInput">משתתפים חדשים (הפרד עם |)</label>
                    <input
                        type="text"
                        name="newMembersInput"
                        id="newMembersInput"
                        value={newMembersInput}
                        onChange={handleNewMembersInput}
                        placeholder="שמות המשתתפים להפריד ב |"
                    />
                </div>
                <button className="btn-add" onClick={onAdd}>הוספה</button>
            </form>}
            {type === 'team' && <form onSubmit={onAdd}>
                <div className='dates'>
                    <label htmlFor="createdAt">תאריך יצירה: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="createdAt"
                        id="createdAt"
                        value={newObject.createdAt}
                        onChange={handleInput}
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="names">שמות (מופרדים בפסיק או קו | )</label>
                    <textarea
                        name="names"
                        id="names"
                        rows="3"
                        onChange={handleInput}
                        placeholder="ישראל ישראלי, דנה כהן | יואב לוי"
                        required
                    />
                </div>

                <button className="btn-add" type="submit">הוספה</button>
            </form>}
            {type === 'task' && <form onSubmit={onAdd}>
                <div className='dates'>
                    <label htmlFor="createdAt">תאריך יצירה: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="createdAt"
                        id="createdAt"
                        value={newObject.createdAt}
                        onChange={handleInput}
                    />
                    <label htmlFor="deadline">תאריך סיום: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="deadline"
                        id="deadline"
                        value={newObject.deadline}
                        onChange={handleInput}
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="name">שם</label>
                    <input type="text" name="name" id="name" required onChange={handleInput} />
                </div>
                <div className="my-input">
                    <label htmlFor="description">תיאור</label>
                    <textarea name="description" id="description" required onChange={handleInput} />
                </div>
                {team.length > 0 && (
                    <div className="my-input select">
                        <label htmlFor="teamMembersSelect" className="select-label">בחר משתתפים (לחיצה עם Ctrl/Command לבחירה מרובה)</label>
                        <select
                            multiple
                            name="teamMembersSelect"
                            id="teamMembersSelect"
                            onChange={handleSelectChange}
                            size={Math.min(5, team.length)}
                        >
                            {team.map(tm => (
                                <option key={tm._id} value={tm._id}>{tm.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="btn-add" type="submit">הוספה</button>
            </form>}
            {showMsgModal && <MsgModal text={showMsgModal} />}
        </section>
    )
}
