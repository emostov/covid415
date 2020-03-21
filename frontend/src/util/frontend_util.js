module.exports = {
    parseDistance: (num) => {
        let multiplier = Math.pow(10, 2);
        return Math.round(num * multiplier) / multiplier;
    },
    sortDistances: (object) => {
        const tasks = [];
        const keys = Object.keys(object)
        const sorted = keys.sort()
        
        for(let i = 0; i < keys.length; i++) {
            object[sorted[i]].task['distance'] = object[sorted[i]].distance
            tasks.push(object[sorted[i]].task)
        }
        return tasks
    },
}

// const sortDistances = (object) => {
//     const tasks = [];
//     const keys = Object.keys(object)
//     const sorted = keys.sort()

//     for (let i = 0; i < keys.length; i++) {
//         tasks.push(object[sorted[i]])
//     }
//     return tasks
// }
