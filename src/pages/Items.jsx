import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddNewModal } from "../cmps/AddNewModal"
import { utilService } from "../services/util.service"
import { addItem } from "../store/item.actions"
import { itemService } from "../services/item.service"
import { Filter } from "../cmps/Filter"

export function Items() {
    const items = useSelector(state => state.itemModule.items)
    const boards = useSelector(state => state.boardModule.boards)
    const itemTypes = [{ title: 'נשקייה', value: 'armery' }, { title: 'אפסנאות', value: 'quartermaster' }, { title: 'לוגיסטיקה', value: 'logistics' },]
    const [myItems, setMyItems] = useState(items)
    const [filterBy, setFilterBy] = useState({ txt: '', sortBy: 'name', sortDir: 1, selectedTypes: [] })
    const sortOptions = [{ value: 'name', title: 'שם' }, { value: 'type', title: 'סוג' }, { value: 'createdAt', title: 'תאריך יצירה' }]

    const dispatch = useDispatch()

    const [showAdd, setShowAdd] = useState(false)

    const itemToAdd = {
        _id: utilService.generateRandomId(),
        name: '',
        type: '',
        quantity: 1,
    }

    useEffect(() => {
        loadMyItems()
    }, [items, filterBy])

    function loadMyItems() {
        const filtered = itemService.loadItems(items, filterBy)
        setMyItems(filtered)
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
            {items?.length > 0 && <Filter filterBy={filterBy} setFilterBy={setFilterBy} type={'items'} selectOptions={sortOptions} />}
            <button className="btn-add" onClick={() => setShowAdd(true)}>הוספת פריט</button>

            {myItems.length > 0 ? (
                <ul className="item-list">
                    {myItems.map(item => (
                        <li key={item._id} className="item-preview">
                            <div className="item-info">
                                <h5>{itemTypes.find(type => type.value === item.itemType)?.title || ''}</h5>
                                {!!item.name && <p>שם: {item.name}</p>}
                                {!!item.type && <p>סוג: {item.type}</p>}
                                {!!item.category && <p>קטגוריה: {item.category}</p>}
                                {!!item.details && <p>פירוט: {item.details}</p>}
                                {/* {<p>כמות: {item.quantity}</p>} */}
                            </div>
                            <div className="item-meta">
                                <p>בשימוש ב-{countUsage(item._id)} פרוייקטים</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : items.length > 0 ? (
                <p className="no-items-message">לא נמצאו פריטים</p>
            ) : (
                <p className="no-items-message">אין פריטים להצגה</p>
            )}

            {showAdd && <AddNewModal type="item" objectToAdd={itemToAdd} addFunc={onAddItem} setShowAdd={setShowAdd} team={items} />}
        </section>
    )
}
