import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { teamService } from "../services/team.service"
import { TeamPreview } from "../cmps/TeamPreview"
import { Filter } from "../cmps/Filter"
import { utilService } from "../services/util.service"
import { addStaffMember, deleteStaffMemeber, updateStaffMember } from "../store/staff.actions"
import { AddNewModal } from "../cmps/AddNewModal"
import { updateBoard } from "../store/board.actions"

export function Team() {
    const dispatch = useDispatch()

    const boards = useSelector(state => state.boardModule.boards)
    const team = useSelector(state => state.staffModule.staff)
    const [myTeam, setMyTeam] = useState(team)
    const [filterBy, setFilterBy] = useState({ txt: '', sortBy: 'fName', sortDir: 1 })
    const sortOptions = [{ value: 'fName', title: 'שם' }, { value: 'lName', title: 'שם משפחה' }, { value: 'createdAt', title: 'תאריך יצירה' }]

    const [showAdd, setShowAdd] = useState(false)
    const TeamMateToAdd = {
        _id: utilService.generateRandomId(),
        fName: '',
        lName: '',
        pNum: '',
        idNum: '',
        phone: '',
        rank: '',
        role: '',
        draftDate: '',
        division: '',
        createdAt: new Date().toISOString().split('T')[0],
    }

    useEffect(() => {
        loadMyTeam()
    }, [team, filterBy])

    function loadMyTeam() {
        const filtered = teamService.loadTeam(team, filterBy)
        setMyTeam(filtered)
    }

    function handleAdd(ev) {
        ev.stopPropagation()
        setShowAdd(!showAdd)
    }

    async function onAddNewTeamMate(newTeamMate) {
        try {
            const existingPNum = team.map(member => member.pNum)
            const added = []
            const skipped = []

            if (!existingPNum.includes(newTeamMate.pNum)) {
                dispatch(addStaffMember(newTeamMate))
                added.push(newTeamMate.name)
            } else {
                skipped.push(newTeamMate.name)
            }

            if (skipped.length) {
                alert(`מתשמשים אלה כבר קיימים ולא נוספו:\n${skipped.join(', ')}`)
            }

            setShowAdd(false)
        } catch (err) {
            console.log(err)
        }
    }

    async function onDeleteTeamMate(teamMateId) {
        const sure = confirm('למחוק חבר צוות זה לצמיתות?')
        if (!sure) return

        try {
            dispatch(deleteStaffMemeber(teamMateId))

            boards.forEach(board => {
                if (board.staffMembers.includes(teamMateId)) {
                    const updatedBoard = {
                        ...board,
                        staffMembers: board.staffMembers.filter(id => id !== teamMateId)
                    }
                    dispatch(updateBoard(updatedBoard))
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function onEditTeamMate(updatedTeamMate) {
        try {
            dispatch(updateStaffMember(updatedTeamMate))
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <section className="team-page" >
            <h1>הצוות שלך</h1>
            <button onClick={handleAdd} className='btn-add'>
                הוספה לצוות
            </button>
            {team?.length > 0 && <Filter filterBy={filterBy} setFilterBy={setFilterBy} type={'team'} selectOptions={sortOptions} />}
            {myTeam.length > 0 ? (
                <div className='teammates-container'>
                    {myTeam.map(teamMemeber => (
                        <TeamPreview key={teamMemeber._id} member={teamMemeber} onDelete={onDeleteTeamMate} onEdit={onEditTeamMate} boards={boards} />
                    ))}
                </div>
            ) : team?.length > 0 ? (
                <div className='no-team-match'>
                    <h4>לא נמצאו חברי צוות תואמים לחיפוש </h4>
                </div>
            ) : (
                <div className='no-team'>
                    <h4>אין חברי צוות <span onClick={handleAdd}>לחצו להוספה לצוות</span></h4>
                </div>
            )}
            {showAdd && <AddNewModal type={'team'} objectToAdd={TeamMateToAdd} addFunc={onAddNewTeamMate} setShowAdd={setShowAdd} team={team} />}
        </section>
    )
}