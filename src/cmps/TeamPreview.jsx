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
                {member.name.charAt(0)}
            </div>

            <div className="info">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editMember.name}
                            onChange={handleInputChange}
                            placeholder="שם"
                            onClick={handleInputClick}
                        />
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
                    </>
                ) : (
                    <>
                        <h3>{member.name}</h3>
                    </>
                )}

                {isExpanded && (
                    <div className="details">
                        <p>משימות בלוחות: {memberBoards.length}</p>

                        <div className="actions">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSave}><Save size={16} /> שמור</button>
                                    <button onClick={handleCancel}><X size={16} /> ביטול</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}><Edit size={16} /> עריכה</button>
                                    <button onClick={(e) => { e.stopPropagation(); onDelete(member._id) }}><Trash2 size={16} /> מחיקה</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
