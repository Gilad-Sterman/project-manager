import { useState } from 'react'
import { MsgModal } from './MsgModal'
import { utilService } from '../services/util.service'
import { useDispatch } from 'react-redux'
import { addStaffMember } from '../store/staff.actions'

export function AddNewModal({ type = 'board', addFunc, objectToAdd, setShowAdd, team = [], items = [] }) {
    const [newObject, setNewObject] = useState(objectToAdd)
    const [selectedTeamIds, setSelectedTeamIds] = useState([])
    const [selectedItemIds, setSelectedItemIds] = useState([])
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
        if (target.name === 'items') {
            setSelectedItemIds(selectedOptions.filter(option => option))
        } else {
            setSelectedTeamIds(selectedOptions.filter(option => option))
        }
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
            if (!staffMembers.includes(newObject.manager)) staffMembers.unshift(newObject.manager)
            const manager = team.find(m => m._id === newObject.manager)
            finalObj = {
                ...newObject,
                staffMembers,
                manager
            }
        }
        if (type === 'team') {
            finalObj = newObject
        }
        if (type === "task") {
            if (!newObject.name) {
                showMsg('נא למלא את כל השדות')
                return
            }
            const teamMembers = normalizeStaffMembers(team, selectedTeamIds, newMembersInput)
            // if (!teamMembers.length) {
            //     showMsg('נא למלא את כל השדות')
            //     return
            // }
            finalObj = {
                ...newObject,
                teamMembers,
                items: selectedItemIds
            }

        }
        if (type === "item") {
            if (!newObject.name) {
                showMsg('נא למלא את כל השדות')
                return
            }
            finalObj = {
                ...newObject,
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
            <h3>{type === 'task' ? 'הוספת משימה' : type === 'board' ? 'הוספת לוח פרוייקט' : type === 'task' ? 'הוספה לצוות' : 'הוספת פריט'}</h3>
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
                    <label htmlFor="deadline">צפי סיום: </label>
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
                    <>
                        <div className="my-input select">
                            <label htmlFor="manager" className="select-label">בחירת אחראי לפרוייקט</label>
                            <select
                                name="manager"
                                id="manager"
                                onChange={handleInput}
                                size={Math.min(5, team.length)}
                            >
                                <option key={'no'} value={''}>{''}</option>
                                {team.map(tm => (
                                    <option key={tm._id} value={tm._id}>{tm.fName} {tm.lName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="my-input select">
                            <label htmlFor="teamMembersSelect" className="select-label">בחירת חברי צוות (לחיצה עם Ctrl/Command לבחירה מרובה)</label>
                            <select
                                multiple
                                name="teamMembersSelect"
                                id="teamMembersSelect"
                                onChange={handleSelectChange}
                                size={Math.min(5, team.length)}
                            >
                                <option key={'no'} value={''}>{''}</option>
                                {team.map(tm => (
                                    <option key={tm._id} value={tm._id}>{tm.fName} {tm.lName}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <div className="my-input">
                    <label htmlFor="requestedBy">דורש הפרוייקט</label>
                    <input type="text" name="requestedBy" id="requestedBy" required onChange={handleInput} />
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
                    <label htmlFor="draftDate">תאריך גיוס: </label>
                    <input
                        className="date-input"
                        type="date"
                        name="draftDate"
                        id="draftDate"
                        value={newObject.draftDate}
                        onChange={handleInput}
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="fName">שם:</label>
                    <input
                        type='text'
                        name="fName"
                        id="fName"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="lName">שם משפחה:</label>
                    <input
                        type='text'
                        name="lName"
                        id="lName"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="pNum">מספר אישי:</label>
                    <input
                        type='text'
                        name="pNum"
                        id="pNum"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="idNum">ת.ז:</label>
                    <input
                        type='text'
                        name="idNum"
                        id="idNum"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="phone">טל':</label>
                    <input
                        type='phone'
                        name="phone"
                        id="phone"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="rank">דרגה:</label>
                    <input
                        type='text'
                        name="rank"
                        id="rank"
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="my-input">
                    <label htmlFor="role">תפקיד:</label>
                    <input
                        type='text'
                        name="role"
                        id="role"
                        onChange={handleInput}
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
                                <option key={tm._id} value={tm._id}>{tm.fName} {tm.lName}</option>
                            ))}
                        </select>
                    </div>
                )}
                {items.length > 0 && (
                    <div className="my-input select">
                        <label htmlFor="items" className="select-label">בחר פריטים (לחיצה עם Ctrl/Command לבחירה מרובה)</label>
                        <select
                            multiple
                            name="items"
                            id="items"
                            onChange={handleSelectChange}
                            size={Math.min(5, items.length)}
                        >
                            {items.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="btn-add" type="submit">הוספה</button>
            </form>}
            {type === 'item' && (
                <form onSubmit={onAdd}>
                    <div className="my-input">
                        <label htmlFor="name">שם</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={newObject.name}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="my-input">
                        <label htmlFor="type">סוג פריט</label>
                        <input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="בחר או כתוב סוג חדש"
                            value={newObject.type}
                            onChange={handleInput}
                            list="item-type-list"
                        />
                        {/* Optional: populate with existing types */}
                        <datalist id="item-type-list">
                            {Array.from(new Set(team.flatMap(member => member.type ? [member.type] : []))).map((typeOption, idx) => (
                                <option key={idx} value={typeOption} />
                            ))}
                        </datalist>
                    </div>
                    <div className="my-input">
                        <label htmlFor="division">מחלקה</label>
                        <input
                            type="text"
                            name="division"
                            id="division"
                            value={newObject.division}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="my-input">
                        <label htmlFor="quantity">כמות</label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={newObject.quantity}
                            onChange={handleInput}
                            min="1"
                        />
                    </div>

                    <button className="btn-add" type="submit">הוספה</button>
                </form>
            )}
            {showMsgModal && <MsgModal text={showMsgModal} />}
        </section>
    )
}
