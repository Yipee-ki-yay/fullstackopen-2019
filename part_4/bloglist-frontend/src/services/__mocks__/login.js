
const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
};

let token = null;
const setToken = () => {
  token = `bearer ${user.token}`;
};

export default { setToken };