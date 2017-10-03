export const checkExist = params => ({
  method: 'get',
  url: 'auth/check/',
  params
});

export const registration = data => ({
  method: 'post',
  url: 'auth/registration/',
  data
});

export const editUser = data => ({
  method: 'put',
  url: 'auth/user/',
  data
});

export const passwordChange = data => ({
  method: 'post',
  url: 'auth/password/change/',
  data
});

export const passwordReset = data => ({
  method: 'post',
  url: 'auth/password/reset/',
  data
});

export const passwordResetConfirm = data => ({
  method: 'post',
  url: 'auth/password/reset/confirm/',
  data
});

export const emailVerify = data => ({
  method: 'post',
  url: '/auth/registration/verify-email/',
  data
});
