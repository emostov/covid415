const userObjectParser = (userObject) => {
    let user = {}

    const keys = Object.keys(userObject)

    for(let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'password') {
            user[keys[i]] = userObject[keys[i]]
        }
    }

    return user
}