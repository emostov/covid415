module.exports = {
    userObjectParser: (userObject, key) => {
        const user = {};
        const keys = Object.keys(userObject);

        for (let i = 0; i < keys.length; i += 1) {
            if (userObject[keys[i]] !== key) {
                user[keys[i]] = userObject[keys[i]];
            }
        }

        return user;
    },
    defreezeObject: (obj) => {
        const tempObj = {};
        const keys = Object.keys(obj);

        for (let i = 0; i < keys.length; i += 1) {
            tempObj[keys[i]] = obj[keys[i]];
        }

        return obj;
    },
    pullKeys: (obj) => ({
        _id: obj.id,
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        date: obj.date,
    }),
};
