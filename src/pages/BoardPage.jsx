import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteBoard, updateBoard } from "../store/board.actions"
import { MySelect } from "../cmps/MySelect"
import { AddNewModal } from "../cmps/AddNewModal"
import { utilService } from "../services/util.service"
import { ArrowLeft, ArrowRight, Trash, Trash2 } from "lucide-react"
import { projectStages } from "../services/board.service"
import { TaskPreview } from "../cmps/TaskPreview"

export function BoardPage() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boardModule.boards)
    const team = useSelector(state => state.staffModule.staff)
    const [myBoard, setMyBoard] = useState(null)
    const [myteam, setMyTeam] = useState(null)
    const [showTeam, setShowTeam] = useState(false)
    const [selectedTeamIds, setSelectedTeamIds] = useState([])

    const [showAdd, setShowAdd] = useState(false)
    const taskToAdd = {
        _id: utilService.generateRandomId(),
        name: '',
        description: '',
        createdAt: new Date().toISOString().split('T')[0],
        deadline: new Date().toISOString().split('T')[0],
        stage: 'inProgress',
        teamMembers: []
    }

    useEffect(() => {
        loadBoard(params.id)
    }, [params, boards])

    function loadBoard(boardId) {
        const b = boards.find(board => board._id === boardId)
        setMyBoard(b)
        const myTeamIds = b.staffMembers
        const t = team.filter(teamMate => myTeamIds.includes(teamMate._id))
        setMyTeam(t)
    }

    async function onDeleteBoard() {
        const sure = confirm('למחוק לוח זה לצמיתות?')
        if (!sure) return
        try {
            dispatch(deleteBoard(myBoard._id))
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    async function onAddNewTask(newTask) {
        myBoard.tasks.unshift(newTask)
        const newBoard = JSON.parse(JSON.stringify(myBoard))
        try {
            dispatch(updateBoard(newBoard))
            setShowAdd(false)
        } catch (err) {
            console.log(err);
        }
    }

    async function onDeleteTask(taskId) {
        const newTasks = myBoard.tasks.filter(task => task._id !== taskId)
        myBoard.tasks = newTasks
        const newBoard = JSON.parse(JSON.stringify(myBoard))
        try {
            dispatch(updateBoard(newBoard))
            setShowAdd(false)
        } catch (err) {
            console.log(err);
        }
    }

    async function onSelectStage(value) {
        myBoard.stage = value
        if (value === 'done') {
            myBoard.completionDate = new Date().toISOString().split('T')[0]
        } else {
            myBoard.completionDate = ''
        }
        const newBoard = JSON.parse(JSON.stringify(myBoard))
        try {
            dispatch(updateBoard(newBoard))
        } catch (err) {
            console.log(err);
        }
    }

    async function onUpdateTask(updatedTask) {
        const newTasks = myBoard.tasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        myBoard.tasks = newTasks
        const newBoard = JSON.parse(JSON.stringify(myBoard))
        try {
            dispatch(updateBoard(newBoard))
        } catch (err) {
            console.log(err);
        }
    }

    function handleTeamSelection(ev) {
        const options = [...ev.target.options]
        const selected = options.filter(o => o.selected).map(o => o.value)
        setSelectedTeamIds(selected)
    }

    async function onAddSelectedTeamMembers() {
        if (!selectedTeamIds.length) return
        const updatedBoard = {
            ...myBoard,
            staffMembers: [...myBoard.staffMembers, ...selectedTeamIds]
        }
        try {
            dispatch(updateBoard(updatedBoard))
            setSelectedTeamIds([])
            setShowTeam(false)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <section className="board-page">
            {!myBoard?._id ? (
                <h2>הלוח לא נמצא, נא לנסות שוב</h2>
            ) : (<>
                <section className="top">
                    <h2>{myBoard.name}</h2>
                    {myBoard.description && <p className="description">
                        {myBoard.description}
                    </p>}
                    <button className="btn-delete" onClick={() => onDeleteBoard()}><Trash2 /></button>
                    <button className="btn-add-from-team" onClick={() => setShowTeam(!showTeam)}>
                        הוספת חברי צוות
                    </button>

                    {showTeam && team.filter(member => !myBoard.staffMembers.includes(member._id)).length > 0 && (
                        <section className="add-team-select">
                            <select multiple onChange={handleTeamSelection}>
                                {team.filter(member => !myBoard.staffMembers.includes(member._id)).map(member => (
                                    <option key={member._id} value={member._id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={onAddSelectedTeamMembers}>הוספה</button>
                        </section>
                    )}
                    {showTeam && team.filter(member => !myBoard.staffMembers.includes(member._id)).length === 0 && (
                        <p className="all-added-msg">כל הצוות כבר משויך ללוח</p>
                    )}
                </section>
                <section className="board-actions">
                    <div className="staff">
                        צוות:
                        {myBoard.staffMembers.map(member =>
                            <span key={member} style={{ backgroundColor: utilService.stringToColor(member) }}>{team.find(mem => mem._id === member)?.name}</span>
                        )}
                    </div>
                    <div className="stage">
                        סטטוס:
                        <MySelect options={projectStages} selected={myBoard.stage} setSelected={onSelectStage} />
                    </div>
                    <div className="dates">
                        <span>תאריך יצירה: {myBoard.createdAt}</span>
                        <span>צפי סיום: {myBoard.deadline}</span>
                        {!!myBoard.completionDate && <span>סיום בפועל: {myBoard.completionDate}</span>}
                    </div>
                    <button className="btn-add" onClick={() => setShowAdd(!showAdd)}>הוספת משימה</button>
                </section>
                <section className="tasks">
                    {myBoard.tasks.length > 0 && myBoard.tasks.map((task, idx) =>
                        <TaskPreview key={idx} task={task} myteam={myteam} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
                    )}
                </section>
            </>
            )}
            {showAdd && <AddNewModal type={'task'} objectToAdd={taskToAdd} addFunc={onAddNewTask} setShowAdd={setShowAdd} team={myteam} />}
        </section>
    )
}