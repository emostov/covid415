const userObjectParser = (userObject) => {
  const user = {};

  const keys = Object.keys(userObject);

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'password') {
      user[keys[i]] = userObject[keys[i]];
    }
  }
  const str = 'hello'
  asdadadfasdfasdfasdfasdfasd
  return user;
};
