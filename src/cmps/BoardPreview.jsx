import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";
import { Calendar } from 'lucide-react';

export function BoardPreview({ board, team }) {
    const navigate = useNavigate();
    const getTaskProgress = () => {
        if (!board.tasks || board.tasks.length === 0) {
            return 0;
        }
        const doneTasks = board.tasks.filter(task => task.stage === 'done').length;
        return Math.round((doneTasks / board.tasks.length) * 100);
    };

    const progress = getTaskProgress();

    const boardMembers = team?.filter(member => board.staffMembers.includes(member._id)) || [];

    return (
        <section className="board-preview" onClick={() => navigate(`boards/${board._id}`)}>
            <div className="board-preview-header">
                <div className={`status-indicator ${board.stage}`}></div>
                <h4>{board.name}</h4>
            </div>

            <div className="board-preview-body">
                <p>{board.description || 'אין תיאור זמין.'}</p>
            </div>

            <div className="board-preview-progress">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <span>{progress}%</span>
            </div>

            <div className="board-preview-footer">
                <div className="team-members">
                    {boardMembers.slice(0, 3).map(member => (
                        <div key={member._id} className="member-avatar" title={member.fName}>
                            {member.imgUrl ? <img src={member.imgUrl} alt={member.fName} /> : <span>{member.fName.split('')[0]}.{member.lName.split('')[0]}</span>}
                        </div>
                    ))}
                    {boardMembers.length > 3 && (
                        <div className="member-avatar more-members">
                            +{boardMembers.length - 3}
                        </div>
                    )}
                </div>
                {board.deadline && (
                    <div className="due-date">
                        <Calendar size={16} />
                        <span>{utilService.formatDate(board.deadline)}</span>
                    </div>
                )}
            </div>
        </section>
    );
}