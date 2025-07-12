export const teamService = {
    loadTeam,
}

function loadTeam(team, filterBy) {
    const { txt = '', sortBy = 'name', sortDir = 1 } = filterBy

    const normalize = str => str ? str.trim().toLowerCase() : ''

    let filteredTeam = [...team]

    if (txt) {
        const normTxt = normalize(txt)
        filteredTeam = filteredTeam.filter(member =>
            normalize(member.fName).includes(normTxt) ||
            normalize(member.lName).includes(normTxt)
        )
    }

    // if (selectedStages.length) {
    //     filteredTeam = filteredTeam.filter(board => selectedStages.includes(board.stage))
    // }

    filteredTeam.sort((a, b) => {
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

    return filteredTeam
}

