import { useEffect, useRef, useState } from 'react'

export function ProductSelect({ products, onSelect, onCreateNew }) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('name')

    const dropdownRef = useRef()

    useEffect(() => {
        function handleClickOutside(ev) {
            if (dropdownRef.current && !dropdownRef.current.contains(ev.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filtered = products
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const aVal = a[sortBy]?.toLowerCase() || ''
            const bVal = b[sortBy]?.toLowerCase() || ''
            return aVal.localeCompare(bVal)
        })

    function handleSelect(product) {
        setIsOpen(false)
        onSelect?.(product)
    }

    function handleCreateNew() {
        setIsOpen(false)
        onCreateNew?.()
    }

    return (
        <div className="product-select" ref={dropdownRef}>
            <button className="btn-toggle" onClick={() => setIsOpen(prev => !prev)}>
                {isOpen ? 'סגירה' : 'בחירת מוצר'}
            </button>

            {isOpen && (
                <div className="dropdown">
                    <div className="dropdown-controls">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="חיפוש פריט..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="name">מיין לפי שם</option>
                            <option value="type">מיין לפי סוג</option>
                        </select>
                    </div>

                    <ul className="product-list">
                        {filtered.map(p => (
                            <li
                                key={p._id}
                                className="product-option"
                                onClick={() => handleSelect(p)}
                            >
                                <strong>{p.name}</strong>
                                {p.type && <span className="product-type"> ({p.type})</span>}
                                {p.store && <span className="product-store"> - {p.store}</span>}
                            </li>
                        ))}
                    </ul>

                    <button className="btn-create-new" onClick={handleCreateNew}>
                        + יצירת מוצר חדש
                    </button>
                </div>
            )}
        </div>
    )
}
