export const fetchUsers = ({ endpoint, params }) => ({
  method: 'get',
  url: endpoint || 'users/',
  params
});

export const fetchUser = ({ id }) => ({
  method: 'get',
  url: `users/${id}`
});
