import { useState } from 'react'
import { Trash2, Edit, Save, X } from 'lucide-react'
import { utilService } from '../services/util.service'

export function TeamPreview({ member, onDelete, onEdit, boards }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editMember, setEditMember] = useState({ ...member })

    const memberBoards = boards.filter(board => board.staffMembers.includes(member._id))

    function handleInputChange(ev) {
        const { name, value } = ev.target
        setEditMember(prev => ({ ...prev, [name]: value }))
    }

    function handleSave(ev) {
        ev.stopPropagation()
        onEdit(editMember)
        setIsEditing(false)
    }

    function handleCancel(ev) {
        ev.stopPropagation()
        setEditMember({ ...member })
        setIsEditing(false)
    }

    function handleInputClick(ev) {
        ev.stopPropagation()
    }

    return (
        <div className={`team-preview ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="avatar" style={{ backgroundColor: utilService.stringToColor(member._id) }}>
                {member.fName.charAt(0)}.
                {member.lName.charAt(0)}
            </div>

            <div className="info">
                {isEditing ? (
                    <>
                        <section className='dates'>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="createdAt">תאריך יצירה: </label>
                                <input
                                    className='date-input'
                                    type="date"
                                    name="createdAt"
                                    id='createdAt'
                                    value={editMember.createdAt}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="draftDate">תאריך גיוס: </label>
                                <input
                                    className='date-input'
                                    type="date"
                                    name="draftDate"
                                    id='draftDate'
                                    value={editMember.draftDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </section>
                        <section className='edit-info'>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="fName">שם: </label>
                                <input
                                    type="text"
                                    name="fName"
                                    id='fName'
                                    value={editMember.fName}
                                    onChange={handleInputChange}
                                    placeholder="שם"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="lName">שם משפחה: </label>
                                <input
                                    type="text"
                                    name="lName"
                                    id='lName'
                                    value={editMember.lName}
                                    onChange={handleInputChange}
                                    placeholder="שם משפחה"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="pNum">מספר אישי: </label>
                                <input
                                    type="text"
                                    name="pNum"
                                    id='pNum'
                                    value={editMember.pNum}
                                    onChange={handleInputChange}
                                    placeholder="מספר אישי"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="idNum">ת.ז: </label>
                                <input
                                    type="text"
                                    name="idNum"
                                    id='idNum'
                                    value={editMember.idNum}
                                    onChange={handleInputChange}
                                    placeholder="תעודת זהות"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="phone">טל': </label>
                                <input
                                    type="phone"
                                    name="phone"
                                    id='phone'
                                    value={editMember.phone}
                                    onChange={handleInputChange}
                                    placeholder="טלפון"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="rank">דרגה: </label>
                                <input
                                    type="text"
                                    name="rank"
                                    id='rank'
                                    value={editMember.rank}
                                    onChange={handleInputChange}
                                    placeholder="דרגה"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="role">תפקיד: </label>
                                <input
                                    type="text"
                                    name="role"
                                    id='role'
                                    value={editMember.role}
                                    onChange={handleInputChange}
                                    placeholder="תפקיד"
                                    onClick={handleInputClick}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="division">מחלקה: </label>
                                <input
                                    type="text"
                                    name="division"
                                    id='division'
                                    value={editMember.division}
                                    onChange={handleInputChange}
                                    placeholder="מחלקה"
                                    onClick={handleInputClick}
                                />
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <h3>{member.fName} {member.lName}</h3>
                    </>
                )}

                {isExpanded && isEditing &&
                    <div className="actions">
                        <button onClick={handleSave}><Save size={16} /> שמור</button>
                        <button onClick={handleCancel}><X size={16} /> ביטול</button>
                    </div>}
                {isExpanded && !isEditing && <div className="details">
                    <p>מספר אישי: <span>{member.pNum}</span></p>
                    <p>ת.ז: <span>{member.idNum}</span></p>
                    <p>טל': <span>{member.phone}</span></p>
                    <p>דרגה: <span>{member.rank}</span></p>
                    <p>תפקיד: <span>{member.role}</span></p>
                    <p>מחלקה: <span>{member.division}</span></p>
                    <p>משימות בלוחות: <span>{memberBoards.length}</span></p>
                    <div className='actions'>
                        <button onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}><Edit size={16} /> עריכה</button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(member._id) }}><Trash2 size={16} /> מחיקה</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
