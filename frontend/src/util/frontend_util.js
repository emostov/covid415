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
    sortDistances2: (stateTasks) => {
        const tasksArray = Object.values(stateTasks);

        return tasksArray.sort((a, b) =>
         a.distance > b.distance ? 1 : -1)
    },
}

