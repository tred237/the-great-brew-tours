export function sortArray(arr, field, isDesc = false, stringCategory = false) {
    return arr.sort((a,b) => {
        const categoryA = stringCategory ? a[stringCategory].toLowerCase() : a.id
        const categoryB = stringCategory ? b[stringCategory].toLowerCase() : b.id
        if(isDesc) return sortDescending(categoryA, categoryB)
        else return sortAscending(categoryA, categoryB)
    })
}

export function sortAscending(categoryA, categoryB) {
    if (categoryA < categoryB) return -1
    else if (categoryB < categoryA) return 1
    else return 0
}

export function sortDescending(categoryA, categoryB) {
    if (categoryA > categoryB) return -1
    else if (categoryB > categoryA) return 1
    else return 0
}