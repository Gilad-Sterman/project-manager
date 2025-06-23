import { useState } from "react"

export function MySelect({ options, selected, setSelected }) {
    const [show, setShow] = useState(false)

    function handleSelect(value) {
        setSelected(value)
        setShow(!show)
    }

    return (
        <section className="my-select" >
            <div className="selected" onClick={() => setShow(!show)}>
                <span>{options.find(option => option.value === selected).title}</span>
                <img className={`${show ? 'close' : 'open'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt="" />
            </div>
            {show && <ul className="options">
                {options.map((option, idx) =>
                    <li value={option.value} key={idx} onClick={() => handleSelect(option.value)}>
                        <span>{option.title}</span>
                        {option.value === selected && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />}
                    </li>
                )}
            </ul>}
        </section>
    )
}