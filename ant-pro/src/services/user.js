import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function queryUserList(data) {
  return await request('/server/user/list',{
      method: 'POST',
      data
  })
 
}
export async function saveUser(data) {
  console.log(data);
  return await request('/server/user/save',{
      method: 'POST',
      data
  })
}

// // 保存用户
// export function save(data) {
//   return request({
//       url: '/user/save',
//       method: 'post',
//       data
//   })
// }
