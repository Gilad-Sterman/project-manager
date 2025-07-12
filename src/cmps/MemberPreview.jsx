
import React, { useState } from 'react';
import { Trash2, Edit, ChevronDown, Briefcase, Phone, Mail, Hash, User, Shield, Car, IdCard, Users, Building, HardHat, Save, X } from 'lucide-react';
import { utilService } from '../services/util.service';

export function MemberPreview({ member, onDelete, onEdit, boards }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const [editMember, setEditMember] = useState({ ...member })

    const memberBoards = boards.filter(board => board.staffMembers.includes(member._id));

    function handleInputChange(ev) {
        ev.stopPropagation()
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

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsExpanded(true)
        setIsEditing(!isEditing)
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(member._id);
    };

    const DetailItem = ({ icon, label, value }) => (
        value ? <div className="detail-item">
            <div className="icon-wrapper">{icon}</div>
            <span><strong>{label}:</strong> {value}</span>
        </div> : null
    );

    const EditItem = ({ icon, label, value, name }) => (
        <div className="detail-item">
            <div className="icon-wrapper">{icon}</div>
            <input type="text" value={value} onChange={handleInputChange} name={name} placeholder={label} />
        </div>
    );

    return (
        <div className={`member-preview-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="avatar" style={{ backgroundColor: utilService.stringToColor(member._id) }}>
                    {member.imgUrl ? <img src={member.imgUrl} alt={`${member.fName} ${member.lName}`} /> : `${member.fName?.charAt(0) || ''}${member.lName?.charAt(0) || ''}`}
                </div>
                <div className="member-info">
                    <h4 className="name">{member.fName} {member.lName}</h4>
                    <p className="role">{member.role || 'אין תפקיד'}</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleEditClick} className="action-btn edit-btn"><Edit size={16} /></button>
                    <button onClick={handleDeleteClick} className="action-btn delete-btn"><Trash2 size={16} /></button>
                    <button className={`action-btn expand-btn ${isExpanded ? 'open' : ''}`}><ChevronDown size={20} /></button>
                </div>
            </div>

            {isExpanded && !isEditing ? (
                <div className="card-details">
                    <DetailItem icon={<Hash size={14} />} label="מ.א." value={member.pNum} />
                    <DetailItem icon={<IdCard size={14} />} label="ת.ז" value={member.idNum} />
                    <DetailItem icon={<Phone size={14} />} label="טלפון" value={member.phone} />
                    <DetailItem icon={<User size={14} />} label="דרגה" value={member.rank} />
                    <DetailItem icon={<Shield size={14} />} label="פלוגה" value={member.division} />
                    <DetailItem icon={<Users size={14} />} label="צוות" value={member.team} />
                    <DetailItem icon={<Building size={14} />} label="כתובת" value={member.address} />
                    <DetailItem icon={<Mail size={14} />} label="מייל" value={member.email} />
                    <DetailItem icon={<HardHat size={14} />} label="שירות סדיר" value={member.sadir} />
                    <DetailItem icon={<Car size={14} />} label="רכב" value={member.carNum} />
                    <DetailItem icon={<Briefcase size={14} />} label="פרויקטים" value={memberBoards.length} />
                </div>
            ) : isExpanded && (
                <div className="card-details edit">
                    <EditItem icon={<Hash size={14} />} label="מ.א." value={editMember.pNum} name={'pNum'} />
                    <EditItem icon={<IdCard size={14} />} label="ת.ז" value={editMember.idNum} name={'idNum'} />
                    <EditItem icon={<Phone size={14} />} label="טלפון" value={editMember.phone} name={'phone'} />
                    <EditItem icon={<User size={14} />} label="דרגה" value={editMember.rank} name={'rank'} />
                    <EditItem icon={<Shield size={14} />} label="פלוגה" value={editMember.division} name={'division'} />
                    <EditItem icon={<Users size={14} />} label="צוות" value={editMember.team} name={'team'} />
                    <EditItem icon={<Building size={14} />} label="כתובת" value={editMember.address} name={'address'} />
                    <EditItem icon={<Mail size={14} />} label="מייל" value={editMember.email} name={'email'} />
                    <EditItem icon={<HardHat size={14} />} label="שירות סדיר" value={editMember.sadir} name={'sadir'} />
                    <EditItem icon={<Car size={14} />} label="רכב" value={editMember.carNum} name={'carNum'} />
                    <div className="actions">
                        <button onClick={handleSave}><Save size={16} /> שמור</button>
                        <button onClick={handleCancel}><X size={16} /> ביטול</button>
                    </div>
                </div>
            )}
        </div>
    );
}
