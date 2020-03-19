module.exports = {
    parseDistance: (num) => {
        let multiplier = Math.pow(10, 2);
        return Math.round(num * multiplier) / multiplier;
    }
}