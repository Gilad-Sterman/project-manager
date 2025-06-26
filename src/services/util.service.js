export const utilService = {
    getGreeting,
    generateRandomId,
    getDataFromUser,
    stringToColor
}

const months = [
    { name: 'ינואר', num: 1 },
    { name: 'פברואר', num: 2 },
    { name: 'מרץ', num: 3 },
    { name: 'אפריל', num: 4 },
    { name: 'מאי', num: 5 },
    { name: 'יוני', num: 6 },
    { name: 'יולי', num: 7 },
    { name: 'אוגוסט', num: 8 },
    { name: 'ספטמבר', num: 9 },
    { name: 'אוקטובר', num: 10 },
    { name: 'נובמבר', num: 11 },
    { name: 'דצמבר', num: 12 },
]

const chartColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#8BC34A", "#D32F2F", "#0288D1", "#FBC02D",
    "#7B1FA2", "#C2185B", "#00796B", "#5D4037", "#455A64"
]

function getGreeting() {
    const time = new Date().getHours()
    const greetingsHeb = ["בוקר טוב", "צהריים טובים", "ערב טוב", "לילה טוב"]
    if (time >= 6 && time < 12) return greetingsHeb[0]
    if (time >= 12 && time < 15) return greetingsHeb[1]
    if (time >= 15 && time < 20) return greetingsHeb[2]
    return greetingsHeb[3]
}

function generateRandomId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function getDataFromUser(user, selectedMonth) {

    const currentYear = new Date().getFullYear()

    const monthlyExpenses = user.expenses.filter(expense => {
        const [year, month] = expense.date.split('-').map(Number)
        return year === currentYear && month === selectedMonth
    })

    const typeTotals = monthlyExpenses.reduce((acc, expense) => {
        acc[expense.type] = (acc[expense.type] || 0) + expense.paid
        return acc
    }, {})

    const labels = Object.keys(typeTotals)
    const data = Object.values(typeTotals)

    return {
        datasets: [{
            data,
            backgroundColor: chartColors,
        }],
        labels
    };
}

function stringToColor(str = 'undefiend') {
    if (!str) return '#999'

    // Normalize name
    const name = str.trim().toLowerCase()

    // Create a hash with more entropy
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i) * (i + 1)
    }

    // Use name length and first/last chars to influence
    hash += name.length * 123
    hash += name.charCodeAt(0) * 17
    hash += name.charCodeAt(name.length - 1) * 31

    // Convert hash to HSL
    const hue = hash % 360               // 0–359 degrees
    const saturation = 65 + (hash % 20)  // 65–85%
    const lightness = 45 + (hash % 20)   // 45–65%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}




