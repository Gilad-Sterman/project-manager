import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddNewModal } from "../cmps/AddNewModal"
import { utilService } from "../services/util.service"
import { addItem } from "../store/item.actions"

export function Items() {
    const items = useSelector(state => state.itemModule.items)
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()

    const [showAdd, setShowAdd] = useState(false)

    const itemToAdd = {
        _id: utilService.generateRandomId(),
        name: '',
        type: '',
        division: '',
        quantity: 1,
    }

    function onAddItem(newItem) {
        try {
            dispatch(addItem(newItem))
            setShowAdd(false)
        } catch (err) {
            console.log(err)
        }
    }

    function countUsage(itemId) {
        return boards.filter(board =>
            board.tasks.some(task => task.items?.includes(itemId))
        ).length
    }

    return (
        <section className="item-page">
            <h2>רשימת פריטים</h2>
            <button className="btn-add" onClick={() => setShowAdd(true)}>הוספת פריט</button>

            {items.length > 0 ? (
                <ul className="item-list">
                    {items.map(item => (
                        <li key={item._id} className="item-preview">
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <p>סוג: {item.type}</p>
                                <p>מחלקה: {item.division}</p>
                                <p>כמות: {item.quantity}</p>
                            </div>
                            <div className="item-meta">
                                <p>בשימוש ב-{countUsage(item._id)} פרוייקטים</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>אין פריטים להצגה</p>
            )}

            {showAdd && <AddNewModal type="item" objectToAdd={itemToAdd} addFunc={onAddItem} setShowAdd={setShowAdd} team={items} />}
        </section>
    )
}
