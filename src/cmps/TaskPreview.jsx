import { useState } from 'react'
import { MySelect } from './MySelect'
import { projectStages } from '../services/board.service'
import { Trash, Edit, Plus, X, Save } from 'lucide-react'
import { utilService } from '../services/util.service'

export function TaskPreview({ task, myteam, onUpdate, onDelete }) {
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

    return (
        <div className={`task-preview ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="top">
                <h4>{task.name}</h4>
                <div className={`stage-select ${task.stage}`} onClick={ev => ev.stopPropagation()}>
                    <MySelect options={projectStages} selected={task.stage} setSelected={handleStageChange} />
                </div>
            </div>

            <div className="members">
                <section className='task-members'>
                    {task.teamMembers.map(id => {
                        const member = myteam.find(m => m._id === id)
                        return member ? (
                            <div key={id} className="avatar" style={{ backgroundColor: utilService.stringToColor(member._id) }}>
                                {member.name.charAt(0)}
                                <button className="remove" onClick={(e) => { e.stopPropagation(); handleRemoveMember(id) }}>×</button>
                            </div>
                        ) : null
                    })}
                </section>
                {/* Quick Add Member */}
                {isExpanded && (
                    <div className="add-member">
                        {!!myteam.filter(m => !task.teamMembers.includes(m._id)).length && <span>הוספה:</span>}
                        {myteam
                            .filter(m => !task.teamMembers.includes(m._id))
                            .map(member => (
                                <button key={member._id} style={{ backgroundColor: utilService.stringToColor(member._id) }} onClick={(e) => { e.stopPropagation(); handleAddMember(member._id) }}>
                                    {member.name}
                                </button>
                            ))}
                    </div>
                )}
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
                            <p>{task.description}</p>
                            <p>צפי סיום: {task.deadline}</p>
                            {!!task.completionDate && <p>תאריך סיום: {task.completionDate}</p>}
                            <button onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}><Edit size={16} /> עריכה</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
