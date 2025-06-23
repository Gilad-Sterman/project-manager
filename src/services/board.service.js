export const projectStages = [
    { title: 'בביצוע', value: 'inProgress' },
    { title: 'בוצע', value: 'done' },
    { title: 'ממתין', value: 'waiting' }
]

export const boardService = {
    loadBoards
}

export function loadBoards(boards, filterBy) {
    const { txt = '', selectedStages = [], sortBy = 'createdAt', sortDir = 1 } = filterBy

    const normalize = str => str.trim().toLowerCase()

    let filteredBoards = [...boards]

    if (txt) {
        const normTxt = normalize(txt)
        filteredBoards = filteredBoards.filter(board =>
            normalize(board.name).includes(normTxt)
        )
    }

    if (selectedStages.length) {
        filteredBoards = filteredBoards.filter(board => selectedStages.includes(board.stage))
    }

    filteredBoards.sort((a, b) => {
        let valA = a[sortBy]
        let valB = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'deadline') {
            valA = new Date(valA).getTime()
            valB = new Date(valB).getTime()
        } else if (typeof valA === 'string') {
            valA = normalize(valA)
            valB = normalize(valB)
        }

        return (valA < valB ? -1 : valA > valB ? 1 : 0) * sortDir
    })
    return filteredBoards
}


