import { useState } from "react"
import { projectStages } from "../services/board.service"

export function Filter({ filterBy, setFilterBy, type, selectOptions, expenseTypes }) {
    const [showMaxInv, setShowMaxInv] = useState(false)
    const [isSelect, setIsSelect] = useState(false)
    const { from, to, maxNum, sortBy, sortDir } = filterBy
    const paymentTypes = [{ title: 'מזומן', value: 'cash' }, { title: 'אשראי', value: 'card' }, { title: 'העברה בנקאית', value: 'transfer' }, { title: 'אחר', value: 'other' },]

    function setNewFilter({ target }) {
        setIsSelect(false)
        const field = target.name
        const value = target.value
        filterBy[field] = (target.type === 'number') ? +value : value
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setStages(stage) {
        let newStages = []
        if (filterBy.selectedStages.includes(stage)) {
            newStages = filterBy.selectedStages.filter(s => stage !== s)
        } else {
            newStages = [...filterBy.selectedStages, stage]
        }
        filterBy.selectedStages = newStages
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    return (
        <section className="filter">
            <span className="tag">אפשרויות סינון</span>
            <section className="search-input">
                <label htmlFor="txt">
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1701785795/wednesday/ztavmltqyl9th2ndasir.svg" alt="" />
                </label>
                <input type="text" name="txt" id="txt" placeholder="חיפוש" onInput={setNewFilter} />
            </section>
            {type === 'board' && <>
                <section className="stage-filter">
                    {projectStages.map(stage =>
                        <span key={stage.value} className={filterBy.selectedStages?.includes(stage.value) ? 'selected' : ''} onClick={() => setStages(stage.value)}>{stage.title}</span>
                    )}
                </section>
            </>}
            {selectOptions && <section className="sort">
                <span>סינון לפי:</span>
                <button onClick={() => setIsSelect(!isSelect)}>
                    {selectOptions.find(option => option.value === sortBy).title}
                </button>
                {/* <button className="sortDir-btn" onClick={() => setNewFilter({ target: { name: 'sortDir', value: sortDir === 'up' ? 'down' : 'up' } })}>
                    <img className={`sortDir ${sortDir === 'up' ? 'up' : 'down'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt="" />
                </button> */}
            </section>}
            {isSelect && <section className="select-modal">
                {selectOptions.map((option, idx) =>
                    <div key={idx} className={`select-option`}
                        onClick={() => setNewFilter({ target: { name: 'sortBy', value: option.value } })}><span>{option.title}</span>
                        {(filterBy.sortBy === option.value) &&
                            <img className={"checked-svg-img"} src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />
                        }
                    </div>)}
            </section>}
        </section>
    )
}