import { useState, useRef, useEffect } from 'react';
import { projectStages } from '../services/board.service';
import { ChevronDown, Search, ArrowUp, ArrowDown, Check } from 'lucide-react';

export function Filter({ filterBy, setFilterBy, type, selectOptions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [sections, setSections] = useState({ status: true, sort: false });
    const filterRef = useRef(null);

    const { sortBy, sortDir } = filterBy;
    const itemTypes = [{ title: 'נשקייה', value: 'armery' }, { title: 'אפסנאות', value: 'quartermaster' }, { title: 'לוגיסטיקה', value: 'logistics' }];

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterRef]);

    function handleFilterChange(field, value) {
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }));
    }

    function handleMultiSelectChange(field, value) {
        const currentValues = filterBy[field] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        handleFilterChange(field, newValues);
    }

    function toggleSection(section) {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    }

    return (
        <div className="filter-container" ref={filterRef}>
            <button className="filter-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span>סינון</span>
                <ChevronDown size={20} />
            </button>

            {isOpen && (
                <div className="filter-panel">
                    <div className="filter-header">
                        <h4>סינון ומיון</h4>
                    </div>
                    <div className="filter-body">
                        <div className="search-section">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="חיפוש לפי שם..."
                                value={filterBy.txt || ''}
                                onChange={(e) => handleFilterChange('txt', e.target.value)}
                            />
                        </div>

                        {type === 'board' && (
                            <div className="filter-section">
                                <button className="section-header" onClick={() => toggleSection('status')}>
                                    <span>סטטוס</span>
                                    <ChevronDown size={18} className={`chevron ${sections.status ? 'open' : ''}`} />
                                </button>
                                {sections.status && (
                                    <div className="section-content">
                                        {projectStages.map(stage => (
                                            <label key={stage.value} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={filterBy.selectedStages?.includes(stage.value) || false}
                                                    onChange={() => handleMultiSelectChange('selectedStages', stage.value)}
                                                />
                                                <span className={`custom-checkbox ${stage.value}`}></span>
                                                {stage.title}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {type === 'items' && (
                            <div className="filter-section">
                                <button className="section-header" onClick={() => toggleSection('itemType')}>
                                    <span>סוג פריט</span>
                                    <ChevronDown size={18} className={`chevron ${sections.itemType ? 'open' : ''}`} />
                                </button>
                                {sections.itemType && (
                                    <div className="section-content">
                                        {itemTypes.map(type => (
                                            <label key={type.value} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={filterBy.selectedTypes?.includes(type.value) || false}
                                                    onChange={() => handleMultiSelectChange('selectedTypes', type.value)}
                                                />
                                                <span className={`custom-checkbox ${type.value}`}></span>
                                                {type.title}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {selectOptions && (
                            <div className="filter-section">
                                <button className="section-header" onClick={() => toggleSection('sort')}>
                                    <span>מיון</span>
                                    <ChevronDown size={18} className={`chevron ${sections.sort ? 'open' : ''}`} />
                                </button>
                                {sections.sort && (
                                    <div className="section-content">
                                        <div className="sort-options">
                                            <span>מיין לפי:</span>
                                            <select value={sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
                                                {selectOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.title}</option>)}
                                            </select>
                                            <button onClick={() => handleFilterChange('sortDir', sortDir === 1 ? -1 : 1)} className="sort-direction">
                                                {sortDir === 1 ? <ArrowUp size={16}/> : <ArrowDown size={16}/>}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}