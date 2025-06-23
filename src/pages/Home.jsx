import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import BoardCard from '../components/boards/BoardCard'
import { addBoard } from '../store/board.actions'
import { BoardPreview } from '../cmps/BoardPreview'
import { AddNewModal } from '../cmps/AddNewModal'
import { utilService } from '../services/util.service'
import { addStaffMember } from '../store/staff.actions'
import { boardService, projectStages } from '../services/board.service'
import { useNavigate } from 'react-router-dom'
import { Filter } from '../cmps/Filter'

export function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const boards = useSelector(state => state.boardModule.boards)
    const team = useSelector(state => state.staffModule.staff)

    const [filterBy, setFilterBy] = useState({ txt: '', selectedStages: [], sortBy: 'name', sortDir: 1 })
    const [myBoards, setMyBoards] = useState(boards)
    const sortOptions = [{ value: 'name', title: 'שם' }, { value: 'createdAt', title: 'תאריך יצירה' }, { value: 'deadline', title: 'תאריך סיום' },]
    const [showAdd, setShowAdd] = useState(false)
    const boardToAdd = {
        _id: utilService.generateRandomId(),
        name: '',
        description: '',
        createdAt: new Date().toISOString().split('T')[0],
        deadline: new Date().toISOString().split('T')[0],
        tasks: [],
        stage: 'inProgress',
        staffMembers: []
    }

    useEffect(() => {
        onSetMyBoards()
    }, [filterBy, boards])

    function onSetMyBoards() {
        const filtered = boardService.loadBoards(boards, filterBy)
        setMyBoards(filtered)
    }


    function handleAdd(ev) {
        ev.stopPropagation()
        setShowAdd(!showAdd)
    }

    async function onAddNewBoard(newBoard) {
        try {
            dispatch(addBoard(newBoard))
            setShowAdd(false)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="home" onClick={() => setShowAdd(false)}>
            <h1>הפרוייקטים שלך</h1>
            <button onClick={handleAdd} className='btn-add'>
                הוספת לוח פרוייקט
            </button>
            {boards?.length > 0 && <Filter filterBy={filterBy} setFilterBy={setFilterBy} type={'board'} selectOptions={sortOptions} />}
            {boards?.length > 0 && myBoards?.length > 0 ? (<>
                <div className='board-container'>
                    {myBoards?.map(board => (
                        <BoardPreview key={board._id} board={board} />
                    ))}
                </div>
                <div className='info'>
                    <h4>מספר פרוייקטים: <span>{boards.length}</span></h4>
                    <ul className='stages-info clean-list'>
                        {projectStages.map(stage =>
                            boards.filter(board => board.stage === stage.value).length > 0 && <li key={stage.value} className={stage.value}>{stage.title}: {boards.filter(board => board.stage === stage.value).length}</li>
                        )}
                    </ul>
                    <h4 onClick={() => navigate('/team')}>מספר חברי צוות: <span>{team.length}</span></h4>
                </div>
            </>
            ) : boards?.length > 0 ? (
                <div className='no-boards-match'>
                    <h4>לא נמצאו לוחות תואמים לחיפוש </h4>
                </div>
            ) : (
                <div className='no-boards'>
                    <h4>אין לוחות פרוייקטים <span onClick={handleAdd}>לחצו להוספת לוח חדש</span></h4>
                </div>
            )}
            {showAdd && <AddNewModal type={'board'} objectToAdd={boardToAdd} addFunc={onAddNewBoard} setShowAdd={setShowAdd} team={team} />}
        </div>
    )
}
