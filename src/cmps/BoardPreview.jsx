import { useNavigate } from "react-router-dom"
import { projectStages } from "../services/board.service"

export function BoardPreview({ board }) {
    const navigate = useNavigate()

    return (
        <section className={`board-preview ${board.stage}`} onClick={() => navigate(`boards/${board._id}`)}>
            <h4>{board.name}</h4>
            <div className="team-members">
                <span>צוות: {board.staffMembers?.length}</span>
            </div>
            <div className="board-info">
                <span>דורש הפרוייקט: {board.requestedBy}</span>
                <span className="stage">{projectStages.find(stage => stage.value === board.stage).title}</span>
                {board.deadline && <span className="deadline">צפי סיום: {`${board.deadline.split('-')[1]}/${board.deadline.split('-')[2]}/${board.deadline.split('-')[0]}`}</span>}
                {board.completionDate && <span className="complition-date">מועד סיום בפועל:{`${board.completionDate.split('-')[1]}/${board.completionDate.split('-')[2]}/${board.completionDate.split('-')[0]}`}</span>}
            </div>
        </section>
    )
}