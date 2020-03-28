module.exports = {
  userObjectParser: (userObject, key) => {
    const user = {};
    
    for(let i in userObject) {
      if(userObject[i] !== key) {
        user[i] = userObject[i]
      }
    }

    return user;
  },
  defreezeObject: (obj) => {
    let tempObj = {}

    for(let i in obj) {
      tempObj[i] = obj[i]
    }

    return obj
  },
  pullKeys: (obj) => {
    return  {
      "_id": obj.id,
      "firstName": obj.firstName,
      "lastName": obj.lastName,
      "email": obj.email,
      "phoneNumber": obj.phoneNumber,
      "date": obj.date
    }
  }
}
