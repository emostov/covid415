module.exports = {
    parseDistance: (num) => {
        let multiplier = Math.pow(10, 2);
        return Math.round(num * multiplier) / multiplier;
    },
    sortDistances: (objectArr) => {
        const distances = [];
        for (let i = 0; i < objectArr.length; i++) {
            distances.push(objectArr[i].distance)
        }

        const sorted = distances.sort()
        return sorted
    },
    // sortTasks: (sortedArr, Objects) => {
    //     for(let i = 0; i < sortedArr.length; i++) {
    //         sortedArr[i]
    //     }
    // }
}

