import { useState } from 'react'
import { MySelect } from './MySelect'
import { projectStages } from '../services/board.service'
import { Trash, Edit, Plus, X, Save, CalendarIcon } from 'lucide-react'
import { utilService } from '../services/util.service'

export function TaskPreview({ task, myteam, onUpdate, onDelete, myItems }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [editTask, setEditTask] = useState({ ...task })
    const [isEditing, setIsEditing] = useState(false)

    function handleStageChange(newStage) {
        if (newStage === 'done') {
            task.completionDate = new Date().toISOString().split('T')[0]
        } else {
            task.completionDate = ''
        }
        const updated = { ...task, stage: newStage }
        setEditTask(updated)
        onUpdate(updated)
    }

    function handleAddMember(memberId) {
        if (!task.teamMembers.includes(memberId)) {
            const updated = { ...task, teamMembers: [...task.teamMembers, memberId] }
            onUpdate(updated)
        }
    }

    function handleRemoveMember(memberId) {
        const updated = { ...task, teamMembers: task.teamMembers.filter(id => id !== memberId) }
        onUpdate(updated)
    }

    function handleInputChange(ev) {
        const { name, value } = ev.target
        setEditTask(prev => ({ ...prev, [name]: value }))
    }

    function handleSaveEdit() {
        onUpdate(editTask)
        setIsEditing(false)
    }

    function handleInputClick(ev) {
        ev.stopPropagation()
    }

    function handleCancel(ev) {
        ev.stopPropagation()
        setEditTask({ ...task })
        setIsEditing(false)
    }

    const isOverdue = new Date(task.deadline) < new Date() && task.stage !== 'done';

    return (
        <div className={`task-preview ${task.stage}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="task-header">
                <h4>{task.name}</h4>
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing) }}><Edit size={16} /></button>
            </div>

            <div className="task-body">
                <p>{task.description}</p>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>

            <div className="task-footer">
                <div className="members">
                    {task.teamMembers.map(id => {
                        const member = myteam.find(m => m._id === id)
                        return member ? (
                            <div key={id} className="avatar" title={`${member.fName} ${member.lName}`} style={{ backgroundColor: utilService.stringToColor(member._id) }}>
                                {member.fName.charAt(0)}{member.lName.charAt(0)}
                            </div>
                        ) : null
                    })}
                </div>
                <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                    <CalendarIcon size={16} />
                    <span>{utilService.formatDate(task.deadline)}</span>
                </div>
            </div>

            {isExpanded && (
                <div className="details">
                    {isEditing ? (
                        <>
                            <input onClick={handleInputClick} type="text" name="name" value={editTask.name} onChange={handleInputChange} placeholder="שם המשימה" />
                            <textarea onClick={handleInputClick} name="description" value={editTask.description} onChange={handleInputChange} placeholder="תיאור" />
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="createdAt">תאריך יצירה: </label>
                                <input
                                    className='date-input'
                                    type="date"
                                    name="createdAt"
                                    id='createdAt'
                                    value={editTask.createdAt}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="deadline">צפי סיום: </label>
                                <input
                                    className='date-input'
                                    type="date"
                                    name="deadline"
                                    id='deadline'
                                    value={editTask.deadline}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {task.completionDate && <div className='my-input' onClick={handleInputClick}>
                                <label htmlFor="completionDate">סיום בפועל: </label>
                                <input
                                    className='date-input'
                                    type="date"
                                    name="completionDate"
                                    id='completionDate'
                                    value={editTask.completionDate}
                                    onChange={handleInputChange}
                                />
                            </div>}
                            <div className='action-btns'>
                                <button onClick={handleSaveEdit}><Save size={20} /></button>
                                <button onClick={handleCancel}> ביטול</button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete(task._id) }}><Trash size={20} /></button>
                            </div>
                        </>
                    ) : (
                        <>
                            {task.items.length > 0 && <span>פריטים: </span>}
                            <ul className='task-items clean-list'>
                                {task.items.map(item => <li key={item}>
                                    {myItems.find(i => i._id === item)?.type || myItems.find(i => i._id === item)?.name}
                                </li>)}
                            </ul>
                            <p>צפי סיום: {task.deadline}</p>
                            {!!task.completionDate && <p>תאריך סיום: {task.completionDate}</p>}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
