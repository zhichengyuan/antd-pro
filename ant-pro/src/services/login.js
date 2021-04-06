import request from '@/utils/request';
export async function fakeAccountLogin({password,userName}) {
  console.log(password,userName);
  return await request('/server/user/admin/login', {
    method: 'POST',
    data: {
      password: "Hfhj@2020",
      username: "admin"
      // username:userName,
      // password:password
    },
  });
  
}


// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function getUserInfo(token) {
  return await request('/server/user/info',{
      method: 'POST',
      data: { token }
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
