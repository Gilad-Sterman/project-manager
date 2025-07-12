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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const boards = useSelector(state => state.boardModule.boards);
    const team = useSelector(state => state.staffModule.staff);

    const [filterBy, setFilterBy] = useState({ txt: '', selectedStages: [], sortBy: 'name', sortDir: 1 });
    const [myBoards, setMyBoards] = useState(boards);
    const sortOptions = [{ value: 'name', title: 'שם' }, { value: 'createdAt', title: 'תאריך יצירה' }, { value: 'deadline', title: 'תאריך סיום' }];
    const [showAdd, setShowAdd] = useState(false);
    const boardToAdd = {
        _id: utilService.generateRandomId(),
        name: '',
        description: '',
        createdAt: new Date().toISOString().split('T')[0],
        deadline: new Date().toISOString().split('T')[0],
        completionDate: '',
        tasks: [],
        stage: 'inProgress',
        manager: {},
        requestedBy: '',
        staffMembers: [],
        items: []
    };

    useEffect(() => {
        onSetMyBoards();
    }, [filterBy, boards]);

    function onSetMyBoards() {
        const filtered = boardService.loadBoards(boards, filterBy);
        setMyBoards(filtered);
    }

    function handleAdd(ev) {
        ev.stopPropagation();
        setShowAdd(!showAdd);
    }

    async function onAddNewBoard(newBoard) {
        try {
            dispatch(addBoard(newBoard));
            setShowAdd(false);
        } catch (err) {
            console.log(err);
        }
    }

    const renderBoards = () => {
        if (!boards || boards.length === 0) {
            return (
                <div className='no-boards-placeholder'>
                    <h3>אין פרוייקטים עדיין.</h3>
                    <p>לחץ על הכפתור כדי להוסיף את הלוח הראשון שלך.</p>
                    <button onClick={handleAdd} className='btn-primary'>הוסף לוח חדש</button>
                </div>
            );
        }

        if (myBoards.length === 0) {
            return (
                <div className='no-boards-match'>
                    <h4>לא נמצאו לוחות התואמים את חיפושך.</h4>
                </div>
            );
        }

        return (
            <div className='board-grid'>
                {myBoards.map(board => (
                    <BoardPreview key={board._id} board={board} team={team} />
                ))}
            </div>
        );
    };

    return (
        <div className="home-page" onClick={() => setShowAdd(false)}>
            <aside className="home-sidebar">
                <div className="sidebar-header">
                    <h3>סקירת פרוייקטים</h3>
                </div>
                <div className="sidebar-stats">
                    <div className="stat-item">
                        <span className="stat-value">{boards?.length || 0}</span>
                        <div className="stat-label">כל הפרוייקטים</div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{team?.length || 0}</span>
                        <div className="stat-label">אנשי צוות</div>
                    </div>
                </div>
                <div className="sidebar-stages">
                    <h4>פרוייקטים לפי סטטוס</h4>
                    <ul className='clean-list'>
                        {projectStages.map(stage => {
                            const count = boards?.filter(b => b.stage === stage.value).length || 0;
                            if (count === 0) return null;
                            return (
                                <li key={stage.value} className={`stage-item ${stage.value}`}>
                                    <span className='stage-name'>{stage.title}</span>
                                    <span className='stage-count'>{count}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            <main className="home-main-content">
                <header className="main-header">
                    <h1>הפרוייקטים שלי</h1>
                    <div className="header-actions">
                        <Filter filterBy={filterBy} setFilterBy={setFilterBy} type={'board'} selectOptions={sortOptions} />
                        <button onClick={handleAdd} className='btn-primary'>
                            הוסף לוח
                        </button>
                    </div>
                </header>
                {renderBoards()}
            </main>

            {showAdd && <AddNewModal type={'board'} objectToAdd={boardToAdd} addFunc={onAddNewBoard} setShowAdd={setShowAdd} team={team} />}
        </div>
    );
}
